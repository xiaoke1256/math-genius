<template>
  <view class="content">
	<view class="info-box" >
	    <view class="title-area">
			<text class="title"><h1>{{title}}</h1></text>
			<text>({{appName}})</text>
		</view>
		<view class="version-area">
			<text class="version" >版本: {{version}}</text>
		</view>
	</view>
	<view class="button-area">
		<u-button type="info" @click="back">返回</u-button>
	</view>
  </view>
</template>

<script>
import UButton from 'uview-plus/components/u-button/u-button.vue'
import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
import UIcon from 'uview-plus/components/u-icon/u-icon.vue'

export default {
	components: {
		'u-button':UButton
	},
    data() {
        return {
            version: '',
			title: '数学闯关小达人',
            name: '',
            appid: ''
        }
    },
    onLoad() {
	    console.log("uni.getSystemInfoSync().platform:",uni.getSystemInfoSync().platform);
		if(typeof(plus)==='undefined'){
			return;
		}
        // 获取应用版本信息
        if(uni.getSystemInfoSync().platform === 'android' || uni.getSystemInfoSync().platform === 'ios') {
	        const that = this
            plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
                that.version = widgetInfo.version
                that.name = widgetInfo.name
			    console.log("that.name:",that.name);
            })
        }
    },
	methods: {
		back(){
			uni.navigateBack();
		}
		
	},
	computed:{
		appName(){
			if(!this.name||this.name===''){
				return this.name;
			}
			console.log("typeof(this.name):",typeof(this.name))
			return this.name.replace('_',' ');
		}
	}
}
</script>
<style  lang="scss">
	.content{
		justify-content:center !important;
	}
	.info-box{
		border: 1rpx silver solid;
		border-radius: 40rpx;
		width: 80%;
		text-align: center;
		.title-area{
			margin-top: 100rpx;
			margin-bottom: 100rpx;
		}
		.title{
			font-family: "Microsoft YaHei", Arial, sans-serif;
			font-size: 36rpx;
			color: #747dff;
		}
		.version-area{
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		
	}
	.button-area{
		width: 80%;
		margin-top: 80rpx;
		margin-bottom: 150rpx;
		.u-button{
			width: 95%;
		}
	}
</style>