<template>
  <div class="container">
    <ExamBanner v-if="examInfo" :examInfo="examInfo"></ExamBanner>
    <div class="map">
      <TencentMap
        v-if="showMap"
        :nowLoc="nowLoc"
        :targetLoc="targetLoc"
        @click="openLocation"></TencentMap>
      <van-loading v-if="!showMap" />
      <div class="map-btn" v-if="showMap" @click="openLocation">
        <span>进入<br>导航</span>
      </div>
    </div>
    <van-button ref="locBtn" class="loc-btn" @click="getLoc">定位</van-button>
    <div class="must-know">
      <span class="title">考试须知</span>
      <span class="text">{{examNotice}}</span>
      <span @click="openFullEdition" class="fullEdition">点击查看完整版 >></span>
    </div>
    <!-- 考试规则弹框 -->
    <div v-show='showExamAlert' class="examAlertAndMask">
      <img @click="examAlertClose" class="examAlertColse" src="../assets/img/examAlertClose.png" alt="" srcset="">
        <div class="examAlertContent">
          <span class="ContentTop">
            考试须知
            <img src="../assets/img/examAlertHorn.png" alt="" srcset="">
          </span>
          <!-- <span class="ContentTitle">考场规则</span> -->
          <span class="Content">
            {{noticeAll}}
          </span>
          <!-- 按钮 -->
          <div @click="examAlertClose" class="IKnow">
            我知道了
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import Base64 from 'js-base64'
import ExamBanner from '../components/Common/examBanner'
import TencentMap from '../components/Common/tencentMap'

export default {
  name: 'Exam',
  components: {
    ExamBanner,
    TencentMap
  },
  data () {
    return {
      examInfo: null,
      nowLoc: null,
      targetLoc: null,
      showMap: false,
      showExamAlert: false,      // 考试通知
      examNotice: '',    // 考试须知
      noticeAll: ''
    }
  },
  created () {
    this.examInfo = this.$cookies.get('examInfo')
    console.log('this.examInfo:', this.examInfo);
    
    if (!this.examInfo) {
      this.$router.push({ path: '/choice' })
    } else {
      this.targetLoc = new window.qq.maps.LatLng(this.examInfo.loc.lat, this.examInfo.loc.lng)
    }
    // 考试须知
    this.getExamNotice()
  },
  mounted () {
    if (this.examInfo) {
      let that = this
      this.initWx().then(res => {
        that.wx.ready(function () {
          that.wx.getLocation({
            type: 'wgs84',
            success: function (res) {
              that.nowLoc = new window.qq.maps.LatLng(res.latitude, res.longitude)
              that.showMap = true
            },
            fail: function (res) {
              // that.$notify('定位失败，请打开定位，重新进入！')
            }
          })
        })
      })
    }
    setTimeout(() => {
      if(this.showMap === false) {
        this.$refs.locBtn.click()
      }
    }, 1000)
  },
  methods: {
    initWx () {
      let thisUrl = 'api/wechat/getjssdk?url=' + Base64.Base64.encode(location.href.split('#')[0])
      console.log('location.href.split:', location.href.split('#')[0]);
      console.log('initWx:', thisUrl)
      // 向服务端提供授权url参数，并且不需要#后面的部分
      return this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          // console.log('with wx:', this)
          this.wx.config({
            debug: false, // 开启调试模式,
            appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名，见附录1
            jsApiList: ['jsCheckApi', 'getLocation', 'openLocation']
            // jsApiList: res.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
        })
        .catch(err => {
          this.$notify('ERR: 获取微信授权失败')
        })
    },
    getLoc () {
      // console.log('click')
      this.initWx().then(res => {
        console.log('initWx res:', res);
        let that = this
        // 获取当前位置
        that.wx.ready(function () {
          that.wx.getLocation({
            type: 'wgs84',
            success: function (res) {
              // that.$notify('获取地理位置成功')
              // latitude、longitude、speed、accuracy、altitude、verticalAccuracy、horizonAccuracy
              that.nowLoc = new window.qq.maps.LatLng(res.latitude, res.longitude)
              that.showMap = true
            },
            fail: function (res) {
              window.location.reload()
              // that.$notify('定位失败，请刷新页面重试！')
            }
          })
        })        
      })
    },
    openLocation () {
       this.wx.openLocation({
        longitude: Number(this.examInfo.loc.lng),
        latitude: Number(this.examInfo.loc.lat),
        // name: this.data.store.name,
        // address: this.data.store.address
      }) 
    },
    // 获取考试须知
    getExamNotice () {
      let examInfoCookie = this.$cookies.get('examInfo')
      console.log('examInfoCookie:', examInfoCookie);
      let ExamInfoUrl = `api/exam/examinfo?school_id=${examInfoCookie.school_id}&exam_id=${examInfoCookie.exam_id}`
      this.axios.get(ExamInfoUrl)
        .then(res => {
          let resData = res.data
          if (resData.code === 0) {
            // console.log('res:', resData.data[0].notice);
            this.examNotice = resData.data[0].notice.substring(0, 50)
            this.noticeAll = resData.data[0].notice
          }else {
            this.examNotice = '暂时没有考试须知'
            this.noticeAll = '暂时没有考试须知'
          }
        })
    },
    openFullEdition() {
      this.showExamAlert = true
    },
    examAlertClose() {
      this.showExamAlert = false
    }
  }
}
</script>

<style scoped lang="stylus">
.map
  height 7.8rem
  .van-loading
    padding-top 3.5rem
    padding-left 4.5rem
  .map-btn
    position absolute
    top 8.6rem
    right .6rem
    width 1.2rem
    height 1.2rem
    border-radius 50%
    font-size $font-size-normal
    background $main-red
    color white
    span
      margin-top: .1rem;
      line-height: 1.3;
      display: inline-block;
.loc-btn
  position: absolute;
  top: -2rem;
.must-know
  margin .4rem .4rem 0 .4rem
  text-align left
  span 
    display block
    &.title
      padding .2rem
      font-size $font-size-normal
      color black
      border-bottom .01rem solid #BBBBBB
    &.text
      margin .2rem .2rem 0 .2rem
      font-size $font-size-normal
      line-height .5rem
      color #101010
      opacity .45
      max-height 1rem
      overflow hidden
      // white-space nowrap
      white-space pre-line
      display -webkit-box
      text-overflow ellipsis
      -webkit-box-orient vertical
      -webkit-line-clamp 2
.fullEdition 
  color blue
  font-size .4rem
  margin 0 .2rem .2rem .2rem
  line-height .6rem
// 考试规则弹框css
.examAlertAndMask
  background-color #00000090
  // opacity .6
  position absolute
  width 100%
  top 0
  bottom 0
  color #000
  z-index 999
  .examAlertColse
    width 7%
    margin .3rem -68% .1rem 0    
  .examAlertContent
    margin 0 1.2rem 1.5rem 1.2rem
    border-radius .15rem
    background-color #ffffff
    font-weight 600
    display flex
    flex-direction column
    align-items center
    .ContentTop
      font-size 18px
      display flex
      align-items center
      margin .35rem 0 .45rem 0
      img
        margin-left .1rem
        width 23%
        height 23%
    .ContentTitle
      font-size 14px
    .Content
      font-size 12px
      display flex
      flex-direction column
      align-items flex-start
      text-align left 
      font-weight 500
      margin .1rem .7rem .5rem .8rem
      line-height 20px
      color #616161
      overflow-y auto
      height 8rem
      border-radius .1rem
      white-space pre-line
      b
        color #000
      b:last-child
        align-self flex-end
        margin .1rem 0 .2rem 0
    .IKnow
      background-color #169bd5
      width 3.8rem
      height 1rem
      color white
      font-weight 500
      font-size 14px
      border-radius 1rem
      line-height 1rem
      margin-bottom .8rem
</style>
