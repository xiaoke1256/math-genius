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
					<view class="item-value" >{{countdown}}s</view>
				</view>
				<view class="item" >
					<view class="item-head" >生命</view>
					<view class="item-value" >{{hp}}</view>
				</view>
				<view class="item" >
					<view class="item-head" >连击</view>
					<view class="item-value" >{{combo}}</view>
				</view>
				<view class="item" >
					<view class="item-head" >得分</view>
					<view class="item-value" >{{score}}</view>
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
				<u-button :class="['button',responseClass('A')]" data-item-code="A" @click="onSelectItem">A.  3</u-button>
				<u-button :class="['button',responseClass('B')]" data-item-code="B" @click="onSelectItem">B.  2</u-button>
				<u-button :class="['button',responseClass('C')]" data-item-code="C" @click="onSelectItem">C.  4</u-button>
				<u-button :class="['button',responseClass('D')]" data-item-code="D" @click="onSelectItem">D.  6</u-button>
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
				level:1,
				questionIndex:0,
				totalQustions:8,
				countdown:70,
				hp:3,
				combo:0,
				score:0,
				crrectItemCode:'C',
				selectedItemCode:''
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
				//显示错误样式半秒钟，然后消失
				this.selectedItemCode = itemCode;
				setTimeout(()=>{this.selectedItemCode=''},500);
				//TODO 更新成绩
				//半秒后进入下一题，或下一关
				
			},
			responseClass(itemCode) {
			    if(itemCode==this.selectedItemCode){
					if(itemCode==this.crrectItemCode){
						return 'success';
					}else{
						return 'danger';
					}
				}else{
					return '';
				}
			}
		
		},
		computed: {
		  	progress(){
				return Math.floor(this.questionIndex/this.totalQustions*100);
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
		.item-head{
			font-weight: 600;
		}
		.item{
			text-align: center;
		}
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
			font-weight: 600;
		}
		
		.danger {
			background-color: $u-error-light !important;
			border: 1rpx solid $u-error !important;
		}
		
		.success {
			background-color: $u-success-light !important;
			border: 1rpx solid $u-success !important;
		}
	}
	       
</style>
