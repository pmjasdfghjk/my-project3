<script>
	import utils from './common/js/utils'
	export default {
		onLaunch: function() {
			console.log('我调用了1')
			utils.request({
				url:'/app/init',
				success:(res)=>{
					uni.setStorageSync('cfg',res.data.cfg)
					console.log(res,'我在干嘛')
				},
					
				fail:(res)=>{
					// 我失败了
					console.log(res,'我失败了')
				}
			})
			console.log('我调用了2')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			utils:utils
		}
	}
</script>

<style>
	@import './app.css';
</style>
