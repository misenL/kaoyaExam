<template>
    <div class="myProfitContainer">
		<!-- 时间弹框遮罩 -->
		<div v-if="showDate" class="maskDate" @click="showDate=false">
			<div @click.stop>
				<van-datetime-picker
					v-model="currentDate"
					type="date"
					:formatter="formatter"
					@cancel="dateCancel"
					@confirm="dateConfirm"
				/>
			</div>
		</div>
		<!-- end -->
        <!-- <div class="nowProfit">
            <p>当前可提现收益</p>
            <p>￥{{nowProfit}}</p>todayProfit
        </div> -->
        <div class="profit">
            <div>
                <p>￥{{nowProfit}}</p>
                <p>可提现收益</p>
            </div>
            <div>
                <p>￥{{totalProfit}}</p>
                <p>累计收益</p>
            </div>
        </div>
        <p class="profitRecord">
            <span>收益记录</span>
			<span @click="checkDate">
				{{choice}}<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
        </p>
		<p class="todayProfit">
			<!-- <span>今日收益：</span>
			<span>{{todayProfit}}</span> -->
			今日收益：￥{{todayProfit}}
		</p>
		<div class="profitListContent">
			<van-list
				v-model="loading"
				class="profit-list"
				:finished="finished"
				finished-text="没有更多了"
				v-if="showList && !isEmpty"
				@load="onLoad">
				<div v-for="(item, index) in profitList" :key="index">
					<div class="profitList">
						<div class="listDate fontColorGrayM">
							<span>{{item.order_detail.use_time.slice(0,4)}}</span>
							<span>{{item.order_detail.use_time.slice(6,11)}}</span>
							<!-- <span>{{item.order_detail.use_time}}</span> -->
						</div>
                        <div class="listCenter">
                            <p>
                               <span>顾客：</span> 
                               <img :src="item.order_detail.order.student_info.headpic" alt="">
                               <span>{{item.order_detail.order.student_info.username}}</span>
                            </p>
                            <p>
                                商品：{{item.order_detail.item_good_name}}*{{item.order_detail.num}}
                            </p>
                        </div>
						<div class="listMoney">
							<span>{{item.biz_profit}}</span>
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
            nowProfit: '0.00',  // 当前可提现收益
            todayProfit: '0.00',   // 今日收益
			totalProfit: '0.00',    // 累计收益
			profitList: [],
			finished: false,
			loading: false,
			nowPage: 1,
			totalNum: 0,
			showList: true,
			isEmpty: false,		//false
            // 年月日
            choice: new Date().getFullYear() + ' 年 ' + (new Date().getMonth()+1)+ ' 月 ' + (new Date().getDate())+' 日',
			currentDate: new Date(),
			showDate: false,
			biz_id: this.$route.query.biz_id
        }
	},
	computed: {
	},
	created () {
		// 进来默认传当前时间
		let newDateT = (new Date()).getTime()
		console.log('newDateT:',newDateT )
		console.log('newD:', new Date());
		this.dateConfirm(new Date())
		// this.getProfitList(newDateT)
	},
    methods: {
		formatter(type, value) {
			if (type === 'year') {
				return `${value}年`;
			} else if (type === 'month') {
				return `${value}月`
			}else {
				return `${value}日`				
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
			this.choice = valStr[3]+ ' 年 ' + (monthArray.indexOf(valStr[1])+1) + ' 月 '+ valStr[2] +' 日'
			this.showDate = false
			// 时间戮
			let newDate = new Date(valStr[3]+'-'+ (monthArray.indexOf(valStr[1])+1) +'-'+ valStr[2])
			let T = newDate.getTime()		
			console.log('T:', T);
			console.log('biz_id:', this.biz_id);
			this.getProfitList (T)
		},
		getProfitList (el) {
			this.axios.get(`/api/biz/profitlist?biz_id=${this.biz_id}&check_time=${el}`)
			.then((result) => {
				result = result.data
				if (result.code === 0) {
					this.profitList = result.data.data
					this.todayProfit = result.data.profit.today_sum_biz_profit
					this.totalProfit = result.data.profit.sum_biz_profit
					this.nowProfit = result.data.profit.sum_biz_profit
					console.log('this.profitList:', this.profitList);
				}
			}).catch((err) => {
				console.log(err);				
			});
		},
		onLoad () {
            this.loading = false
            this.finished = true
		}

    }
}
</script>

<style lang="stylus" scoped>
.myProfitContainer {
	background-color #f1f1f1
	height 100vh
    font-size 12px
}
.fontColorGrayM {
	color #afafaf
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
.nowProfit {
    background-color #355584
    color #ffffff
    padding .3rem
}
.nowProfit p {
    margin 0 0 .2rem
}
.nowProfit p:last-child {
    font-size 26px
}
.profit {
	font-size 14px
	height 2rem
    background-color #036
    color #ffffff
    display flex
    justify-content space-around
    padding 0 0 .3rem
}
.profit div {
	display flex
	flex-direction column
	justify-content center
}
.profit p {
    margin .1rem 0 0 0
}
.profit div p:first-child {
    font-size 20px
    margin .2rem 0 0
}
.profitRecord {
	font-size 14px
    display flex
    justify-content space-between
    padding 0 .5rem
}
.profitRecord span:first-child {
    font-weight 600
}
.todayProfit {
	text-align right 
	padding-right 1rem
	margin-top -.1rem
	font-size 14px
}
.profitListTop {
	color #000000
	display flex
	justify-content space-between
	margin-top .2rem
}
.profitListTop span {
	margin-right .3rem
}
.profitListTop span:first-child {
	font-weight 800
	margin-left .3rem
}
.profitList {
	background-color #ffffff
	display flex
	justify-content flex-start
	align-items center
	padding .2rem .6rem
	margin .25rem 0
}
.listCenter {
    margin-left .4rem
}
.listCenter p {
    display flex
    align-items center
    margin .15rem 0
}
.listCenter img {
    width .5rem
    height .5rem
    border-radius .5rem
    margin-right .1rem
}
.listCenter span:last-child {
    align-self flex-end
    margin-bottom .02rem
}
.listDate {
	display flex
	flex-direction column
	justify-content center
	align-items center
    padding-top .08rem
}
.listMoney {
    margin-left auto
}
.listMoney span {
    font-size 20px
    color #004994
    font-weight 600
}
.listDate span, 
.listMoney span {
	margin .13rem 0
}

</style>
