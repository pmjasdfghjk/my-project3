<template>
	<view>
		<view class="od-banner">
			<image class="od-banner-icon" src="/static/resource/images/od_bg_icon.png" mode="widthFix" />
			<view :class="'od-jd od-jd-' + orderStatus">
				<view class="od-jd-out">
					<view class="od-jd-in"></view>
				</view>
				<view class="vp-flex od-jd-text">
					<view class="vp-flex_1">
						<text class="od-jd-st-0">填写订单</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-10">在线支付</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-20">专人服务</text>
					</view>
					<view class="vp-flex_1">
						<text class="od-jd-st-30">服务完成</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-status">
			<!-- 待付款 -->
			<block v-if="orderStatus == 10">
				<view><text class="od-st">订单待支付</text></view>
				<view class="od-stt">
					请在
					<counter style="font-size: 24rpx" :second="order._exp_time" @counterOver="onCounterOver" />
					内完成支付，超时订单自动取消
				</view>
				<view class="od-op">
					<button class="btnp" @click="dopay">立即支付（{{order.price}}元）</button>
				</view>
			</block>
			<!-- 进行中 -->
			<block v-if="orderStatus == 20">
				<block v-if="order.service_state == 0">
					<view><text class="od-st">正在为您安排服务专员...</text></view>
					<view class="od-stt">请保持手机畅通，稍后将有服务专员与您联系</view>
				</block>
				<block v-if="order.service_state == 1">
					<view><text class="od-st">服务进行中</text></view>
					<view class="od-stt">已安排服务专员，将于预约时间进行服务</view>
				</block>
			</block>
			<!-- 已完成 -->
			<block v-if="orderStatus == 30">
				<view><text class="od-st">服务已完成</text></view>
				<view class="od-stt">感谢您的使用，如有售后问题请联系客服</view>
			</block>
			<!-- 已取消 -->
			<block v-if="orderStatus == 40">
				<view><text class="od-st">订单已取消</text></view>
				<view class="od-stt">期待下次为您服务，如需帮助可咨询客服</view>
			</block>
		</view>
		<block v-if="orderStatus == 20">
			<view class="od-box">
				<view class="weui-cells">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label od-box-tt">本次服务专员</view>
						</view>
						<view class="weui-cell__bd"></view>
					</view>
					<view class="weui-cell od-staff">
						<view class="weui-cell__hd">
							<view>
								<image :src="order._staff.avatar_url" mode="aspectFill" class="od-staff-avatar" />
							</view>
						</view>
						<view class="weui-cell__bd">
							<view>{{ order._staff.nickname }}</view>
						</view>
						<view class="weui-cell__ft">
							<view>
								<button class="btn1m" @tap="makePhoneCall" :data-tel="order._staff.mobile">电话联系</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="od-box">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label od-box-tt">预约信息</view>
					</view>
					<view class="weui-cell__bd"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">预约服务</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.service_name }}
						</view>
					</view>
				</view>
				<block v-if="order.service_stype <= 20">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.hospital_name }}
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望就诊时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.client_name }} {{ order.client_sex == 1 ? '男' : '女' }} {{ order.client_age }}周岁</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">就诊人电话</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.tel }}
							</view>
						</view>
					</view>
					<block v-if="order.service_stype == 15">
						<view class="weui-cell">
							<view class="weui-cell__hd">
								<view class="weui-label">接送地址</view>
							</view>
							<view class="weui-cell__bd"></view>
							<view class="weui-cell__ft">
								<view>
									{{ order.receiveAddress }}
								</view>
							</view>
						</view>
					</block>
				</block>
				<block v-if="order.service_stype > 20 && order.service_stype < 100">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">所在医院</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.hospital_name }}
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望处理时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">收件人</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.address.userName }} {{ order.address.telNumber }}</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">收件地址</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.address.cityName }}{{ order.address.countyName }}{{ order.address.detailInfo }}</view>
						</view>
					</view>
				</block>
				<block v-if="order.service_stype > 100">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">期望服务时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.starttime" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务对象</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.client_name }} {{ order.client_sex == 1 ? '男' : '女' }} {{ order.client_age }}周岁</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务对象电话</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.client_mobile }}
							</view>
						</view>
					</view>
		
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">服务地址</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								{{ order.address.address }}
							</view>
						</view>
					</view>
				</block>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">其他需求</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.demand }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="od-box">
			<view class="weui-cells">
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label od-box-tt">订单信息</view>
					</view>
					<view class="weui-cell__bd"></view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">联系电话</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							{{ order.tel }}
						</view>
					</view>
				</view>

				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">下单时间</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>
							<formater :timestamp="order.order_start_time" format="YYYY-MM-dd hh:mm"></formater>
						</view>
					</view>
				</view>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">应付金额</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view>{{ order.price }}元</view>
					</view>
				</view>

				<block v-if="orderStatus == 20">
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">实付金额</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>{{ order.price }}元</view>
						</view>
					</view>
					<view class="weui-cell">
						<view class="weui-cell__hd">
							<view class="weui-label">付款时间</view>
						</view>
						<view class="weui-cell__bd"></view>
						<view class="weui-cell__ft">
							<view>
								<formater :timestamp="order.pay_time" format="YYYY-MM-dd hh:mm"></formater>
							</view>
						</view>
					</view>
				</block>
				<view class="weui-cell">
					<view class="weui-cell__hd">
						<view class="weui-label">订单编号</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft">
						<view class="color_click">
							{{ order.out_trade_no }}
						</view>
					</view>
				</view>

				<navigator class="weui-cell weui-cell_access" url="../service/index">
					<view class="weui-cell__hd">
						<view class="weui-label">联系客服</view>
					</view>
					<view class="weui-cell__bd"></view>
					<view class="weui-cell__ft weui-cell__ft_in-access">疑问或投诉</view>
				</navigator>
			</view>
		</view>
		<uni-popup ref="qrcodePopup" type="center" :is-mask-click="false" background-color="#fff">
			<view class="pay-box">
				<image @click="payment" src="/static/resource/images/modal_closer.png" style="display:block;width:30rpx;height:30rpx"></image>
				<view class="text-center">微信支付</view>
				<canvas id="qrcode" canvas-id="qrcode" style="width: 300rpx;height: 300rpx"></canvas>
				<view class="text-center">请用本人微信扫描以上二维码</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import UQRCode from 'uqrcodejs';
	import {
		computed,
		onMounted,
		ref,
		toRaw,
		reactive
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'
	// 引入区域

	const qrcodePopue = ref()
	const OrUpdate = ref()
	// 设置接收返回的数据
	const order = ref({})
	const orderStatus = computed(() => {
		const map = {
			'待支付': '10',
			'待服务': '20',
			'已完成': '30',
			'已取消': '40',
		}
		return map[order.value.trade_state]
	})
	onLoad((e) => {
		
		OrUpdate.value = e
		getOrderDetail(e)
	})
	const app = getApp()
	// 请求订单详情函数

	const getOrderDetail = (parms) => {
		app.globalData.utils.request({
			url: '/order/detail',
			header: {
				token: uni.getStorageSync('token')
			},
			data: parms,
			success: (res) => {
				order.value = res.data
				
			}
		})
	}
	// 倒计时结束更新页面状态
	const onCounterOver = () => {
		getOrderDetail(OrUpdate)
	}
	// 订单重新支付的回调:
	const dapay = () => {
		qrcodePopue.value.open('center')
		// 获取uQRCode实例
		const qr = new UQRCode();
		// 设置二维码内容
		qr.data = order.value.code_url;
		// 设置二维码大小，,单位为px，要转化为rpx必须乘2必须与canvas设置的宽高一致
		qr.size = 150;
		// 调用制作二维码方法
		qr.make();
		// 获取canvas上下文
		var canvasContext = uni.createCanvasContext('qrcode');
		// 设置uQRCode实例的canvas上下文
		qr.canvasContext = canvasContext;
		// 调用绘制方法将二维码图案绘制到canvas上
		qr.drawCanvas();
	}
	const payment = () => {
		uni.switchTab({
			url: '../order/index'
		})
	}
	// 按钮点击事件
	const makePhoneCall=(e)=>{
		uni.makePhoneCall({
			// phoneNumber:e.currentTarget.dataset.tel,
			phoneNumber:'15907543388'
			
		})
	}
</script>

<style>
	page {
		background: #f4f4f4;
	}

	.od-banner {
		overflow: hidden;
		position: relative;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAABCAIAAACpCl0xAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHrSURBVHjadFVBcgMxCEP3Prtv6vfUrI1A2JvMtJPYGIQQgJ+/X0YgPh+uv/V1nTCI9ZORJthGaVyWrFehU9qX/cvP9d+d9Ieyf4uVqMxPRpf/jfm5SRs+vsxVzOd19Yq8gbmZrnaUJueJtrBjPHd+klJ3aNSRA8uAF0o8rnJg1ihOTizZ5tKeJttN7AHvKNYNu3jAWeJWyMVJKJ2T/9e4h+dR4vPJi4eLik2Rp4uhZOabjTNLK1IhreUzp8MFB8Mj06YaSwxU0Z8LsYQkVDfLmNWe1ZhWTHwcwcCYp0MNb9pbqt0pmkyWu4aBBdy0yLNXXorl6nbGfdqEpQydLz4oTm7N4xgFEXkUUhst68VhkpTw6YKpFnB+8CrLcZ6xNnMFuSLegU51Cm/pBkbOaLpVSND4FgbUcCihz5Igrh68dSL9LoaiNIxWqJ17W4XNjcLcspF2JbMYhLSQtvjwOmu6UZl9wtUEPX811zn1CGt1Sxv3KknFbZcZBTWqsqjDLHAkqx66V0mSUOqh2kmnsHL4oCHjy3iTWrLv1bYs1bF7xJpq20Snfw4T06EG+15qFJ3FftQIDMYlqeRjLC8czUWtbFiXsReJ+FVKYcSf67sHQl/5KGkaplpt/aiWyeK39WS2tJWL6CmUMv8XYABQPZBxCZSO0gAAAABJRU5ErkJggg==) repeat-y center;
		background-size: 100%;
	}

	.od-banner-icon {
		position: absolute;
		top: 30rpx;
		right: -20rpx;
		width: 130rpx;
		opacity: 0.6;
	}

	.od-jd {
		margin: 60rpx 40rpx;
	}

	.od-jd-out {
		background: #ffffff;
		border: 5rpx solid #ffffff;
		height: 20rpx;
		line-height: 20rpx;
		border-radius: 50rpx;
		overflow: hidden;
		position: relative;
	}

	.od-jd-in {
		height: 20rpx;
		line-height: 20rpx;
		border-radius: 50rpx;
		overflow: hidden;
		width: 0%;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAABCAIAAACpCl0xAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHrSURBVHjadFVBcgMxCEP3Prtv6vfUrI1A2JvMtJPYGIQQgJ+/X0YgPh+uv/V1nTCI9ZORJthGaVyWrFehU9qX/cvP9d+d9Ieyf4uVqMxPRpf/jfm5SRs+vsxVzOd19Yq8gbmZrnaUJueJtrBjPHd+klJ3aNSRA8uAF0o8rnJg1ihOTizZ5tKeJttN7AHvKNYNu3jAWeJWyMVJKJ2T/9e4h+dR4vPJi4eLik2Rp4uhZOabjTNLK1IhreUzp8MFB8Mj06YaSwxU0Z8LsYQkVDfLmNWe1ZhWTHwcwcCYp0MNb9pbqt0pmkyWu4aBBdy0yLNXXorl6nbGfdqEpQydLz4oTm7N4xgFEXkUUhst68VhkpTw6YKpFnB+8CrLcZ6xNnMFuSLegU51Cm/pBkbOaLpVSND4FgbUcCihz5Igrh68dSL9LoaiNIxWqJ17W4XNjcLcspF2JbMYhLSQtvjwOmu6UZl9wtUEPX811zn1CGt1Sxv3KknFbZcZBTWqsqjDLHAkqx66V0mSUOqh2kmnsHL4oCHjy3iTWrLv1bYs1bF7xJpq20Snfw4T06EG+15qFJ3FftQIDMYlqeRjLC8czUWtbFiXsReJ+FVKYcSf67sHQl/5KGkaplpt/aiWyeK39WS2tJWL6CmUMv8XYABQPZBxCZSO0gAAAABJRU5ErkJggg==) repeat-y center;
		background-size: 100%;
	}

	.od-jd-text {
		text-align: center;
		padding-top: 30rpx;
	}

	.od-jd-text text {
		color: #ffffff;
		font-size: 26rpx;
		opacity: 0.7;
	}

	.od-jd-10 .od-jd-in {
		width: 37%;
	}

	.od-jd-10 .od-jd-st-10 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-20 .od-jd-in {
		width: 64%;
	}

	.od-jd-20 .od-jd-st-20 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-30 .od-jd-in {
		width: 100%;
	}

	.od-jd-30 .od-jd-st-30 {
		opacity: 1;
		font-weight: bold;
	}

	.od-jd-40 .od-jd-in {
		width: 100%;
		background: #cccccc;
	}

	.od-st {
		font-size: 40rpx;
		font-weight: bold;
	}

	.od-stt {
		font-size: 26rpx;
	}

	.od-op {
		text-align: center;
		padding: 40rpx 60rpx 0 60rpx;
	}

	.od-staff-avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		margin-right: 20rpx;
	}

	.od-box {
		margin-top: 30rpx;
		background: #ffffff;
	}

	.od-box-tt {
		position: relative;
		padding-left: 20rpx;
		font-weight: bold;
	}

	.od-box-tt::before {
		display: block;
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 8rpx;
		height: 100%;
		background: #0bb684;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.od-box .weui-cells {
		margin: 0;
	}

	.od-box .weui-cells::before {
		display: none;
	}

	.od-box .weui-cells::after {
		display: none;
	}

	.od-box .weui-cell::before {
		display: none;
	}

	.od-box .weui-cell::after {
		display: none;
	}

	.op-cells {
		margin-top: 0;
	}

	.op-cells::before {
		left: 30rpx;
	}

	.op-cells .weui-cell::before {
		left: 30rpx;
	}

	.op-cells .weui-cell {
		padding: 30rpx;
	}

	.order-status {
		padding: 20px;
		border-radius: 10px 10px 0 0;
	}

	.uni-popup__wrapper {
		border-radius: 20rpx;
	}

	.text-center {
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.pay-box {
		padding: 40rpx;
	}

	.pay-box canvas {
		margin: 0 auto;
	}
</style>