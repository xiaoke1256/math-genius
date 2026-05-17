<template>
  <view class="content">
	<view class="info-box" >
	    <view class="title-area">
			<view>
				<text class="title">{{title}}</text>
			</view>
			<view>
				<text>({{appName}})</text>
			</view>
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
import manifest from '@/manifest.json'

export default {
	components: {
		'u-button':UButton,
		'up-icon': UIcon,
		'u-loading-icon': ULoadingIcon,
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
        // #ifdef APP-PLUS
        const platform = uni.getSystemInfoSync().platform
        if (platform === 'android' || platform === 'ios') {
            const that = this
            plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
                that.version = widgetInfo.version
                that.name = widgetInfo.name
            })
        }
        // #endif
        // #ifdef MP-WEIXIN
        try {
            const { miniProgram } = uni.getAccountInfoSync()
            // 正式版有线上版本号；开发版/体验版常为空
            this.version = miniProgram.version || manifest.versionName
			console.log("成功从 getAccountInfoSync 获取版本信息 this.version:",this.version);
        } catch (e) {
            this.version = manifest.versionName
        }
        this.name = manifest.description || manifest.name
        // #endif
        // #ifndef APP-PLUS || MP-WEIXIN
        this.version = manifest.versionName
        this.name = manifest.description || manifest.name
        // #endif
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
		//#ifdef MP-WEIXIN
		min-height: 100vh;
		//#endif		
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