<template>
	<view class="content">
		<view class="text-area">
			<text class="title"><h1>{{title}}</h1></text>
		</view>
		<view class="select-grade-area">
			<view class="sub-title">
				<text>选择年级</text>
			</view>
			
			<u-button :type="grade=='1-2'?'primary':'info'" data-grade="1-2" @click="onSelect">1-2年级</u-button>
			<u-button :type="grade=='3-4'?'primary':'info'" data-grade="3-4" @click="onSelect">3-4年级</u-button>
			<u-button :type="grade=='5-6'?'primary':'info'" data-grade="5-6" @click="onSelect">5-6年级</u-button>
		</view>
		<view class="button-area">
			<button @click="toMain">{{startText}}</button>
		</view>
	</view>
</template>

<script>
	import UButton from 'uview-plus/components/u-button/u-button.vue'
	import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
	import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
	
	export default {
		components: {
			UButton,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon
		},
		data() {
			return {
				title: '数学闯关小达人',
				startText:'开始闯关',
				grade:'1-2',
				show: false,
				list: []
			}
		},
		onLoad() {

		},
		methods: {
			onSelect: function(event){
				const selectedGrade = event.currentTarget.dataset.grade;
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

<style>
	.content {
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
	}
	.button-area {
		margin-bottom: 50rpx;
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
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
