<template>
<view class="nav" :style="'height:'+(navHeight+status)+'rpx;'">
	<view :style="'height:'+status+'rpx;'+containerStyle"></view>
	<view class="headNav" v-if="isHome" :style="'height:'+navHeight+'rpx;line-height:'+navHeight+'rpx;padding-left:20rpx;'">
		<text class="city">中部地区</text>
		<view style="flex:1;">
			<navigator 
			url="../../pages/search/index"
			:style="'height:'+menu.height*2+'rpx;line-height:'+menu.height*2+'rpx;margin-top:'+(menu.top*2-status)+'rpx;margin-left:32rpx;margin-right:'+(menu.width*2+24)+'rpx;background:#f4f4f4;border-radius:200rpx;text-align:center;'"
			>
				<text 
				class="search-text" >找医院</text>
			</navigator>
		</view>
	</view>
	<view class="navbar" :style="'height:'+navHeight+'rpx;'+containerStyle" v-else>
		<view class="back-icon" @click="backorhome">
			<image src="../../static/resource/images/ic_arrow.png" v-if="pages>1" class="img1"></image>
			<!-- 返回的按钮 -->
			<image src="../../static/resource/images/ic_search_back.png"  v-else></image>
			<!-- 返回主页的按钮 -->
		</view>
		<view class="nav-title" v-if="titleText">
			<view :style="'height:'+navHeight+'rpx;line-height:'+navHeight+'rpx;'+textStyle">{{titleText}}</view>
		</view>
	</view>
</view>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { ref,defineProps,defineEmits } from 'vue'
const emit = defineEmits(['sendData','navBarAttached']);

const pages=ref(getCurrentPages().length)
// 获取页面栈的数量
const props=defineProps({
	background:{
		type:String,
		default:'rgba(255,255,255,1)'
	},	color:{
		type:String,
		default:'rgba(0,0,0,1)'
	},	fontSize:{
		type:Number,
		default:32
	},	iconWidth:{
		type:Number,
		default:116
	},iconHeight:{
		type:Number,
		default:38
	},titleText:{
		type:String,
		default:'标题'
	},isHome:{
		type:Boolean,
		default:false
	}
	
})
// 定义响应式变量
// 获取胶囊的信息
const menu=ref(uni.getMenuButtonBoundingClientRect())
const containerStyle=ref('')
const textStyle=ref("")
const iconStyle=ref('')
const status=ref(0)
const navHeight=ref(0)
	const setNavSize=()=>{
		const {system,statusBarHeight}=uni.getSystemInfoSync()
		status.value=statusBarHeight*2
		const isIOS=system.indexOf('ios')>-1
		if(!isIOS){
			navHeight.value=96
		}else{
			navHeight.value=88
		}
		
	}
	onBeforeMount(()=>{
		setNavSize()
		setStyle()
		sendValue()
		sendValue2()
	})
	const setStyle=()=>{
		containerStyle.value=['background:'+props.background].join(";")
		textStyle.value=['color:'+props.color,'font-size:'+props.fontSize+'rpx'].join(';')
		iconStyle.value=['width:'+props.iconWidth+'rpx','height:'+props.iconHeight+'rpx'].join(';')
	}
	const backorhome=()=>{
			
		if(pages.value>1){
			uni.navigateBack()
		}else{
			uni.switchTab({
				
					url:"/pages/index/index"
				
			})
		}
		
	}
	const sendValue2=()=>{
		emit('navBarAttached',{
			detail:{
				statusHeight:status.value,
				navHeight:navHeight.value,
				navBarHeight:status.value+navHeight.value
			}
		})
	}
	const sendValue = () => {
	  const he =ref(status.value+navHeight.value)
	  emit('sendData', he.value); // 触发 sendData 事件并传递值
	};
</script>

<style>
	.nav{
		position: fixed;
		width: 100%;
		top:0;
		left:0;
		z-index:2;
	}
	.back-icon{
		display: flex;
		align-items: center;
		width: 64rpx;
		height: 100%;
		margin-left: 20rpx;
	}
	.back-icon image{
		width: 64rpx;
		height: 64rpx;
	}
	.img1 {
	  transform: rotate(180deg);
	}
	.navbar{
		position: relative;
	}
	.nav-title{
		position: absolute;
		top:0;
		left:50%;
		transform: translate(-50%);
	}
	.navbar{
		display: flex;
	}
	.city{
		display:inline-block;
		position: relative;
		font-size: 30rpx;
		font-weight: bold;
		padding-left:55rpx;
		background: url(../../static/resource/images/ic_city.png) no-repeat left center;
		background-size:40rpx;
	}
	.headNav {
	    display: flex; /* 修改为 flex */
	    justify-content: flex-start;
	}
	.city:after{
		content:'';
		height:6px;
		width: 6px;
		border-width:1px 1px 0 0;
		border-color:#353535;
		border-style:solid;
		-webkit-transform:matrix(0.71,0.71,-0.71,0.71,0,0);
		transform:matrix(0.71,0.71,-0.71,0.71,0,0);
		position: relative;
		top:-2px;
		position: absolute;
		top:50%;
		margin-top:-4px;
		right:-10px;
	}
.search-text {
    display: inline-block;
    padding-left: 30rpx;
    color: #bbbbbb;
    font-size: 26rpx;
    background: url(../../static/resource/images/ic_search.png) no-repeat left center; 
    background-size: 23rpx;
}
</style>