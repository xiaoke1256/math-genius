<template>
	<view class="page-wrap">
		<view class="content">
			<view class="text-area">
				<image class="text-area-bg" :src="indexBackgroundImage" mode="widthFix" />
				<text class="title">{{ title }}</text>
			</view>
			<view class="select-grade-area">
				<view class="sub-title">
					<text>选择年级</text>
					<view class="icon-wrap" @click="showInstruction" >
                        <u-icon name="question" color="#999" size="20" />
                    </view>
				</view>
				<view class="grade-row">
					<u-button :type="grade=='1-2'?'primary':'info'" @click="onSelect('1-2')">1-2年级</u-button>
				</view>
				<view class="grade-row">
					<u-button :type="grade=='3-4'?'primary':'info'" @click="onSelect('3-4')">3-4年级</u-button>
				</view>
				<view class="grade-row">
					<u-button :type="grade=='5-6'?'primary':'info'" @click="onSelect('5-6')">5-6年级</u-button>
				</view>
			</view>
			<view class="button-area">
				<u-button type="primary" :plain="true" @click="toMain">{{startText}}</u-button>
			</view>
		</view>
		<sys-menu ref="sysMenu" />
		
		<u-modal :show="showModal" @confirm="this.showModal=false" title="题型说明" >
			<view class="slot-content">
				<instruction/>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import UButton from 'uview-plus/components/u-button/u-button.vue'
	import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
	import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
	import UModal from 'uview-plus/components/u-modal/u-modal.vue'
	import Menu from '/components/menu.vue'
	import indexBackgroundImage from "@/static/banner.jpeg"
	import Instruction from '/pages/index/instruction.vue'
	

	export default {
		components: {
			UButton,
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon,
			'sys-menu':Menu,
			'u-modal':UModal,
			'instruction':Instruction
		},
		data() {
			return {
				title: '数学闯关小达人',
				startText:'开始闯关',
				grade:'1-2',
				indexBackgroundImage: indexBackgroundImage,
				showModal:false
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
				});
			},
			showInstruction(){
				this.showModal = true;
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
		position: relative;
		margin-top: 50rpx;
		overflow: hidden;
		border-radius: 30rpx;
		width: 80%;
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
		.grade-row{
			display: flex;
			flex-direction: row;
			align-items: center;

			.u-button{
				
			}
		}
		
	}
	.sub-title {
		font-family: "Microsoft YaHei", Arial, sans-serif;
		margin-left:10rpx;
		font-size: 1.125rem;
		font-weight: 600;
		display: flex;
        flex-direction: row;
        gap: 10rpx;
		align-items: center;
		.icon-wrap{
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.9);
        }
	}

	.text-area-bg {
		display: block;
		width: 100%;
	}

	.title {
		position: absolute;
		top: 15rpx;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 1;
		font-family: "Microsoft YaHei", Arial, sans-serif;
		font-size: 48rpx;
		font-weight: 600;
		color: #747dff;
	}
</style>
