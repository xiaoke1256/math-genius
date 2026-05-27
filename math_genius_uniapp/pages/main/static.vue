<!-- 每关结束的统计页面 -->
<template>
	<view class="static-area">
		<view><text class="score">{{score}}分</text></view><!--分数-->
		<view class="row">
			<view>
				<text>错题数：</text>
			</view>
			<view>
				{{errorCount}}题&nbsp;<u-button v-if="errorCount>0" size="small" @click="showErrorQuestions">回顾</u-button>
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
</template>

<script>
	export default {
		props: {
		    score:0,
		    errorCount:0,
		    expendTime:0,
		    hightestCombo:0,
		    level:1
		},
		mounted(){
			
		},
		methods:{
			showErrorQuestions(){
				console.log("showErrorQuestions.");
			}
		}
	}
</script>

<style lang="scss">
	.static-area {
		width: 70%;
		>view{
			text-align: center;
		}
		.title,.score{
			font-size: 2rem;
			font-weight: 600;
			color: black;
		}
		.row{
			display: flex;
			flex-direction: row;
			view{
				width: 50%;
				display: flex;
				flex-direction: row;
				white-space:nowrap;
			}
			text{
				white-space:nowrap;
			}
			u-button{
				margin-left: 10rpx;
				margin-right: 10rpx;
			}
			
		}
	}
</style>