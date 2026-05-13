<template>
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
	
	export default {
		
		components: {
			'u-action-sheet': UActionSheet,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon
		},
		data() {
			return {
				show:false,
				list:[{name:MENU_NAME_ABOUT},{name:'错题集'},{name:'我要吐槽'}]
			}
		},
		mounted(){
			console.log("mounted;");
			onNavigationBarButtonTap((e) => {
			    console.log('点击了导航栏按钮，e：', e)
				if(e.type=='menu'){
					this.open();
				}
				
			})
		},
		methods: {
			open(){
				this.show = true;
			},
			onClick(opt){
				console.log("opt:",opt);
				switch (opt.name){
					case MENU_NAME_ABOUT:
						console.log("lalala!");
						uni.navigateTo({
							url: '/pages/index/about',
							fail: (err) => {
								console.error('navigateTo fail', err)
							}
						})
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
</style>