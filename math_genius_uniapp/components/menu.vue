<template>
	<u-action-sheet
		v-model:show="show"
		:actions="list"
		:round="14"
		:close-on-click-overlay="true"
		:close-on-click-action="true"
		cancel-text="取消"
	/>
</template>

<script >
	import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
	import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
	import UActionSheet from 'uview-plus/components/u-action-sheet/u-action-sheet.vue'
	import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
	
	export default {
		components: {
			'u-action-sheet': UActionSheet,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon
		},
		data() {
			return {
				show:false,
				list:[{name:'关于'},{name:'错题集'},{name:'我要吐槽'}]
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
			}
		},
		computed: {
			
		}
		
	}
</script>

<style>
</style>