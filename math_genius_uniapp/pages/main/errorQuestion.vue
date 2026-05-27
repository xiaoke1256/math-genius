<template>
	<view v-if="visible" class="error-question">
		<view class="header">
			<text class="title">错题回顾</text>
			<text class="subtitle">共 {{ total }} 题</text>
		</view>

		<view v-if="total === 0" class="empty">
			<text>本局没有错题，太棒了！</text>
		</view>

		<view v-else class="body">
			<view class="index-bar">
				<text class="index-text">第 {{ currentIndex + 1 }} / {{ total }} 题</text>
			</view>

			<view class="express-area">
				<text>{{ currentQuestion.express }}</text>
			</view>

			<view class="legend">
				<view class="legend-item">
					<view class="dot wrong" />
					<text>你的答案</text>
				</view>
				<view class="legend-item">
					<view class="dot correct" />
					<text>正确答案</text>
				</view>
			</view>

			<view class="option-area">
				<view
					v-for="option in currentQuestion.options"
					:key="option.charAt(0)"
					:class="['option-item', getOptionClass(option.charAt(0))]"
				>
					<text>{{ option }}</text>
				</view>
			</view>

			<view class="answer-summary">
				<text class="wrong-text">你选了 {{ errorAnswerText }}</text>
				<text class="correct-text">正确答案是 {{ correctAnswerText }}</text>
			</view>

			<view class="nav-area">
				<u-button
					size="small"
					:disabled="currentIndex <= 0"
					@click="prevQuestion"
				>上一题</u-button>
				<view class="dots">
					<view
						v-for="(_, idx) in errorQuestions"
						:key="idx"
						:class="['dot-item', { active: idx === currentIndex }]"
					/>
				</view>
				<u-button
					size="small"
					:disabled="currentIndex >= total - 1"
					@click="nextQuestion"
				>下一题</u-button>
			</view>
		</view>

		<view class="footer">
			<!-- <u-button type="primary" @click="onClose">知道了</u-button> -->
		</view>
	</view>
</template>

<script>
	import UButton from 'uview-plus/components/u-button/u-button.vue'

	export default {
		components: {
			'u-button': UButton
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			errorQuestions: {
				type: Array,
				default: () => []
			}
		},
		emits: ['update:show', 'close'],
		data() {
			return {
				currentIndex: 0
			}
		},
		computed: {
			visible() {
				return this.show
			},
			total() {
				return this.errorQuestions.length
			},
			currentQuestion() {
				if (this.total === 0) {
					return { express: '', options: [], crrectItemCode: '', errorItemCode: '' }
				}
				return this.errorQuestions[this.currentIndex]
			},
			correctAnswerText() {
				return this.getOptionText(this.currentQuestion.crrectItemCode)
			},
			errorAnswerText() {
				return this.getOptionText(this.currentQuestion.errorItemCode)
			}
		},
		watch: {
			show(visible) {
				if (visible) {
					this.currentIndex = 0
				}
			},
			errorQuestions() {
				if (this.currentIndex >= this.total) {
					this.currentIndex = Math.max(0, this.total - 1)
				}
			}
		},
		methods: {
			getOptionText(itemCode) {
				const option = (this.currentQuestion.options || []).find(
					(item) => item.charAt(0) === itemCode
				)
				if (!option) {
					return itemCode
				}
				return option.slice(3)
			},
			getOptionClass(itemCode) {
				if (itemCode === this.currentQuestion.errorItemCode) {
					return 'is-wrong'
				}
				if (itemCode === this.currentQuestion.crrectItemCode) {
					return 'is-correct'
				}
				return ''
			},
			prevQuestion() {
				if (this.currentIndex > 0) {
					this.currentIndex--
				}
			},
			nextQuestion() {
				if (this.currentIndex < this.total - 1) {
					this.currentIndex++
				}
			},
			onClose() {
				this.$emit('update:show', false)
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.error-question {
		width: 100%;
		padding: 20rpx 24rpx 10rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		text-align: center;
		margin-bottom: 24rpx;

		.title {
			display: block;
			font-size: 2rem;
			font-weight: 700;
			color: #303133;
		}

		.subtitle {
			display: block;
			margin-top: 8rpx;
			font-size: 0.95rem;
			color: #909399;
		}
	}

	.empty {
		padding: 40rpx 0;
		text-align: center;
		color: #67c23a;
		font-size: 1.1rem;
	}

	.body {
		width: 100%;
	}

	.index-bar {
		text-align: center;
		margin-bottom: 20rpx;

		.index-text {
			font-size: 0.95rem;
			color: #606266;
		}
	}

	.express-area {
		text-align: center;
		margin-bottom: 24rpx;

		text {
			font-size: 2.5rem;
			font-weight: 800;
			color: #303133;
		}
	}

	.legend {
		display: flex;
		justify-content: center;
		gap: 32rpx;
		margin-bottom: 20rpx;

		.legend-item {
			display: flex;
			align-items: center;
			gap: 8rpx;
			font-size: 0.85rem;
			color: #606266;
		}

		.dot {
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;

			&.wrong {
				background-color: #f56c6c;
			}

			&.correct {
				background-color: #5ac725;
			}
		}
	}

	.option-area {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 20rpx;
		margin-bottom: 24rpx;
	}

	.option-item {
		width: 45%;
		padding: 20rpx 16rpx;
		border-radius: 16rpx;
		border: 2rpx solid #e4e7ed;
		background-color: #fafafa;
		font-size: 1rem;
		font-weight: 600;
		color: #606266;
		text-align: center;
		box-sizing: border-box;

		&.is-wrong {
			background-color: #fef0f0;
			border-color: #f56c6c;
			color: #f56c6c;
		}

		&.is-correct {
			background-color: #f5fff0;
			border-color: #5ac725;
			color: #5ac725;
		}
	}

	.answer-summary {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8rpx;
		margin-bottom: 24rpx;
		font-size: 0.95rem;

		.wrong-text {
			color: #f56c6c;
		}

		.correct-text {
			color: #5ac725;
		}
	}

	.nav-area {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8rpx;

		.dots {
			display: flex;
			gap: 10rpx;
			align-items: center;
		}

		.dot-item {
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background-color: #dcdfe6;

			&.active {
				width: 16rpx;
				height: 16rpx;
				background-color: #398ade;
			}
		}
	}

	.footer {
		margin-top: 20rpx;
		width: 80%;

		.u-button {
			width: 100%;
		}
	}
</style>
