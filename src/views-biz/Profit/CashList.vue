<template>
	<div class="cashListContainer">
		<!-- 时间弹框遮罩 -->
		<div v-if="showDate" class="maskDate" @click="showDate=false">
			<div @click.stop>
				<van-datetime-picker
					v-model="currentDate"
					type="year-month"
					:formatter="formatter"
					@cancel="dateCancel"
					@confirm="dateConfirm"
				/>
			</div>
		</div>
		<!-- end -->
		<div class="cashListTop">
			<span>提现记录</span>
			<span @click="checkDate">
				{{choice}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
		</div>
		<div class="cashListContent">
			<van-list
				v-model="loading"
				class="cash-list"
				:finished="finished"
				finished-text="没有更多了"
				v-if="showList && !isEmpty"
				@load="onLoad">
				<div v-for="item in cashList" :key="item.id">
					<div class="cashList">
						<div class="listDate fontColorGrayM">
							<span>{{item.dateY}}</span>
							<span>{{item.dateMD}}</span>
						</div>
						<span class="fontColorGrayL">{{item.content}}</span>
						<div class="listMoney">
							<span>{{item.money}}</span>
							<span :class="[item.cashState===0?'fontColorGrayM':'fontColorRed']">{{item.cashState===0?'提现中':'已到账' }}</span>
						</div>
					</div>
				</div>
			</van-list>
		</div>
		<div v-if="isEmpty" class="yet-empty">暂时没有相关记录~</div>
	</div>
</template>

<script>
export default {
  data () {
		return {
			cashList: [
				{
					dateY: '2019',
					dateMD: '06/05',
					content: '提现至微信钱包',
					money: '100.00',
					cashState: 0,			// 提现状态 0提现中，1已到账
				},{
					dateY: '2019',
					dateMD: '06/05',
					content: '提现至微信钱包',
					money: '100.00',
					cashState: 1,			// 提现状态 0提现中，1已到账
				}
			],
			finished: false,
			loading: false,
			nowPage: 1,
			totalNum: 0,
			showList: true,
			isEmpty: false,		//false
			// 年月日
			currentDate: new Date(),
			showDate: false,
			choice: new Date().getFullYear() + ' 年 ' + (new Date().getMonth()+1)+ ' 月'
		}
	},
	methods: {
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`
			}
			return value;
		},
		checkDate () {
			console.log('checkDate');
			this.showDate = true
		},
		dateCancel () {
			console.log('dateCancel');
			this.showDate = false
		},
		dateConfirm (val) {
			// 匹配月份
			let valStr = val.toString().split(' ');
			let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

			console.log('dateConfirm val:', val.toString().split(' '));
			console.log('arrayIndex:', monthArray.indexOf(valStr[1])+1);
			this.choice = valStr[3]+ ' 年 ' + (monthArray.indexOf(valStr[1])+1) + ' 月'
			this.showDate = false
		},
		getCashList () {
			let thisUrl = '/api/biz/withdrawlist?type=all&page=' + this.nowPage
			return this.axios.get(thisUrl)
				.then(res => {
					res = res.data
					if (res.code === 0) {
						res.data.data.forEach(item => {
							this.cashList.push(item)
						})
						if (!this.totalNum) {
							this.totalNum = res.data.total
						}
						this.nowPage++
					} else {
						this.$notify(res.msg)
					}
				})
				.catch(err => {
					this.$notify('ERR: 获取提现记录失败，请稍后重试！')
				})
		},
		onLoad () {
			this.getCashList()
				.then(res => {
					this.loading = false
					if (this.cashList.length >= this.totalNum) {
						this.finished = true;
					}
					if (this.cashList.length === 0) {
						this.isEmpty = true
					}
				})
		}
	}
}
</script>

<style lang="stylus" scoped>
.cashListContainer {
	background-color #f1f1f1
	height 100vh
	width 100%
	font-size 14px
	position absolute
}
.fontColorGrayM {
	color #afafaf
}
.fontColorGrayL {
	color #888888
}
.fontColorRed {
	color #dc1829
}
// end
// mask
.maskDate {
    position absolute
    top 0
    width 100%
    height 100vh
    background-color #00000080
}
.van-picker {
	width 100%
	position absolute
	bottom 0
	// margin 2rem auto

}
.maskDate >>> .van-picker__cancel,
.maskDate >>> .van-picker__confirm {
	padding .1rem 1.5rem
}
// end
.cashListTop {
	color #000000
	display flex
	justify-content space-between
	margin-top .2rem
}
.cashListTop span {
	margin-right .3rem
}
.cashListTop span:first-child {
	font-weight 800
	margin-left .3rem
}
.cashList {
	background-color #ffffff
	display flex
	justify-content space-between
	align-items center
	padding .2rem .8rem
	margin .25rem 0
}
.listDate, .listMoney {
	display flex
	flex-direction column
	justify-content center
	align-items center
}
.listDate span, 
.listMoney span {
	margin .02rem 0
}
.listMoney span:first-child {
	font-size 16px
	color #004994
	font-weight 600
}
.listMoney span:last-child {
	font-size 12px
}
</style>
