<template>
	<view class="content">
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
		
		<view class="question-area" >
			<view class="express-area"><!-- 题干 -->
				<text>{{express}}</text>
			</view>
			<view class="item-area">
				<u-button v-for="option in options" :key="option.charAt(0)" :class="['button',responseClass(option.charAt(0))]" :data-item-code="option.charAt(0)" @click="onSelectItem">{{option}}</u-button>
				<!--
				<u-button :class="['button',responseClass('A')]" data-item-code="A" @click="onSelectItem">A.  3</u-button>
				<u-button :class="['button',responseClass('B')]" data-item-code="B" @click="onSelectItem">B.  2</u-button>
				<u-button :class="['button',responseClass('C')]" data-item-code="C" @click="onSelectItem">C.  4</u-button>
				<u-button :class="['button',responseClass('D')]" data-item-code="D" @click="onSelectItem">D.  6</u-button>
				-->
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
				btnEnable:true,
				grade:'',
				level:1,
				done:0,
				totalQustions:8,
				countdown:70,
				hp:3,
				combo:0,
				score:0,
				express:'',
				options:[],
				crrectItemCode:'C',
				selectedItemCode:''
			}
		},
		onLoad(options) {
			this.grade = options.grade;
			console.log("this.grade:"+this.grade)
			this.nextQuestion(this.grade)
		},
		methods: {
			onSelectItem: function(event){
				if(!this.btnEnable){
					//拒绝响应
					return false;
				}
				this.btnEnable = false;
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
				//更新成绩
				this.refreshScore(this.crrectItemCode === itemCode);
				//半秒后进入下一题，或下一关
				setTimeout(()=>{this.nextQuestion(this.grade)},501);
				
				
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
					const msg = `答错啦`;
			    }
			},
			nextQuestion(grade) {
				//如果时间或生命值耗尽，提示游戏结束
				//如果进度达到100%,升级
				//中年级
				//100以内加减法
				const {express,options,crrectItemCode} = this.addAndSubQuestion();
				console.log("express,options,crrectItemCode:",express,options,crrectItemCode);
				this.express=express;
				this.options=options;
				this.crrectItemCode=crrectItemCode;
				//表内乘除法
				//带余数除法
				//三目四则混合运算
				
				this.btnEnable=true;
			},
			/*100以内加减法*/
			addAndSubQuestion() {
				const op = Math.ceil(Math.random()*2)==0?'-':'+';
				
					const item1 = Math.floor(Math.random()*101);
					const item2 = Math.floor(Math.random()*101);

					const express = item1+" "+op+" "+item2+ " = ?";
					const crrectAnswer = op=='+'?item1+item2:item1-item2;
					if(crrectAnswer<0 || crrectAnswer>100){
						//超纲
						return this.addAndSubQuestion();
					}
					
					const pool = [];
					pool.push(crrectAnswer)
					while(pool.length<4){
						const dice =  Math.ceil(Math.random()*(2+1+3+2));
						
						let distractor = -1;
						switch (true){
							case dice<2:
								//十位减1（忘记进位）（权重2）
								distractor = crrectAnswer-10;
								break;
							case dice<3:
								//个位加减1（权重1）
								if(Math.floor(Math.random()*2) == 0){
									distractor = crrectAnswer - 1
								}else{
									distractor = crrectAnswer + 1
								}
								
							case dice<6:
								//加法当减法，减法当加法 （权重3）
								distractor = item1 - item2
							default:
								//随机生成一个数 （权重2）
								distractor = Math.floor(Math.random()*101);
						}
						
						if(distractor<0){
							//备选项不合法
							continue;
						}
						if(pool.includes(distractor)){
							//备选项重复
							continue;
						}
						pool.push(distractor);
					}
					
					const shuffledPool = this.shuffle(pool);
					const crrectIndex = shuffledPool.indexOf(crrectAnswer);
					const crrectItemCode = String.fromCharCode('A'.charCodeAt(0)+crrectIndex);
					const options = shuffledPool.map((item,index)=>String.fromCharCode('A'.charCodeAt(0)+index)+". "+item)
					
					return {
						express,
						options,
						crrectItemCode
					}
					
				
			},
			shuffle(pool){
				const newPool = [];
				let index = 0;
				while(pool.length>0){
					const index = Math.floor(Math.random()*pool.length);
					newPool.push(pool[index]);
					pool.splice(index, 1,);
				}
				return newPool;
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
				return Math.floor(this.done/this.totalQustions*100);
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
