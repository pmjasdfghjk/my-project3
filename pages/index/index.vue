<template>
	<view class="content">
		<navbar  :isHome="true" ref="navBar" @sendData="handleData" :style="'height:'+message+'rpx;'"/>
		
		<view class="" >
			<view class="weui-cell" style="background: #fff9eb;">
				<view class="weui-cell-hd">
					<image src="/static/resource/images/ic_myapp.png" style="display:block;width: 40rpx;height: 40rpx;margin-right: 14rpx;"></image>
				</view>
				<view class="weui-cell-bd">
					<text style="color:#be9719;font-size: 13px;">点击右上角“添加到我的小程序”，方便下次找到！</text>
				</view>
				<view class="weui-cell-ft" >
					<image src="../../static/resource/images/modal_closer.png" style="display: block;width: 15px;height: 15px;"></image>
				</view>
			</view>
			<view v-if="slides&&slides.length>0" class="index-swiper">
				<swiper autoplay circular :interval="4000" :duaration="500">
					<block v-for="(item,index) in slides" :key="item.id">
						<swiper-item>
							<image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view  v-if="nav2&&nav2.length>0" class="nav2-list">
			<block v-for="(item,index) in nav2" :key="index">
				<view class="nav2-item" :data-index="index" @click="onNav2Tap">
					<view class="nav2-pic">
						<image :src="item.pic_image_url" mode="widthFix"></image>
					</view>
					
				</view>
				
			</block>
			
		</view>
		<view v-if="navs&&navs.length>0" class="nav-list">
		<block v-for="(item,index) in navs" :key="index">
			<view class="nav-item" :data-index="index" @click="onNavTap">
				<view class="nav-pic">
					<image :src="item.pic_image_url"></image>
				</view>
				<view>
					<text class="nav-text" :style="'color:'+(item.tcolor?item.tcolor:'')+';'">{{item.title}}</text>
				</view>
			</view>
		</block>
		</view>
		<view class="weui-cells hosp-list">
			<!-- 议员列表的渲染 -->
			<view class="weui-cell hosp-item weui-cell_access" v-for="(item,index) in hospitals" :key="item.id" :data-hid="item.id" @click="toHospital">
				<view class="weui-cell__bd">
					<image :src="item.avatar?item.avatar_url:'../../static/resource/images/avatar.jpg'" mode="aspectFill" class="hosp-avatar"></image>
				</view>
				
				<view class="weui-cell__bd">
					<view >
						<text class="hosp-name">{{item.name}}</text>
					</view>
					<view class="hosp-line">
						<text class="hosp-rank">{{item.rank}}</text>
						<text class="hosp-label">{{item.name}}</text>
					</view>
					<view class="hosp-line">
						<text class="hosp-intro">{{item.intro}}</text>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>

import {onMounted,ref,toRaw} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
const app=getApp()
// 定义轮播图数据
const slides=ref([])
const nav2=ref([])
// 快捷入口
// 快捷入口
const navs=ref([])
// 议员列表存放数据1
const hospitals=ref([])
onLoad(()=>{
	app.globalData.utils.getUserInfo()
	app.globalData.utils.request({
		url:'/app/init',
		success:res=>{
			
			const {id}=res.data.area
			// 通过id获取当前页面的数据
			app.globalData.utils.request({
				url:'/Index/index',
				data:{
					aid:id
				},
				success:({data})=>{
					
					slides.value=data.slides
					
					nav2.value=data.nav2s
					navs.value=data.navs
					hospitals.value=data.hospitals
					
				}
			})
		}
	})
	
})
const message = ref(''); // 用于接收来自子组件的数据
// 处理子组件传来的数据
const handleData = (data) => {
  message.value = data; 
  
};
const title=ref("你好")
const navigateto=()=>{
	uni.navigateTo({
		url:"/pages/search/index"
	})
	
}
// 因为两个渲染的点击事件的逻辑都是差不多的,所以我们直接进行封装
const jump=(nav,type)=>{
	
	if(nav.stype==1){
		uni.navigateTo({
			url:nav.stype_link
		})
	}
}
const onNav2Tap=(event)=>{
	const nav=toRaw(nav2.value)[event.currentTarget.dataset.index]
	// 判断是否为内部链接
	jump(nav,'nav2')

}
const onNavTap=(event)=>{
	const nav=toRaw(navs.value)[event.currentTarget.dataset.index]
	jump(nav,'navs')
}
const toHospital=(event)=>{
	// 跳转到医院列表详情
	uni.navigateTo({
		url:'../hospital/index?hid='+event.currentTarget.dataset.hid
	})
}



</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	page{
		background-color: white;
	}
	.index-swiper{
		padding: 20rpx 20rpx 0 20rpx;
		overflow: hidden;
		
	}
	.index-swiper swiper{
		height:320rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}
	.index-swiper swiper-item image{
		width: 100%;
		height: 100%;
	}
	.nav2-list {
	    margin: 10rpx 20rpx 0 20rpx;
	}
	.nav2-list::after {
	    content: '';
	    display: block;
	    height: 0;
	    line-height: 0;
	    clear: both;
	    visibility: hidden;
	}
	.nav2-item {
	    float: left;
	    margin-top: 20rpx;
	    width: 50%;
	    text-align: center;
	    box-sizing: border-box;
	    padding: 0 5rpx;
	}
	.nav2-pic {
	    width: 100%;
	}
.nav2-pic image {
    display: block;
	width: 350rpx;
}
.nav-list{
	width: 100%;
}
.nav-list::after {
    content: '';
    display: block;
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
}
.nav-item {
    float: left;
    margin-top: 20rpx;
    width: 20%;
    text-align: center;
    padding: 10rpx 0;
	
}
.nav-pic image {
    display: block;
    margin: 0 auto;
    width: 110rpx;
    height: 110rpx;
}
.nav-text {
    font-size: 24rpx;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
}

.hosp-list {
    margin: 10rpx 0 0 0;
    background: none;
}
.hosp-list::before {
    display: none;
}
.hosp-list::after {
    display: none;
}

.hosp-item {
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    padding: 20rpx;
    margin: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04), 0 1px 6px 0 rgba(0, 0, 0, 0.04);
}
.hosp-item::before {
    display: none;
}
.hosp-item::after {
    display: none;
}
.hosp-name {
    font-weight: bold;
    font-size: 34rpx;
}
.hosp-avatar {
    display: block;
    width: 200rpx;
    height: 180rpx;
    border-radius: 10rpx;
    overflow: hidden;
    margin-right: 20rpx;
}
.hosp-line {
    margin-top: 5rpx;
}
.hosp-line text {
    font-size: 26rpx;
}
.hosp-rank {
    font-weight: bold;
    color: #0bb585;
    margin-right: 15rpx;
}
.hosp-label {
    font-weight: bold;
    color: #0ca7ae;
    margin-right: 15rpx;
}
.hosp-intro {
    color: #999999;
}
</style>
