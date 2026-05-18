<template>
	<view class="content">
		<view class="info-box" >
			<view class="title-area">
				<!--#ifdef MP-WEIXIN-->
				<text>请在以下渠道吐槽：</text>
				<!--#endif-->
				<!--#ifndef MP-WEIXIN-->
				<text>请登录以下平台吐槽：</text>
				<!--#endif-->
			</view>
			<view class="link-area">
				<!--#ifdef MP-WEIXIN-->
				<view>
					&bull; 请在“小程序右上角更多 → 反馈与投诉”中和开发者反馈
				</view>
				<!--#endif-->
				<!--#ifndef MP-WEIXIN-->
				<view>
					&bull; <text>微博：</text> <text class="link" @click="openInBrowser('https://weibo.com/u/1478889745')">去吐槽</text>
				</view>
				<view>
					&bull; <text>guthub：</text> <text class="link" @click="openInBrowser('https://github.com/xiaoke1256/math-genius/discussions/categories/announcements')" >去吐槽</text>
				</view>
				<!--#endif-->
				<view>
					&bull; <text>邮箱：</text> <text>xiaoke_1256@sina.com</text>
				</view>
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
			'u-button':UButton,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon,
		},
		methods: {
			back(){
				uni.navigateBack({
					"fail":(e)=>{
						console.log("e:",e);
					}
				});
			},
			openInBrowser(url){
				// #ifdef H5
				window.open(url, '_blank');
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL(url);
				// #endif
				// #ifdef MP-WEIXIN
				uni.showActionSheet({
					itemList: ['小程序内预览', '复制到浏览器'],
					success: (res) => {
						if (res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/webview/webview?url=' + encodeURIComponent(url),
								fail: () => {
									uni.showModal({
										title: '无法预览',
										content: '该链接未配置业务域名，可尝试「复制到浏览器」打开',
										showCancel: false
									});
								}
							});
						} else if (res.tapIndex === 1) {
							uni.setClipboardData({
								data: url,
								success: () => {
									uni.showModal({
										title: '在浏览器中打开',
										content: '链接已复制。请切换到手机浏览器，在地址栏长按粘贴后访问。',
										showCancel: false
									});
								},
								fail: () => {
									uni.showModal({
										title: '在浏览器中打开',
										content: url,
										showCancel: false
									});
								}
							});
						}
					}
				});
				// #endif
			}
			
		},
	}
</script>

<style lang="scss">
	.content {
		justify-content:center !important;
		//#ifdef MP-WEIXIN
		min-height: 100vh;
		//#endif
	}
	.info-box {
		border: 1rpx silver solid;
		border-radius: 40rpx;
		width: 80%;
		text-align: left;
		justify-content:center !important;
		.title-area{
			font-family: "Microsoft YaHei", Arial, sans-serif;
			font-size: 1.2rem;
			text-align: center;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}
		.title {
			font-family: "Microsoft YaHei", Arial, sans-serif;
			font-size: 36rpx;
			color: #747dff;
		}
		.link-area {
			margin: 20rpx auto;
			text-align: left;
			min-width: 60%;
			width: 80%;
			.link {
				text-decoration: underline;
				color: #0000ff;
			}
			uni-view {
				display: flex;
				flex-direction: row;
				white-space: nowrap;
			}
		}
		
	}
	.button-area {
		width: 80%;
		margin-top: 80rpx;
		margin-bottom: 150rpx;
		.u-button {
			width: 95%;
		}
	}
</style>