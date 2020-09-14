<template>
	<view class="person-score-container">
		<view class="tab-wrap">
			<sun-tab :value.sync="index" @change="objectChange"
               :tabList="tabObjectList" rangeKey="name">
      </sun-tab>
		</view>
		<view class="results-summary">
			<view class="semesterSelect">
				<view class="semester">{{ yearLabel }}</view>
				<image src="../../static/img/icon-funnel.png" @tap="handleTap"></image>
				<lb-picker ref="picker"
            v-model="searchData.semesterYear"
            mode="selector"
            :list="schoolYear"
            @confirm="handleConfirm">
				</lb-picker>
			</view>
			<view class="totalGrade">
				<view class="gradeList">
					<image src="../../static/img/icon-totalcredit.png"></image>
					<view class="score">
						<span>{{GPA}}</span>
						<p>GPA</p>
					</view>
				</view>
				<view class="gradeList">
					<image src="../../static/img/icon-gpa.png"></image>
					<view class="score">
						<span>{{totalCredit}}</span>
						<p>总学分</p>
					</view>
				</view>
			</view>
		</view>
		<view class="scoll-container">
			<scroll-view scroll-y="true" class="scroll-h">
				<view class="semesterList">
					<view v-for="(item,i) in semesterGradeList" :key="i">
						<view title="" class="title">{{item.semester}}</view>
						<view class="courseList">
							<view v-for="(kc,j) in item.gradeList" :key="j">
								<p>{{kc.courseName}}</p>
								<view :class="[kc.qualified == 1 ? 'subjectGrade' : 'cur']">
									<view class="itemList">
										<image src="../../static/img/icon-credit.png" mode=""></image>
										<span class="itemName">学分</span>
										<span>{{kc.credit}}</span>
									</view>
									<view class="itemList">
										<image src="../../static/img/icon-gpasmall.png" mode=""></image>
										<span class="itemName">绩点</span>
										<span>{{kc.gp}}</span>
									</view>
									<view class="itemList">
										<image src="../../static/img/icon-grade.png" mode=""></image>
										<span class="itemName">成绩</span>
										<span>{{kc.scoreText}}</span>
									</view>
								</view>

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import sunTab from '@/components/sun-tab/sun-tab.vue'
import LbPicker from '@/components/lb-picker'
import {Http} from '@/api/http'

export default {
  components:{
    sunTab,
    LbPicker
  },
  data() {
    return {
      index: 0,
      GPA: '',
      // 总学分
      totalCredit: 0,
      // tab 栏切换
      tabObjectList: [
        {
          name: '主修',
          value: 1
        },
        {
          name: '辅修',
          value: 2
        }
      ],
      // 学年筛选条件列表
      yearLabel: '全部',
      schoolYear: [],
      // 存放学习成绩列表数据
      semesterGradeList: [],
      searchData:{
        // 1 主修， 2 辅修
        project: 1,
        // 学年+学期
        semesterYear: ''
      }
    }
  },
  onLoad() {
    this.initData()
  },
  methods: {
    initData() {
      this.getDetail()
      this.getSchoolYears()
    },
    // 获取学生成绩列表
    async getDetail() {
      const data = await Http.getDetail(this.searchData)
      this.GPA = data.gpa
      this.totalCredit = data.totalCredit
      this.semesterGradeList = data.semesterGradeList
    },
    // 获取学年筛选列表
    async getSchoolYears() {
      const data = await Http.getSchoolYears(this.searchData)
      this.schoolYear = [
        {
          label: '全部',
          value: ''
        }
      ]
      // 制作 学年列表数据 格式
      const yearList = []
      data.forEach((item, index) => {
        yearList[index] = {}
        yearList[index].label = `${item} 学年`
        yearList[index].value = item
      })
      this.schoolYear.push(...yearList)
    },
    // 主修与辅修 tab 切换触发
    objectChange(e){
      this.searchData.project = e.tab.value
      this.searchData.semesterYear = ''
      this.yearLabel = '全部'
    },
    // 筛选学年下拉框
    handleTap () {
      this.$refs.picker.show()
    },
    // 学年选择确定后触发
    handleConfirm (item) {
      this.yearLabel = item.item.label
    }
  },
  watch: {
    // 监听 data 下的 searchData 数据，如果发生变化自动触发 initData 方法，刷新页面
    searchData: {
      handler: 'initData',
      deep: true
    }
  }
}
</script>

<style lang="scss">
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
		height: 100%;
	}

	/* #endif */
	.person-score-container{
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		font-size: 26rpx;
		.tab-wrap{
			width: 100%;
			height: 90rpx;
		}
		.results-summary{
			width: 690rpx;
			height: 220rpx;
			padding-bottom: 48rpx;
			border-radius: 12rpx;
			background: url(../../static/img/bg.png) no-repeat center #7C9CF5;
			box-shadow:0rpx 2rpx 10rpx 0rpx rgba(0, 0, 0, 0.05);
			margin: 30rpx auto 0;
			.semester{
				color: #fff;
				line-height: 1;
			}
			.semesterSelect{
				font-size: 30rpx;
				// color: #fff;
				display: flex;
				align-items: center;
				line-height: 32rpx;
				padding: 30rpx 28rpx;
				image{
					width: 24rpx;
					height: 24rpx;
					padding-left: 22rpx;
				}
			}
			.totalGrade{
				display: flex;
				justify-content: flex-start;
				padding: 0 44rpx;
				.gradeList{
					display: flex;
					width: 50%;
					image{
						width: 80rpx;
						height: 80rpx;
					}
					.score{
						margin-left: 50rpx;
						span{
							color: #FFFFFF;
							font-size: 40rpx;
							line-height: 1;
						}
						p{
							font-size: 26rpx;
							color: rgba(255,255,255,0.6);
							line-height: 1;
						}
					}
				}
			}

		}
		.scoll-container{
			flex: 1;
			height: 100%;
			.scroll-h{
				height: 100%;
				.semesterList{
					padding-top: 60rpx;
					padding-right: 50rpx;
					padding-bottom: 400rpx;
					width: 690rpx;
					margin: 0 auto;
					box-sizing: border-box;
					>view{
						.title{
							color: #1F2021;
							font-size: 30rpx;
							font-weight: 500;
							line-height: 34rpx;
							margin: 10rpx 0;
							&::before{
								content: '';
								width: 8rpx;
								height: 26rpx;
								border-radius: 4rpx;
								background: #1574DF;
								display: inline-block;
								margin-right: 10rpx;
							}
						}
						.courseList{
							>view{
								padding: 30rpx;
								display: block;
								width: 100%;
								p{
									color: #3A3C40;
									font-size: 32rpx;
									font-weight: 400;
									width: 573rpx;
								}
								.subjectGrade{
									display: flex;
									align-items: center;
									.itemList{
										width: 33.3%;
										image{
											width: 26rpx;
											height: 26rpx;
										}
										span{
											color: #3A3C40;
											font-size: 34rpx;
											&.itemName{
												color: #B6BAC0;
												font-size: 26rpx;
												padding: 0 10rpx;
											}
											&.cur{
												color: #F25F67;
											}
										}

									}
								}
								.cur{
									display: flex;
									align-items: center;
									.itemList{
										width: 33.3%;
										image{
											width: 26rpx;
											height: 26rpx;
										}
										span{
											color: #F25F67;
											font-size: 34rpx;
											&.itemName{
												color: #B6BAC0;
												font-size: 26rpx;
												padding: 0 10rpx;
											}
											&.cur{
												color: #F25F67;
											}
										}

									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
