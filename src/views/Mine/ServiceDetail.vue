// 订单详情
<template>
  <div class="container" v-if="serviceDetail">
    <div v-if="success" class="success clearfix">
      <van-icon name="passed"></van-icon>
      <span>购买成功</span>
    </div>
    <van-card
      class="van-card"
      :num="serviceDetail.num"
      :price="serviceDetail.amount/serviceDetail.num"
      :desc="serviceDetail.describe"
      :title="serviceDetail.item_good_name"
      :thumb="serviceDetail.img">
        <div slot="footer">
          <span class="count">共{{serviceDetail.num}}件</span>
          <span class="strong">合计：</span>
          <span class="price-red">￥{{serviceDetail.amount}}</span>
        </div>
      </van-card> 
    <div class="verification-code">
      <!-- <div class="code">验证码：{{serviceDetail.qrcode}}</div> -->
      <div class="pic">

        <!-- 二维码 -->
        <div class="QRCheck">
          <div>
            <img class="QRImg" :src="serviceDetail.qrcodeurl">
            <div v-if="afterMask" class="QRMask"></div>
          </div>
          <img v-if="afterQR" class="afterUse" src='../../assets/img/afterUse.png'>
          <img v-if="loseQR" class="afterUse" src='../../assets/img/loseQR.png'>
        </div>
        <div class="tag">
          <span v-if="serviceDetail.use_status===1" class="iconfont iconused"></span>
          <span v-if="serviceDetail.use_status===2" class="iconfont iconexpired"></span>
        </div>
      </div>
      <div class="valid-time">
        <div>兑换码有效期至<span>{{serviceDetail.dismiss_time}}</span></div>
        <div>逾期将失效，请及时兑换</div>
      </div>
    </div>
    <div class="exchange">
      <div>兑换地点： </div>
      <div class="exchangeDiv">
        <span v-if="serviceDetail.biz">{{serviceDetail.biz.biz_name}}</span>
        <img @click="openLocation" src="../../assets/img/location.png">
      </div>
    </div>
    <div class="order">
      <div class="orderFlex">
        <span>订单编号：</span>
        <span id="orderNumber">{{serviceDetail.order_id}}</span>
      </div>
      <div class="orderFlex">
        <span>订单总额： </span>
        <span>￥{{serviceDetail.amount}}</span>
      </div>
    </div>
    <div class="contact" v-if="serviceDetail.biz">
      <div class="contactFlex">
        <div>联系商家： </div>
        <div>{{serviceDetail.biz.biz_tel}}</div>
      </div>
      <div class="contactFlex">
        <div>工作时间： </div>
        <div>2019年6月15日 7:30至16:30</div>
      </div>
    </div>
    <!-- 加载地图loading -->
    <van-loading v-if="isLoading" type="spinner" color="white" />
  </div>
</template>

<script>
import Base64 from 'js-base64'

export default {
  name: 'ServiceDetail',
  data () {
    return {
      serviceId: null,
      serviceDetail:{},
      status: 0,
      success: null,
      isLoading: false,
      afterQR: false,      // 二维码过期
      loseQR: false,       // 二维码失效
      afterMask: false      // 遮罩
    };
  },
  created () {
    this.serviceId = this.$route.query.service_id
    this.success = this.$route.query.type
    this.getServiceDetail(this.serviceId)
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
            jsApiList: ['openLocation']
            // jsApiList: res.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
        .catch(err => {
          this.$notify('获取微信授权失败')
        })
    },
    getServiceDetail (id) {
      let thisUrl = '/api/service/servicedetail?service_id=' + id
      this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          if (res.code === 0) {
            this.serviceDetail = res.data            
            // base64要添加前缀才能显示
            this.serviceDetail.qrcodeurl = `data:image/png;base64,${this.serviceDetail.qrcodeurl}`
            console.log(this.serviceDetail);
            if (this.serviceDetail.use_status === 1) {       // 1是已使用的QR，2是失效
              this.afterQR = true
              this.afterMask = true
            }else if (this.serviceDetail.use_status === 2) {
              this.afterQR = true          
              this.afterMask = true
            }
          } else {
            this.$notify(res.msg)
          }
        })
        .catch(err => {
          // this.$notify('数据获取失败')
        })
    },
    openLocation () {
      let that = this
      // console.log(this.isLoading)
      this.isLoading = true
      // console.log(this.isLoading)
      this.initWx().then(res => {
        this.wx.openLocation({
          longitude: Number(this.serviceDetail.biz.biz_lng),
          latitude: Number(this.serviceDetail.biz.biz_lat),
          success: function () {
            that.isLoading = false
            // console.log(that.isLoading)
          }
          // name: this.data.store.name,
          // address: this.data.store.address
        }) 
      })
    }
  },
};
</script>

<style scoped lang="stylus">
.container
  background #fff
  color #101010 100%
  font-size $font-size-normal
  .success
    border-bottom .01rem solid $border-color
    padding .4rem
    text-align left
    .van-icon-passed
      float left
      padding-right .2rem
      color #1ECC1D 
      font-size .6rem
    span 
      float left
      margin-top .11rem
  .van-card
    background rgba(250, 250, 250, 1)
    text-align left
    margin-top .2rem
    font-size $font-size-normal
    .van-card__content>div
      margin-top .1rem
    span {
      &.count{
        color: rgba(16, 16, 16, 0.51);
      }
      &.strong {
        font-weight: bold;
        padding-left: .1rem;
      }
      &.price-red {
        color: #f44;
      }
    }
  .verification-code
    .code
      background rgba(96, 91, 91, 0.2)
      width 6rem
      font-size $font-size-normal
      margin auto 
      padding .45rem .45rem
      border-radius .2rem
      margin-top .5rem
    .pic
      width 4rem
      height 4rem
      margin .6rem auto
      position relative
      .QRImg
        width 100%
        height 100%
        display block
      .tag
        position absolute
        right  -.8rem
        top -.8rem
        .iconfont
          font-size 1.6rem
          &.iconused
            color orange
          &.expired
            color grey
    .valid-time
      font-size $font-size-normal
      color #6F6F6F
      width 7.5rem
      margin .6rem auto
      text-align left 
      line-height .5rem
      span
        margin-left .1rem
        color red
  .exchange
    margin 0 .5rem
    position relative
    height 1.3rem
    border-bottom 1px solid rgba(187, 187, 187, 0.53)
    border-top 1px solid rgba(187, 187, 187, 0.53)
    div
      // position absolute
      left 0
      top .4rem
    img 
      // position absolute
      right 0
      top .4rem
      height .5rem
      height .5rem
  .order
    margin .5rem
    text-align left 
    line-height .7rem
    span 
      color red
  .contact
    text-align left 
    margin 0 .5rem 0 .5rem
    line-height .7rem
    position relative
    height 2.5rem
    border-top 1px solid rgba(187, 187, 187, 0.53)
    color #000
    .contactFlex:first-child
      margin-top .5rem
    .business
      margin-top .5rem
      color rgba(16, 16, 16, 1)
    .phone
      position absolute
      right 0
      top .5rem
      // color red
.QRCheck
  .afterUse
    position absolute
    width 75%
    height 75%
    margin-left 18%
    margin-top -123%
    transform rotate(15deg)
  .QRMask
    display block
    background #000
    width 100%
    height 100%
    position absolute
    margin-top -100%
    opacity .6
.exchange
  display flex
  justify-content space-between
  align-items center
  color #000
  .exchangeDiv
    display flex
    justify-content flex-start
    align-items center
    span
      margin-right .2rem
.orderFlex
  display flex
  justify-content space-between
  span:first-child
    color #000
#orderNumber
  color #000
.contactFlex
  display flex
  justify-content space-between
  align-items center
</style>
