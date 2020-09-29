<template>
  <div class="container">
	<van-tabs 
	v-model="active" 
	swipeable 
	animated
	@change="handleClick"
	color="#06a4ee"
	title-active-color='#000'
	title-inactive-color='#a9a9a9'>
		<van-tab v-for="(item, index) in statusOptions" :key="index" :title="item.name">
			<van-list
			v-if="showList && !isEmpty"
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad">
				<div 
				  v-for="(item, index) in profitList" 
				  :key="index" 
				  class="notUsed"
				  @click="listRouter(item.id)">
					<div class="notUsedList">
						<div class="orderNumber fontColor">
							<span>订单编号：{{item.order.id}}</span>
							<span>{{item.use_status===0?'未使用':item.use_status===1?'已使用':'已失效'}}</span>
						</div>
						<div class="orderInfo">
							<div class="orderInfoContent">
								<img :src="item.img" alt="" srcset="">
								<div v-if="item.item_goods" class="orderInfoName">
									<span >{{item.item_goods.item_good_name}}</span>
									<span class="fontColor">{{item.item_goods.summary}}</span>
								</div>
								<div class="orderInfoPrice">
									<span>￥{{item.order.actual_pay_amount}}</span>
									<span class="fontColor">x{{item.num}}</span>
								</div>
							</div>
							<p>
								共{{item.num}}件商品 &nbsp;&nbsp;合计：{{item.order.total_amount}}
							</p>
						</div>
						<div class="godInfo">
							<li v-if="item.profit">
								<img src="../../assets/img/money.png" alt="" srcset="">
								<span>收益金额：{{item.profit.biz_profit}}</span>
							</li>
							<li>
								<img src="../../assets/img/godInfo.png" alt="" srcset="">
								<span>顾客：</span>
							</li>
							<li v-if="item.order.student_info">
								<img v-if="item.order.student_info.headpic !== null" :src="item.order.student_info.headpic" alt="" srcset="">
								<span>{{item.order.student_info.username}}</span>
							</li>
						</div>
					</div>
				</div>
			</van-list>
			<!-- <div v-if="isEmpty" class="yet-empty">暂时没有相关记录~</div> -->
			<div v-if="isEmpty" class="noOrder">
				<img src="../../assets/img/noInfo.png" alt="" srcset="">
				<span>空空如也</span>
				<span>暂无相关订单</span>
			</div>
		</van-tab>
	</van-tabs>
	</div>
</template>

<script>
export default {
  data () {
		return {
			active: 0,     				 	// 切标签
			// value:'',
			show: false,
			actions: [],
			nowType: 7,
			nowStatus: 0,		
			isEmpty: false,					// 判断是否有内容
			// 上拉框选择相关
			ProhibitSelect: true,			// 是否要禁用天数选项，默认是
			checkDate: 30,					//选择的天数    默认30
			checkState: 0,					//选择核销状态，0未使用， 1已使用，  2已失效。 默认0
			// 翻页加载相关
			nowPage: 1,						// 当前分页
			profitList: [],
			loading: false,
			finished: false,
			totalNum: 0,
			showList: true,
			statusOptions: [{
				name: '未使用',
				label: 0,
				type: 'state'
			},
			{
				name: '已使用',
				label: 1,
				type: 'state'
			},{
				name: '已失效',
				label: 2,
				type: 'state'
			}],
			queryBiz_id: this.$route.query.biz_id
		}
	},
	methods: {
		// tabs切换
		handleClick (index, title) {
			console.log('handleClick:', index, title);
			// 清空分页相关数据
			this.nowPage = 1
			this.totalNum = 0
			this.finished = false
			this.isEmpty = false
			this.profitList = []
			this.checkState = index
			this.getProfitList(index)
		},
		
		// 进入页面默认获取未使用列表
		getProfitList (item) {
			console.log('getProfitList:', item);
			console.log('queryBiz_id:', this.queryBiz_id);
			let thisUrl = `/api/biz/servicelist?use_status=${this.checkState}&check_time=${this.checkDate}&type=${this.nowStatus}&page=${this.nowPage}&biz_id=${this.queryBiz_id}`
			return this.axios.get(thisUrl)
				.then(res => {
					res = res.data
					console.log(res);
					if(res.code === 0) {
						res.data.data.forEach(item => {
							this.profitList.push(item)
						})
						if (res.data.total === 0) {
							this.isEmpty = true;
							// console.log('isEmpty=', this.isEmpty);
							return
						}
						if (!this.totalNum) {
							this.totalNum = res.data.total
						}
						this.nowPage++
					} else {
						this.$notify(res.msg)
					}
					console.log('this.profitList:', this.profitList);
					
				})
				.catch(err => {
					this.$notify(err)
				})
		},
		timeSelect () {
			this.show = true
			this.actions = this.timeOptions
		},
		statusSelect () {
			this.show = true
			this.actions = this.statusOptions
		},
		onLoad () {
			setTimeout(() => {
				this.getProfitList(this.nowStatus)
					.then(res => {
						this.loading = false
						if (this.profitList.length >= this.totalNum) {
							this.finished = true;
							console.log('this.finished:', this.finished);						
						}
						if (this.profitList.length === 0) {
							this.isEmpty = true
						}
					})
			}, 500)
		},
		// 路由跳转
		listRouter (id) {
			console.log('listRouter:', id);
			this.$router.push({ path: `/biz/order/detail?orderId=${id}` })
		}
	}
}
</script>

<style lang="stylus" scoped>
// 一些复用样式

.van-list {
    background-color: #f1f1f1
}
.van-list__finished-text{
	background-color #ffffff
	background #ffffff
}
.notUsed {
    color #000
    font-size 12px
    background-color #f1f1f1
	margin-bottom .2rem
}
.fontWeight {
    font-weight 800
}
.fontColor {
    color #afafaf
}
.container {
	height 100vh
	background-color #f1f1f1
}
// end
.notUsedList {
    background-color #ffffff
    margin-bottom .15rem
    padding-top .2rem
}
.orderNumber {
    display flex
    justify-content space-between
    align-items center
	padding-bottom .2rem
}
// .orderNumber {
// 	border-bottom 1px solid #e4e4e4
// }
.orderNumber span {
    margin 0 .5rem
}
.orderNumber span:last-child  {
    color #ffb131
}
.orderInfoContent {
    display flex
    justify-content space-between
    align-items center
    padding .1rem .5rem
}
.orderInfoContent img {
    width 1.5rem
    height 1.5rem
}
.orderInfoName {
    width 55%
    display flex
    flex-direction column
    align-items flex-start
	margin-left -.8rem
}
.orderInfoName span {
    margin .05rem 0
    width 100%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    text-align left
}
// .orderInfoName :last-child {
//     width 100%
//     overflow hidden
//     text-overflow ellipsis
//     white-space nowrap
//     text-align left
// }
.orderInfoPrice {
    display flex
    flex-direction column
    align-items flex-end
}
.orderInfo {
    border-bottom 1px solid #e4e4e4
}
.orderInfo p {
    display flex
    justify-content flex-end
    padding-right .5rem
    margin-top .1rem	
    margin-bottom .2rem
}
.godInfo {
    display flex
    justify-content flex-start
    align-items center
    padding .2rem 0
}
.godInfo li {
    display flex
    align-items flex-end
    margin-left .5rem
}
.godInfo img {
    width .5rem
    height .5rem
    margin-right .1rem
}
.godInfo li:last-child {
    margin-left 0
}
.godInfo li:last-child img {
    border-radius .5rem
}
// end
.noOrder {
    display flex
    flex-direction column
    // justify-content center
    align-items center
    font-size 16px
    font-weight 800
    color #000
}
.noOrder img {
    width 1.5rem
    margin 2rem 0 .4rem 0
}
.noOrder span {
    margin-bottom .05rem
}
</style>


