<template>
  <div class="container" v-if="goodsDetail">
    <div class="goodsDetailTop">
      <img :src="goodsDetail.img" @click="imgPreview">
      <p class="detailPrice">￥{{goodsDetail.price}}</p>
      <p class="detailGoodsName">{{goodsDetail.item_good_name}}</p>
      <p class="detailSummary">{{goodsDetail.summary}}</p>
    </div>
    <div class="num clearfix">
      <span class="fl-left">选择数量<font class="fontSku">（库存 {{goodsDetail.sku_num}}）</font></span>
      <van-stepper class="fl-right" v-model="num" :max="goodsDetail.sku_num" integer />
    </div>
    <div class="note">
      <span class="header">服务说明：</span>
      <span class="content">{{goodsDetail.service_summary}}</span>
    </div>
    <div class="must-know">
      <span class="header">购买须知：</span>
      <span class="content">下单购买此商品并支付成功后，请出示订单二维码给商家进行核销，核销成功可获得服务。</span>
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="确认支付"
      label="合计："
      @submit="onSubmit"
    />
    <van-dialog
			v-model="showDialog"
			title="提交订单"
			show-cancel-button
			@confirm="confirmSubmit"
      confirm-button-text="确认支付"
      confirm-button-color="#DC1829"
		>
			<div class="content">
        <span>支付金额：</span>
        <span class="color-red">￥{{ this.totalPrice / 100 }}</span>
			</div>
		</van-dialog>
  </div>
</template>

<script>
import Base64 from 'js-base64'
import { ImagePreview } from 'vant';
export default {
  name: 'GoodsDetail',
  data () {
    return {
      id: null,
      goodsDetail: null,
      num: 1,
      showDialog: false,
    }
  },
  computed: {

  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this.getGoodsDetail()
    }
  },
  methods: {
    initWx () {
      let thisUrl = 'api/wechat/getjssdk?url=' + Base64.Base64.encode(location.href.split('#')[0])
      // 向服务端提供授权url参数，并且不需要#后面的部分
      return this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          this.wx.config({
            debug: false, // 开启调试模式,
            appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: ['chooseWXPay']
            // jsApiList: res.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
        .catch(err => {
          this.$notify('ERR: 微信授权失败')
        })
    },
    getGoodsDetail () {
      let thisUrl = '/api/goods/detail?item_id=' + this.id
      this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          if (res.code === 0) {
            this.goodsDetail = res.data
          } else {
            this.$notify(res.msg)
          }
        })
        .catch(err => {
          this.$notify('ERR: 获取服务列表失败')
        })
    },
    onSubmit () {
      this.showDialog = true
    },
    confirmSubmit () {
      let that = this
      this.initWx().then(res => {
        let thisUrl = 'api/order/ordercreate'
        this.axios.post(thisUrl, {
          items: [{
            item_id: this.goodsDetail.id,
            num: this.num
          }]
        })
          .then(res => {
            res = res.data
            // console.log('res:', res)
            if(res.code === 0){
              let serviceId = res.data.service_id
              // console.log('res:', res.data.timestamp)
              // that.wx.ready(res => {
                that.wx.chooseWXPay({
                  timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                  package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: res.data.paySign, // 支付签名
                  success: function (res) {
                    window.location.href = 'http://kaoyafront.huikaoedu.com/service/detail?service_id=' + serviceId + '&type=success'
                    // 这里写成功后的动作 我试过跳转路由好像不灵 或者是执行太快后端处理订单未变化呢 我改成了这个   window.location.href="你所要跳转的页面";
                  },
                  cancel: function (res) {
                    that.$notify('已取消支付')
                    window.location.href = 'http://kaoyafront.huikaoedu.com/goods/detail?id='+ that.id
                  },
                  fail: function (res) {
                    that.$notify('购买失败，请重新创建订单')
                    window.location.href = 'http://kaoyafront.huikaoedu.com/goods/detail?id='+ that.id
                  }
                })
              // })
            } else {
              this.$notify(res.msg);
              window.location.href = 'http://kaoyafront.huikaoedu.com/service/list'
            }
          })
          .catch(err => {
            this.$notify('ERR: 支付过程异常')
          })
      })
    },
    imgPreview () {
      ImagePreview([
          this.goodsDetail.img
      ]);
    },
  },
  computed: {
    totalPrice: function () {
      return this.num * 100 * this.goodsDetail.price
    }
  }
}
</script>

<style scoped lang="stylus">
// 1rem 是屏幕宽度的十分之一
.container
  font-size $font-size-normal
  margin-bottom 1.6rem
  background-color #ffffff
  .van-card
    text-align left
    background white
    padding 0
    border-bottom .01rem solid $border-color
  .goodsDetailTop
    background-color #ffffff
    img
      width 100%
      height 6rem
      object-fit cover
    p
      text-align left 
      font-weight 600
      padding 0 .4rem
      margin 0
      font-size 13px
    .detailPrice
      color red
      font-size 18px
      margin-top .3rem
    .detailGoodsName
      margin-top .1rem
      font-size 14px
    .detailSummary
      color #a3a3a3
      font-weight 400
      margin-top .2rem
  .num
    height 1.2rem
    padding 0 .4rem
    background white
    margin-top .3rem
    border-bottom .1rem solid $border-color
    .fl-left
      line-height 1.2rem
      font-weight 600
    .fontSku
      color #a3a3a3
      font-weight 400
      font-size 13px
    .fl-right 
      margin-top .2rem
  .note, .must-know
    background white
    text-align left
    // border-bottom .01rem solid $border-color
    span 
      display block
      margin 0 .4rem
      &.header
        padding .3rem 0 0
        font-weight 600
      &.content
        padding .15rem 0
        line-height 2
        font-size 13px
        color #a3a3a3
.van-dialog
  .content
    padding .6rem 0
.van-card__content 
  padding-top .3rem
.van-card__desc
  height 1.2rem
  // width 7rem
  max-height 1rem
  word-break keep-all
  white-space pre-wrap
.van-submit-bar__text
  color #a3a3a3
.van-button--danger
  background-color red
  border-color red

</style>
