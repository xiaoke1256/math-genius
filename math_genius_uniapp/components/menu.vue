<template>
	<!-- #ifdef MP-WEIXIN -->
	<view
		class="wx-nav-menu-btn"
		:style="wxMenuBtnStyle"
		@click="open"
	>
		<u-icon name="list" color="#333" size="20" />
	</view>
	<!-- #endif -->
	<u-action-sheet
		v-model:show="show"
		:actions="list"
		:round="14"
		:close-on-click-overlay="true"
		:close-on-click-action="true"
		cancel-text="取消"
		@select="onClick"
	/>
</template>

<script >
	import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
	import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
	import UActionSheet from 'uview-plus/components/u-action-sheet/u-action-sheet.vue'
	import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
	
	const MENU_NAME_ABOUT = '关于';
	const MENU_NAME_COMPLAIN = '我要吐槽';
	
	export default {
		
		components: {
			'u-action-sheet': UActionSheet,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon
		},
		data() {
			return {
				show:false,
				list:[{name:MENU_NAME_ABOUT},{name:'错题集'},{name:MENU_NAME_COMPLAIN}],
				wxMenuBtnStyle: {}
			}
		},
		mounted(){
			// #ifndef MP-WEIXIN
			onNavigationBarButtonTap((e) => {
				if(e.type=='menu'){
					this.open();
				}
			})
			// #endif
			// #ifdef MP-WEIXIN
			this.$nextTick(() => {
				setTimeout(() => this.initWxNavMenuBtn(), 50);
			});
			// #endif
		},
		methods: {
			initWxNavMenuBtn() {
				const capsule = uni.getMenuButtonBoundingClientRect();
				console.log("capsule:",capsule)
				const gap = 6;
				const size = capsule.height;
				// 与胶囊同高、紧贴胶囊左侧，处于导航栏最右上角可放置区域
				this.wxMenuBtnStyle = {
					top: `${gap}px`,
					left: `${capsule.left + capsule.width - size - gap}px`,
					width: `${size}px`,
					height: `${size}px`
				};
			},
			open(){
				this.show = true;
			},
			onClick(opt){
				console.log("opt:",opt);
				switch (opt.name){
					case MENU_NAME_ABOUT:
						uni.navigateTo({
							url: '/pages/index/about',
							fail: (err) => {
								console.error('navigateTo fail', err)
							}
						})
						break;
					case MENU_NAME_COMPLAIN:
						uni.navigateTo({
							url: '/pages/index/complain',
							fail: (err) => {
								console.error('navigateTo fail', err)
							}
						});
						break;
					default:
						console.log('error!');
				}
				
			}
		},
		computed: {
			
		}
		
	}
</script>

<style>
	/* #ifdef MP-WEIXIN */
	.wx-nav-menu-btn {
		position: fixed;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
	}
	/* #endif */
</style>