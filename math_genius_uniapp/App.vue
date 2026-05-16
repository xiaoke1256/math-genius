<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-plus/index.scss";
	
	/*每个页面公共css */
	uni-page-body,html,body{
		height: 100%;  
	}
	.page-wrap {
		//#ifdef MP-WEIXIN
		min-height: 100vh;
		//#endif
		height: 100%;
		width: 100%;
		box-sizing: border-box;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}
</style>
