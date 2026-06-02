<!-- 每关结束的统计页面 -->
<template>
	<view class="static-area">
		<view>
			<u-count-to class="score" :startVal="0" :endVal="score"></u-count-to>分
		</view>
		<view class="static-items-area">
			<view class="static-stats">
				<view class="row">
					<view>
						<text>错题数：</text>
					</view>
					<view>
						{{errorCount}}题&nbsp;<u-button v-if="errorCount>0" size="small" @click="showReview">回顾</u-button>
					</view>
				</view>
				<view class="row">
					<view>
						<text>耗时：</text>
					</view>
					<view>
						<text>{{expendTime}}秒</text>
					</view>
				</view>
				<view class="row">
					<view>
						<text>最高连击：</text>
					</view>
					<view>
						<text>{{hightestCombo}}次</text>
					</view>
				</view>
				<view class="row">
					<view>
						<text>最高关卡：</text>
					</view>
					<view>
						<text>第{{level}}关</text>
					</view>
				</view>
				<view class="row">
					<view>
						<text>称号：</text>
					</view>
					<view>
						<text>{{}}</text><!--称号-->
					</view>
				</view>
			</view>
			<image v-if="isSuccess" class="winner-image" :src="winnerImage" mode="aspectFit" />
		</view>
	</view>
</template>

<script>
	import winnerImage from "@/static/winner.png"
	import UCountTo from "uview-plus/components/u-count-to/u-count-to.vue"
	import ULoadingIcon from 'uview-plus/components/u-loading-icon/u-loading-icon.vue'
	import UIcon from 'uview-plus/components/u-icon/u-icon.vue'
	
	export default {
		components: {
			'up-icon': UIcon,
			'u-loading-icon': ULoadingIcon,
			'u-count-to':UCountTo
		},
		props: {
		    score:0,
		    errorCount:0,
		    expendTime:0,
		    hightestCombo:0,
		    level:1,
			isSuccess: false,
		},
		data(){
			return {
				winnerImage:winnerImage
			}
		},
		mounted(){
			
		},
		methods:{
			showReview(){
				console.log("showReview.");
				this.$emit('showErrorQuestions')
			}
		}
	}
</script>

<style lang="scss">
	.static-area {
		width: 100%;
		align-items:center;
		>view{
			text-align: center;
		}
		.title,.score{
			font-size: 2rem !important;
			font-weight: 600 !important;
			color: black !important;
		}
		.row{
			display: flex;
			flex-direction: row;
			view{
				display: flex;
				flex-direction: row;
				white-space:nowrap;
				text-align: left;
			}
			:first-child{
				width: 70%;
			}
			:nth-child(2){
				width: 30%;
			}
			text{
				white-space:nowrap;
			}
			.u-button{
				margin-left: 10rpx;
				margin-right: 10rpx;
				background-color: rgba(255, 255, 255, 0.5) !important;
			}
			
		}
		.winner-image{
			height: 300rpx;
			width:200rpx;
			position: relative;
			z-index: 1;
			flex-shrink: 0;
			left: -50rpx;
		}
		
	}
	.static-items-area{
		display: flex;
		flex-direction: row;
		justify-content:center;
		width:100%;
		align-items:center;
		position: relative;
	}
	.static-stats{
		position: relative;
		margin-left: 50rpx;
		margin-right: 50rpx;
		z-index: 2;
		flex: 1;
	}
</style>