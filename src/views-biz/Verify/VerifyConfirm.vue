<template>
  <div class="container">
	  	<!-- 根据是否是正确核销员工或是否核销过切换显示 -->
	  	<div v-if="isShopping && serviceDetail">
			<div class="verifyContent">
				<p class="fontColorGray">商品信息</p>
				<div class="verifyTop">
					<img :src="serviceDetail.img" alt="">
					<div class="verifyName">
						<span>{{serviceDetail.item_good_name}}</span>
						<span class="fontColorGray" v-if="serviceDetail.item_goods">{{serviceDetail.item_goods.summary}}</span>
					</div>
					<div class="verifyNum">
						<span>￥{{serviceDetail.price}}</span>
						<span class="fontColorGray">x{{serviceDetail.num}}</span>
					</div>
				</div>
				<p class="fontColorGray">共{{serviceDetail.num}}件商品&nbsp;&nbsp;合计&nbsp;{{serviceDetail.amount}}</p>
			</div>	
			<div class="verifyCenter">
				<ul>
					<li>顾客：</li>
					<li class="shopper">
						<img :src="serviceDetail.student_info.headpic" alt="" srcset="">
						<span>{{serviceDetail.student_info.username}}</span>
					</li>
				</ul>
				<ul>
					<li>适用于：</li>
					<li>{{serviceDetail.biz.examination_info.school_name}}&nbsp;{{serviceDetail.item_goods.classroom}}</li>
				</ul>
				<ul>
					<li>有效期至：</li>
					<li>{{serviceDetail.dismiss_time}}</li>
				</ul>
			</div>		  
			<div class="footerBtn">
				<div @click="cancel">取消</div>
				<div @click="confirm">确认核销</div>
			</div>
		</div>
		<div v-else>
			<div class="InvalidQR">
				<img src="../../assets/img/invalidQR.png" alt="" srcset="">
				<span>核销失败，该二维码无法使用！</span>
				<span>请重新扫描！</span>
				<div @click="QRReturn" class="QRReturn">返回</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			serviceId: null,
			serviceDetail: null,
			isShopping: true		// 判断该二维码是否可以使用和是否是对应的商家扫码，false显示错误提示界面，
		}
	},
	created () {
		this.serviceId = this.$route.query.service_id
		this.getServiceDetail(this.serviceId)
	},
	methods: {
		getServiceDetail () {
			let thisUrl = '/api/biz/servicedetail?service_id=' + this.serviceId
			this.axios.get(thisUrl)
				.then(res => {
					res = res.data
					if(res.code === 0) {
						this.serviceDetail = res.data		
						console.log('serviceDetail:', this.serviceDetail);
					} else if(res.code === 10003) {			// 没有权限
						this.$router.replace({path: '/contactAdmin'})
					}else {											// 状态码还有10001已使用，10002已失效
						console.log('不是可以使用的二维码');
						this.isShopping = false
					}
					// this.checkShopping ()
				})
				.catch(err => {
					this.$notify('ERR: 获取订单详情失败，请稍后重试！')
				})
		},
		// checkShopping () {
		// 	console.log('this.serviceDetail:', this.serviceDetail);
		// 	if (this.serviceDetail === null || this.serviceDetail.use_status !== 0) {
		// 		console.log('不是可以使用的二维码');
		// 		this.isShopping = false
		// 	}
		// },
		QRReturn () {
			this.$router.push( {path: '/biz/verify'} )
		},
		cancel () {
			this.$router.push( {path: '/biz/verify'} )
		},
		confirm () {
			let thisUrl = '/api/biz/confirm'
			this.axios.post(thisUrl, {
				service_id: this.serviceId
			})
				.then(res => {
					res = res.data
					if(res.code === 0) {
						// notify 默认背景为红色
            this.$notify({
              message: '核销成功',
              background: '#1989fa'
            });
						this.$router.push( {path: '/biz/verify'} )
					} else {
						this.$notify(res.msg)
					}
				})
				.catch(err => {
					this.$notify('ERR: 核销失败，请售后重试！')
				})
		}
	}
}
</script>

<style lang="stylus" scoped>
// 一些复用样式
.container {
	color #000
	font-size 12px
	background-color #f1f1f1
	height 100vh
}
img {
    width 1.8rem
    height 1.1rem
}
.fontColorGray {
	color #999
}
// end
.verifyContent, .verifyCenter, .footerBtn {
	background-color #ffffff
	padding .1rem .5rem
}
.verifyContent p:first-child {
	font-size 14px
	text-align left 
}
.verifyContent p:last-child {
	text-align right 
}
.verifyTop {
	display flex
	justify-content space-between
}
.verifyName, .verifyNum {
	display flex
	flex-direction column
	justify-content flex-start
}
.verifyName {
	text-align left
	width 62%
}
.verifyName span:first-child,
.verifyNum span:first-child {
	margin-bottom .1rem
}
.verifyNum {
	text-align right
}
.verifyCenter {
	margin-top .1rem
}
.verifyCenter ul {
	display flex
	justify-content space-between
	text-align right 
	margin-top .2rem
}
.verifyCenter ul li:first-child {
	color #999
}
.verifyCenter ul li:first-child {
	width 20%
}
.verifyCenter ul li:last-child {
	width 60%
}
.verifyCenter ul img {
	width .5rem
	height .5rem
	border-radius .5rem
	margin-right .2rem
}
.shopper {
	display flex
	align-items center
	justify-content flex-end
}
.footerBtn {
	display flex
	justify-content space-around
	padding .5rem 0
}
.footerBtn div {
	width 30%
	text-align center
	line-height .8rem
	border 1px solid #e8e8e8
	border-radius .2rem
}
.footerBtn div:first-child {
	height .8rem
	margin-left .2rem
}
.footerBtn div:last-child {
	background-color #ea4a4a
	color white
	margin-right .2rem
}
.InvalidQR
	display flex
	flex-direction column
	align-items center
	font-size 14px
	padding-top 2rem
	img 
		width 30%
		height 50%
		margin-bottom .3rem
	span 
		font-weight 600
		margin .05rem 0
	div
		background-color #169bd5
		color white
		width 2.8rem
		height .64rem
		line-height .64rem
		border-radius .15rem
		margin-top 1rem
</style>
