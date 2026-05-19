<template>
	<view class="page-wrap">
		<view class="content">
			<view :style="{backgroundImage:`url(${indexBackgroundImage})`}" class="text-area">
				<text class="title">{{ title }}</text>
			</view>
			<view class="select-grade-area">
				<view class="sub-title">
					<text>选择年级</text>
				</view>
				<u-button :type="grade=='1-2'?'primary':'info'" @click="onSelect('1-2')">1-2年级</u-button>
				<u-button :type="grade=='3-4'?'primary':'info'" @click="onSelect('3-4')">3-4年级</u-button>
				<u-button :type="grade=='5-6'?'primary':'info'" @click="onSelect('5-6')">5-6年级</u-button>
			</view>
			<view class="button-area">
				<u-button type="primary" :plain="true" @click="toMain">{{startText}}</u-button>
			</view>
		</view>
		<sys-menu ref="sysMenu" />
	</view>
</template>

<script>
	import UButton from 'uview-plus/components/u-button/u-button.vue'
	import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
	import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
	import Menu from '/components/menu.vue'
	import indexBackgroundImage from "@/static/banner.svg"

	export default {
		components: {
			UButton,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon,
			'sys-menu':Menu
		},
		data() {
			return {
				title: '数学闯关小达人',
				startText:'开始闯关',
				grade:'1-2',
				indexBackgroundImage:indexBackgroundImage
			}
		},
		onLoad() {
		},
		methods: {
			onSelect: function(selectedGrade){
				console.log("selectedGrade:"+selectedGrade)
				this.grade = selectedGrade;
				
			},
			toMain:function(){
				
				uni.navigateTo({
					url: '/pages/main/main?grade='+this.grade,
					fail: (err) => {
						console.error('navigateTo fail', err)
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.content {
		//#ifdef MP-WEIXIN
		min-height: 100vh;
		//#endif
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-top: 50rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;
		border-radius: 30rpx;
		width: 80%;
		height: 35%;
		//#ifdef MP-WEIXIN
		min-height: 35vh;
		//#endif
	}
	.button-area {
		margin-bottom: 150rpx;
	}
	.select-grade-area {
		width: 100%;
		padding: 60rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}
	.sub-title {
		font-family: "Microsoft YaHei", Arial, sans-serif;
		margin-left:10rpx;
		font-size: 1.125rem;
		font-weight: 600;
	}

	.title {
		font-family: "Microsoft YaHei", Arial, sans-serif;
		font-size: 48rpx;
		font-weight: 600;
		color: #747dff;
		margin-top: 15rpx;
	}
</style>
