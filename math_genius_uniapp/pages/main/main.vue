<template>
	<view class="content">
		<view id="head" class="head">
			<view class="head-items">
				<view class="item" >
					<view class="item-head" >关卡</view>
					<view class="item-value" >2</view>
				</view>
				<view class="item" >
					<view class="item-head" >进度</view>
					<view class="item-value" >4</view>
				</view>
				<view class="item" >
					<view class="item-head" >时间</view>
					<view class="item-value" >4</view>
				</view>
				<view class="item" >
					<view class="item-head" >生命</view>
					<view class="item-value" >4</view>
				</view>
				<view class="item" >
					<view class="item-head" >连击</view>
					<view class="item-value" >4</view>
				</view>
				<view class="item" >
					<view class="item-head" >得分</view>
					<view class="item-value" >4</view>
				</view>
			</view>
			<view class="progress-area">
				<u-line-progress :percentage="progress" activeColor="#398ade"></u-line-progress>
			</view>
		</view>
		
		<view class="question-area" >
			<view class="express-area"><!-- 题干 -->
				<text>3 + 1 = ?</text>
			</view>
			<view class="item-area">
				<u-button class="button" data-item-code="A" @click="onSelectItem">A.  3</u-button>
				<u-button class="button" data-item-code="B" @click="onSelectItem">B.  2</u-button>
				<u-button class="button" data-item-code="C" @click="onSelectItem">C.  4</u-button>
				<u-button class="button" data-item-code="D" @click="onSelectItem">D.  6</u-button>
			</view>
		</view>
		
		
		<view style="height: 5vh;" />
	</view>
</template>

<script>
	import ULineProgress from "uview-plus/components/u-line-progress/u-line-progress.vue";
	import UButton from 'uview-plus/components/u-button/u-button.vue'
	
	export default {
		components: {
			'u-button':UButton,
			'u-line-progress': ULineProgress
		},
		data() {
			return {
				progress:0,
				crrectItemCode:'C'
			}
		},
		onLoad() {
	
		},
		methods: {
			onSelectItem: function(event){
				const itemCode = event.currentTarget.dataset.itemCode;
				console.log("event.currentTarget.dataset.itemCode:",event.currentTarget.dataset.itemCode);
				if(this.crrectItemCode === itemCode){
					console.log("true");
				}else{
					console.log("false");
				}
				
			}
		}
		            
	}
</script>

<style lang="scss" >
	.head{
		width: 100%;
	}
	.head-items{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		gap: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.progress-area{
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.question-area{
		width: 100%;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
	}
	.express-area{
		text-align: center;
		
		text{
			font-size: 2.5rem;
			font-weight: 800;
		}
	}
	.item-area {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20rpx;
		
		.button {
			width: 45%;
			margin: 0;
		}
		.danger‌ {
			
		}
	}
	       
</style>
