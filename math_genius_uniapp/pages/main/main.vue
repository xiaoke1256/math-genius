<template>
	<view :class="['content',bgColor] ">
		<view id="main" ref="mainBox" :animation="animationData" class="main-box" >
			<view id="head" class="head">
				<view class="head-items">
					<view class="item" >
						<view class="item-head" >关卡</view>
						<view class="item-value" >{{level}}</view>
					</view>
					<view class="item" >
						<view class="item-head" >进度</view>
						<view class="item-value" >{{done}}/{{totalQustions}}</view>
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
			
			<view v-if="!isFinish&&!isSuccess" class="question-area" >
				<view class="express-area"><!-- 题干 -->
					<text>{{express}}</text>
				</view>
				<view class="item-area">
					<u-button v-for="option in options" :key="option.charAt(0)" :customStyle="optionButtonStyles[option.charAt(0)]" @click="onSelectItem(option.charAt(0))">{{option}}</u-button>
					
				</view>
			</view>
			
			<view v-if="isFinish" class="finish-page">
				<text class="title">本局结束</text>
				<text>{{finishReason}}</text><!--结束原因-->
				<text class="score">{{score}}分</text><!--分数-->
				<text>称号：{{}}</text><!--称号-->
				<text>最高关卡：第{{level}}关</text>
				<view class="button-area">
					<u-button @click="reStart" type="primary">再来一局</u-button>
					<u-button @click="toHome">返回首页</u-button>
					<!--错题回顾-->
				</view>
			</view>
			
			<view v-if="isSuccess" class="success-page">
				<text class="title">{{successMsg}}</text><!--或者“恭喜你，完成了所有关卡！”-->
				<view class="button-area">
					<u-button v-if="!isAllLevelCompleted" @click="toNextLevel" type="success">下一关</u-button>
					<u-button v-if="isAllLevelCompleted" @click="toFirstLevel" type="success">重新开始</u-button>
					<!--错题回顾-->
				</view>
			</view>
			
			<view style="height: 20%;" />
		</view>
	</view>
</template>

<script>
	import ULineProgress from "uview-plus/components/u-line-progress/u-line-progress.vue";
	import UButton from 'uview-plus/components/u-button/u-button.vue'
	import {generateQuestion} from "../../js/question"
	
	let interval = null;
	
	export default {
		components: {
			'u-button':UButton,
			'u-line-progress': ULineProgress
		},
		data() {
			return {
				btnEnable:true,
				grade:'',
				level:1,
				allLevelCont:20,
				done:0,
				totalQustions:8,
				countdown:45,
				hp:3,
				combo:0,
				score:0,
				express:'',
				options:[],
				crrectItemCode:'C',
				selectedItemCode:'',
				isFinish:false,
				finishReason:'',
				isSuccess:false,
				successMsg:'恭喜你，通关啦！',
				bgColor:'main-content-background',
				animationData: {}
			}
		},
		onLoad(options) {
			this.grade = options.grade;
			console.log("this.grade:"+this.grade);
			this.nextQuestion(this.grade);
			//启动倒计时
			this.startCountDown();
		},
		onUnload(){
			//清除定时器
			if(interval){
				clearInterval(interval);
				interval = null;
			}
		},
		methods: {
			onSelectItem: function(itemCode){
				if(!this.btnEnable){
					//拒绝响应
					return false;
				}
				this.btnEnable = false;
				//const itemCode = event.currentTarget.dataset.itemCode;
				//console.log("event:",event);
				//console.log("event.currentTarget.dataset.itemCode:",event.currentTarget.dataset.itemCode);
				console.log("itemCode:",itemCode);
				const isCorrected = (this.crrectItemCode === itemCode);
				if(isCorrected){
					console.log("true");
				}else{
					console.log("false");
				}
				//显示错误样式半秒钟，然后消失
				this.selectedItemCode = itemCode;
				setTimeout(()=>{this.selectedItemCode=''},500);
				//播放错误或成功的动画
				this.playAnimate(isCorrected);
				
				//更新成绩
				this.refreshScore(isCorrected);
				//半秒后进入下一题，或下一关
				setTimeout(()=>{this.nextQuestion();this.btnEnable},501);
				
				
			},
			refreshScore(correct) {
			    if (correct) {
					this.combo += 1;
					const bonus = Math.min(10, Math.floor(this.combo / 3) * 2);
					this.score += 10 + bonus;
					this.done += 1;
					const msg = `答对啦！+${10 + bonus} 分`;
			    } else {
					this.combo = 0;
					this.hp -= 1;
					const msg = `答错啦！`;
			    }
			},
			nextQuestion() {
				//如果时间或生命值耗尽，提示游戏结束
				if(this.hp<=0 || this.countdown<=0){
					if(this.hp<=0){
						this.finishReason='生命值耗尽'
					}
					if(this.countdown<=0){
						this.finishReason='时间到'
					}
					//停止计时
					if(interval){
						clearInterval(interval);
						interval = null;
					}
					
					this.isFinish=true;
				}
				//如果进度达到100%,显示升级界面
				if(this.done>=this.totalQustions){
					this.isSuccess=true;
					if(this.level>=this.allLevelCont){
						this.successMsg = '恭喜你，通关啦！';
					}else{
						this.successMsg = '恭喜你，闯关成功！';
					}
					if(interval){
						clearInterval(interval);
						interval = null;
					}
				}
				
				const {express,options,crrectItemCode} = generateQuestion(this.grade,this.level);
				console.log("express,options,crrectItemCode:",express,options,crrectItemCode);
				this.express=express;
				this.options=options;
				this.crrectItemCode=crrectItemCode;
				
				this.btnEnable=true;
			},
			
			playAnimate(isCorrect){
				try{
					//const mainBox = this.$refs.mainBox;
					if(isCorrect){
						const animation = uni.createAnimation({ // 使用uni.createAnimation创建动画实例
							duration: 250, // 每个step动画持续时间，单位ms
							timingFunction: 'ease', // 动画的效果
						});
						animation.scale(1.1, 1.1).step(); // 先放大，生成动画数据
						animation.scale(1, 1).step(); // 返回到原始状态
						this.animationData = animation.export(); // 
					}else{
						const animation = uni.createAnimation({ // 使用uni.createAnimation创建动画实例
							duration: 125, // 每个step动画持续时间，单位ms
							timingFunction: 'ease', // 动画的效果
						});
						animation.translateX(-10).step({ duration: 125 });
						animation.translateX(10).step({ duration: 250 });
						animation.translateX(0).step({ duration: 125 });
						this.animationData = animation.export();
					}
				}catch(e){
					//播放动画异常不应该影响其他逻辑
					console.error("some error happen when play animate:",e);
				}
			},
			
			doCountDown(){
				this.countdown--;
				if(this.countdown==0){
					clearInterval(interval);
					interval = null;
					//显示结束页面
					this.finishReason='时间到'
					this.isFinish=true;
				}
			},
			startCountDown(){
				if(interval){
					clearInterval(interval);
				}
				interval = setInterval(this.doCountDown,1000);
			},
			changeBgColor(level){
				const bgColors = 
					['main-content-background-blue',
					'main-content-background-darkgreen',
					'main-content-background-purple',
					'main-content-background-lightgreen',
					'main-content-background-yellow',
					'main-content-background-red'];
				this.bgColor = bgColors[(level-1)%bgColors.length];
			},
			toHome(){
				uni.navigateTo({
					url: '/pages/index/index',
					fail: (err) => {
						console.error('navigateTo fail', err)
					}
				})
			},
			reStart(){
				this.done=0;
				this.countdown=70;
				this.hp=3;
				this.combo=0;
				this.score=0;
				this.nextQuestion(this.grade);
				//启动倒计时
				this.startCountDown();
				this.isFinish=false;
			},
			toNextLevel(){
				this.level++;
				//背景颜色换一换
				this.changeBgColor(this.level);
				this.done=0;
				this.countdown=70;
				if(this.combo>=5 && this.hp<3 ){
					//达成5连击
					this.hp++;
				}
				//this.hp=3;
				this.combo=0;
				this.score=0;
				this.nextQuestion(this.grade);
				//启动倒计时
				this.startCountDown();
				this.isSuccess=false;
				this.isFinish=false;
			},
			toFirstLevel(){
				this.level=1;
				//背景颜色换一换
				this.changeBgColor(this.level);
				this.done=0;
				this.countdown=70;
				this.hp=3;
				this.combo=0;
				this.score=0;
				this.nextQuestion(this.grade);
				//启动倒计时
				this.startCountDown();
				this.isSuccess=false;
				this.isFinish=false;
			}
		
		},
		computed: {
		  	progress(){
				return Math.floor(this.done/this.totalQustions*100);
			},
			isAllLevelCompleted(){
				return this.level>=this.allLevelCont;
			},
			optionButtonStyles() {
				const base = {
					width: '45%',
					margin: '0',
					fontWeight: '600'
				};
				const styles = {};
				(this.options || []).forEach((option) => {
					const itemCode = option.charAt(0);
					const style = { ...base };
					if (itemCode === this.selectedItemCode) {
						if (itemCode === this.crrectItemCode) {
							style.backgroundColor = '#f5fff0';
							style.borderColor = '#5ac725';
							style.color = '#5ac725';
						} else {
							style.backgroundColor = '#fef0f0';
							style.borderColor = '#f56c6c';
							style.color = '#f56c6c';
						}
						style.borderWidth = '1px';
						style.borderStyle = 'solid';
					}
					styles[itemCode] = style;
				});
				return styles;
			}
		}
		            
	}
</script>

<style lang="scss" >
	.content {
		//#ifdef MP-WEIXIN
		min-height: 100vh;
		//#endif
		justify-content: center;
	}
	.main-content-background{
		background-color: #32cdff;
	}
	.main-content-background-blue {
		background-color: #32cdff;
	}
	.main-content-background-darkgreen {
		background-color: #527f76;
	}
	.main-content-background-purple {
		background-color: #9932cd;
	}
	.main-content-background-lightgreen {
		background-color: #5f9f9f;
	}
	.main-content-background-yellow {
		background-color: #b5a642;
	}
	.main-content-background-red {
		background-color: #dd6666;
	}
	.main-box{
		width: 80%;
		height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: white;
		border-radius: 60rpx;
	}
	.head{
		margin-top: 30rpx;
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
	.finish-page{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		.title,.score{
			font-size: 2rem;
			font-weight: 600;
			color: black;
		}
		.button-area{
			margin: 30rpx;
			width: 80%;
			display: flex;
			flex-direction: row;
			gap: 20rpx;
			u-button{
				width: 50%;
			}
		}
	}
	.success-page{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		.title{
			font-size: 2rem;
			font-weight: 600;
			white-space: pre;
			color: $u-success-dark;
		}
		.button-area{
			margin: 30rpx;
			width: 80%;
			display: flex;
			flex-direction: row;
			gap: 20rpx;
		}
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
	}
	       
</style>
