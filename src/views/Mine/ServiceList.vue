// 我的订单
<template>
  <div class="container">
		<!-- 切换tab -->
    <van-tabs v-model="status">
      <van-tab title="未使用"></van-tab>
      <van-tab title="已使用"></van-tab>
      <van-tab title="已失效"></van-tab>
    </van-tabs>
		<!-- 订单列表 -->
		<van-list
			v-if="showList"
			v-model="loading"
			:finished="finished"
			finished-text="没有更多了"
			@load="onLoad"
		>
			<van-card
				v-for="item in serviceList"
				class="item"
				:key="item.order_id"
				:num="item.num"
				:price="item.amount/item.num"
				:desc="item.describe"
				:title="item.item_good_name"
				:thumb="item.img"
				@click="showDetail(item.service_id)">
				<div slot="footer">
					<span class="count">共{{item.num}}件</span>
					<span class="strong">合计：</span>
					<span class="price-red">￥{{item.amount}}</span>
				</div>
			</van-card>
		</van-list>
  </div>
</template>

<script>

export default {
  name: 'ServiceList',
  data () {
    return {
      status: 0,
			serviceList: [],
			finished: false,
			loading: false,
			nowPage: 1,
			totalNum: 0,
			showList: true
    };
	},
  methods: {
    getServiceList () {
			let thisUrl = '/api/service/servicelist?use_status=' + this.status + '&page=' + this.nowPage
			return this.axios.get(thisUrl)
				.then(res => {
					res = res.data
					if (res.code === 0) {
						if (res.data) {
							res.data.data.forEach(element => {
								this.serviceList.push(element)
							})
							if (!this.totalNum) {
								this.totalNum = res.data.total
							}
							this.nowPage++
						}
					} else {
						this.$notify(res.msg);
					}
				})
				.catch(err => {
					this.$notify('ERR: 获取数据出错');
				}
			)
		},
		showDetail (id) {
      this.$router.push({path: '/service/detail', query: { 'service_id': id }});
		},
		initList () {
			this.serviceList = []
			this.nowPage = 1
			this.totalNum = 0
			// 解决tab 切换list 不触发onload 的bug
			this.loading = true;// 下拉加载中
			this.finished = false;// 下拉结束
			if(this.loading){
				this.onLoad();
			}
		},
		onLoad () {
			this.getServiceList(this.status)
				.then(res => {
					this.loading = false
					if (this.serviceList.length >= this.totalNum) {
						this.finished = true;
					}
				})
		}
	}, 
  watch: {
    status (newV, oldV) {
			this.initList()
      // this.getServiceList(newV)
    }
  }
};
</script>

<style scoped lang="stylus">
.van-tab--active
  color #FF002B

.item 
  margin-top 0.2rem
  background white

span 
  &.count
    color rgba(16, 16, 16, 0.51)
  &.strong 
    font-weight bold
		padding-left .1rem
  &.price-red 
    color #f44

.van-card
  background white
  text-align left
  margin-top .2rem
  font-size .4rem
  .van-card__content>div
    margin-top .1rem
</style>
