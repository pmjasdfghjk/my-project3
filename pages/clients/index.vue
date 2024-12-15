<template>
	<view class="cell-box" v-for="(item, index) in clients" :key="index">
	    <view class="weui-cell" @click="onClientSelected" :data-index="index">
	        <view class="weui-cell__bd">
	            <view>
	                <text style="font-weight: bold">{{ item.name }}</text>
	            </view>
	            <view>
	                <text :class="'sext' + item.sex">{{ item.sex == 1 ? '男' : '女' }}</text>
	                <text style="margin-left: 10rpx">{{ item.age }}周岁</text>
	                <text style="margin-left: 10rpx">{{ item.mobile }}</text>
	            </view>
	        </view>
	        <view class="weui-cell__ft">
	            <text v-if="act == 'select'" style="
	                display: inline-block;
	                padding: 15rpx 30rpx;
	                border: 1rpx solid #0bb584;
	                color: #0bb584;
	                font-weight: bold;
	                border-radius: 10rpx;
	                font-size: 28rpx;
	                overflow: hidden;
	            ">
	                选择
	            </text>
	            <text v-else @click="removeClient" :data-id="item.id" style="
	                display: inline-block;
	                padding: 15rpx 30rpx;
	                border: 1rpx solid #eeeeee;
	                color: #f13e6d;
	                border-radius: 10rpx;
	                font-size: 28rpx;
	                overflow: hidden;
	            ">
	                移除
	            </text>
	        </view>
	    </view>
	</view>
</template>

<script setup>
	import {onMounted,ref,toRaw,reactive} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	const act=ref('')
	const app=getApp()
	const clients=ref([])
	onLoad((options)=>{
		act.value=options.act
		if(options.act=='select'){
			uni.setNavigationBarTitle({
				title:'请选择服务对象'
			})
		}else{
			uni.setNavigationBarTitle({
				title:'服务对象管理'
			})
		}
		// 获取服务对象信息
		app.globalData.utils.request({
			url:'/User/clients',
			success(res){
				
				clients.value=res.data.clients
				
			}
		})
		
	})
	const onClientSelected=(e)=>{
		// 点击选择按钮触发的事件
		if(act==''){
			return
		}
		const index=e.currentTarget.dataset.index
		const clientsData=clients.value[index]
		// 触发全局自定义事件
		uni.$emit('clientsChange',toRaw(clientsData))
		uni.navigateBack()
	}
	const removeClient=()=>{
		// 点击删除触发的事件
		
	}
</script>

<style>
page {
    background: #f4f4f4;
}
.weui-cells {
    margin: 0;
}
.weui-cell {
    padding: 20rpx 30rpx;
}
.weui-cell view {
    font-size: 30rpx;
}
.weui-cell text {
    font-size: 30rpx;
}

.cell-box {
    margin: 20rpx;
    position: relative;
    border-radius: 10rpx;
    background: #ffffff;
    overflow: hidden;
}

.sext1 {
    color: #4881df;
}
.sext2 {
    color: #df4872;
}

.sex {
    padding: 15rpx 30rpx;
    display: inline-block;
    border: 1rpx solid #eeeeee;
}
.sex1 {
    border-right: 0 none;
    border-radius: 8rpx 0 0 8rpx;
}
.sex2 {
    border-radius: 0 8rpx 8rpx 0;
}
.sex1on {
    background: #4881df;
    border-color: #3b77dc;
    color: #ffffff;
}
.sex2on {
    background: #df4872;
    border-color: #df4872;
    color: #ffffff;
}
</style>
