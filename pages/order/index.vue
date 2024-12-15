<template>
	<view>
		<view style="width: 100%; border-bottom: 0 none; position: fixed; z-index: 2;top:0;">
			<view style="background: #ffffff; position: relative">
				<view class="h-tab vp-flex">
					<view :class="'h-tab-item vp-flex_1 ' + (filt == '' ? 'on' : '')" data-filt=""
						@tap="onFilterChange">全部</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 1 ? 'on' : '')" data-filt="1"
						@tap="onFilterChange">待支付</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 2 ? 'on' : '')" data-filt="2"
						@tap="onFilterChange">待服务</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 3 ? 'on' : '')" data-filt="3"
						@tap="onFilterChange">已完成</view>
					<view :class="'h-tab-item vp-flex_1 ' + (filt == 4 ? 'on' : '')" data-filt="4"
						@tap="onFilterChange">已取消</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<block v-if="list != null">
		        <view v-if="list != null && list.length == 0" style="padding: 40rpx 40rpx 40rpx 40rpx; text-align: center">
		            <image src="/static/resource/images/empty.png" mode="widthFix" style="width: 200rpx" />
		            <view class="f5">没有相关内容~</view>
		        </view>
		        <view v-else class="od-list">
		            <block v-for="(item, index) in list" :key="index">
		                <view class="od-item" @tap="toOrder" :data-id="item.out_trade_no">
		                    <view class="weui-cell weui-cell_access">
		                        <view class="weui-cell__hd">
		                            <view>
		                                <image :src="item.service_logo_image_url" mode="widthFix" class="od-logo"
		                                    style="width: 100rpx; height: 100rpx; margin-right: 20rpx" />
		                            </view>
		                        </view>
		                        <view class="weui-cell__bd">
		                            <view>
		                                <text style="font-weight: bold">{{ item.service_name }}</text>
		                            </view>
		                            <view class="od-info">
		                                <block v-if="item.service_stype <= 20">
		                                    <view>
		                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
		                                    </view>
		                                    <view>
		                                        预约时间：
		                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
		                                    </view>
		                                    <view>
		                                        就诊人员：
		                                        <text>{{ item.client_name }}</text>
		                                    </view>
		                                </block>
		                                <block v-if="item.service_stype > 20 && item.service_stype < 100">
		                                    <view>
		                                        <text>{{ item.hospital_name }}（{{ item.area_name }}）</text>
		                                    </view>
		                                    <view>
		                                        处理时间：
		                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
		                                    </view>
		                                </block>
		                                <block v-if="item.service_stype > 100">
		                                    <view>
		                                        服务时间：
		                                        <formater :timestamp="item.starttime" format="MM-dd hh:mm"></formater>
		                                    </view>
		                                    <view>
		                                        服务对象：
		                                        <text>{{ item.client_name }}</text>
		                                    </view>
		                                    <!-- <view>服务地址：<text>{{item.address.address}}</text> </view> -->
		                                </block>
		                            </view>
		                        </view>
		                        <view class="weui-cell__ft">
		                            <!-- 待付款 -->
		                            <block v-if="item.trade_state == '待支付'">
		                                <view style="color: #ffa200"><text>待支付</text></view>
		                                <view style="color: #ffa200">
		                                    <counter style="font-size: 24rpx" :second="item._exp_time"
		                                        @counterOver="onCounterOver" />
		                                </view>
		                            </block>
		                            <!-- 进行中 -->
		                            <block v-if="item.trade_state == '待服务'">
		                                <view style="color: #1da6fd"><text>待服务</text></view>
		                            </block>
		                            <!-- 已完成 -->
		                            <block v-if="item.trade_state == '已完成'">
		                                <view style="color: #21c521"><text>已完成</text></view>
		                            </block>
		                            <!-- 已取消 -->
		                            <block v-if="item.trade_state == '已取消'">
		                                <view style="color: #999999"><text>已取消</text></view>
		                            </block>
		                        </view>
		                    </view>
		                </view>
		            </block>
		        </view>
		    </block>
	</view>
</template>

<script setup>
	import UQRCode from 'uqrcodejs';
	import {
		onMounted,
		ref,
		toRaw,
		reactive
	} from 'vue'
	import {
		onLoad,
		onShow,
		onUnload
	} from '@dcloudio/uni-app'
	const list=ref(null)
	const filt=ref('')
	// 记录当前的tap
	const app = getApp()
	onLoad(()=>{
		
	})
	onShow(() => {
		// 调用订单列表
		filt.value=app.globalData.orders_filt
		loadList()
	})
	const onFilterChange=(e)=>{
		// 订单状态筛选
		// 点击高亮显示
		const {filt:curFilt}=e.currentTarget.dataset
		if(curFilt===filt.value){
			return
		}
		filt.value=curFilt
		loadList()
	}
	const loadList=()=>{
		app.globalData.utils.request({
			url: '/order/list',
			method: 'GET',
			data:{
				state:filt.value
			},
			header: {
				token: uni.getStorageSync('token')
			},
			success: (res) => {
				
				list.value=res.data
			},
			fail:()=>{
				uni.showToast({
					title:res.msg,
					icon:'none',
				})
			}
		})
	}
	// 跳转订单详情方法
	const toOrder=(e)=>{
		uni.navigateTo({
			url:'../order/order?oid='+e.currentTarget.dataset.id
		})
	}
	// 倒计时结束的回调函数
	const onCounterOver=()=>{
		loadList()
	}
	
</script>

<style>
	page {
		background: #f4f4f4;
	}

	.od-item {
		margin: 20rpx;
		background: #ffffff;
		border: 1rpx solid #eeeeee;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.od-item .weui-cell {
		padding: 30rpx;
		-webkit-box-align: stretch;
		-webkit-align-items: stretch;
		align-items: stretch;
	}

	.od-logo {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 10rpx;
	}

	.od-info view {
		font-size: 24rpx;
		color: #999999;
	}

	.od-info text {
		font-size: 24rpx;
		color: #999999;
	}

	.od-item .weui-cell__ft text {
		font-size: 24rpx;
	}
</style>