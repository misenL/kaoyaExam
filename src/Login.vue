<template>
  <div>
    <div class="header-img"></div>
    <div class="login-form">
      <van-cell-group>
        <van-field type="number" v-model="phone" label="手机号" placeholder="请输入手机号"/>
      </van-cell-group>
      <van-cell-group class="code">
        <van-field type="number" v-model="code" center clearable label="短信验证码" placeholder="请输入验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendCode"
            :disabled="!phone || wait"
          >{{ codeHint }}</van-button>
        </van-field>
      </van-cell-group>
      <van-button
        type="default"
        @click="doLogin"
        class="btn-login"
        :disabled="(!checked && !isModify) || !phone || !code"
      >{{isModify? '确认修改' : '注册'}}</van-button>
      <div class="agree-check" v-show="!isModify">
        <van-checkbox v-model="checked" checked-color="#DC1829">
          我已阅读并同意
          <a href="javascript:;" @click="zhikaoAgree">《小智助考协议》</a>
        </van-checkbox>
      </div>
    </div>

    <!-- 临时协议弹框 -->
    <div v-show='showAgreeAlert' class="showAgreeAlert">
      <img @click="closeAgree" class="agreeAlertColse" src="./assets/img/examAlertClose.png">
      <div class="agreeAlertContent">
        <span class="ContentTop">
          《小智助考协议》
        </span>
        <span class="ContentTitle">欢迎注册小智助考</span>
        <span class="Content">
          <b>
            以下内容是《小智助考协议》，在您注册前请务必审慎阅读、充分理解协议中相关条款内容。你一旦注册小智助考，即视为你已了解并完全同意本协议各项内容，包括小智助考对使用协议随时所做的任何修改。如你不同意本协议及/或随时对其的修改，请你立即停止注册及使用小智助考所提供的全部服务。
          </b>
          1、为了能使用本服务，按照中国法律的要求，你同意以下事项：依本服务注册提示填写你正确的手机号码等信息，并确保今后更新的手机号码等资料的真实性、有效性和合法性。若你提供任何违法、不道德或小智助考认为不适合在网上展示的资料；或者小智助考有理由怀疑你的行为属于程序或恶意操作，小智助考有权无须事先通知即可暂停或终止你使用账号，并拒绝你于现在和未来使用本服务之全部或任何部分。<br>
          2、用户账号及安全<br>
          2.1 完成本服务的注册程序并成功注册之后，你可使用手机号码及验证码，登录到你在小智助考的账号（下称“账号”）。注册完成之时，你便获得了账号的使用权。保护账号安全，是你的责任。<br>
          3、用户个人信息保护<br>
          3.1 保护你个人信息安全既是法律要求，也是小智助考长期坚持的一项基本原则。你提供的注册资料及小智助考保留的有关你的其它资料将受到中国有关法律的保护。小智助考将根据中国法律及本协议的规定收集、存储、使用你的个人信息。<br>
          3.2 一般情况下，你可随时浏览、修改你在小智助考上的个人信息，但出于安全性和身份识别的考虑，你可能无法修改注册时提供的初始注册信息及其他验证信息。<br>
          3.3 在本平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，本平台有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。<br>
          4、服务变更、中断或终止<br>
          4.1 小智助考可能会对服务内容进行变更、也可能会中断、终止服务。<br>
          4.2 鉴于网络服务的特殊性（包括但不限于服务器的稳定性问题、恶意的网络攻击等行为或小智助考无法控制的情形），你同意小智助考有权随时中断或终止部分或全部的服务。<br>
          4.3 你理解，小智助考需要定期或不定期对提供服务的平台或相关设备进行维护、升级或其他目的暂停部分或全部服务，如因此类情况而造成服务在合理时间内的中断，小智助考无需为此承担任何责任。瓣对你或任何第三人均不承担任何责任。<br>
          5、担保与保证<br>
          你明确了解并同意∶<br>
          1）本使用协议的任何规定不会免除小智助考因过错而造成你人身伤害或财产损失的任何责任；<br>
          2）小智助考不保证以下事项∶<br>
          　　· 本服务将符合你的要求；<br>
          　　· 本服务将不受干扰、及时提供、安全可靠或不会出错；<br>
          　　· 使用本服务取得之结果正确可靠；<br>
          　　· 你经由本服务购买或取得之任何产品、服务、资讯或其它信息将符合你的期望；<br>
          3）是否使用本服务下载或取得任何资料应由你自行考虑且自负风险，因任何资料之下载而导致的你电脑系统之任何损坏或数据丢失等后果，由你自行承担；<br>
          6、用户行为<br>
          6.1 你应遵守中华人民共和国相关法律法规，并同意对以任何方式使用你的登录账号而使用本服务的任何行为及其结果承担全部责任。如你的行为违反国家法律，你将依法承担全部法律责任；如涉嫌构成犯罪，司法机关将追究你的刑事责任，小智助考将严格按照法律规定的义务及司法机关的要求进行配合。<br>
          同时，如果小智助考有理由认为你的任何行为，包括但不限于你的任何言论或其它行为违反或可能违反国家法律法规的任何规定，小智助考可在任何时候不经任何事先通知终止向你提供服务。<br>
          7、知识产权<br>
          7.1 小智助考在本服务中提供的内容（包括但不限于网页、界面设计、版面框架、文字、、图片或其他资料等）等知识产权归小智助考或相关权利人所有。除另有约定外，小智助考标识及产品、服务名称，均为小智助考之商标。 <br>       
        </span>
        <!-- 按钮 -->
        <div @click="closeAgree" class="IKnow">
          我同意
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      query: null,
      checked: true,
      code: null,
      phone: null,
      wait: false,
      codeHint: '发送验证码',
      isModify: false,      // 我已阅读协议的圈圈默认是✔
      showAgreeAlert: false       // 协议弹框，默认隐藏
    }
  },
  mounted () {
    this.query = this.$route.query
    if (this.query.redirect) {
      this.$router.push(this.query.redirect)
      return
    }
    this.isModify = this.$route.query.isModify || false
    if (this.isModify) {
      this.phone = this.$store.getters.userInfo.tel
      document.title = '修改手机号'
    }
  },
  methods: {
    ...mapMutations(['toggleUpdateUserInfoFlag']),
    doLogin () {
      this.axios.post('/api/user/reg', {
        tel: this.phone,
        code: this.code,
        usertype: 'normal'
      })
        .then(res => {
          res = res.data
          if (res.code === 0) {
            // 如果是修改手机号的情况，点击按钮跳到商品列表，否则跳到考场选择页面
            // 修改手机号同时更新vuex 信息
            this.toggleUpdateUserInfoFlag()
            if (this.isModify) {
              this.$router.push({ path: '/goods' })
            } else {
              this.$router.push({ path: '/choice', query: this.query })
            }
          } else {
            this.$notify(res.msg)
          }
        })
        .catch(err => {
          this.$notify('ERR: 登录失败')
          // console.log(err)
        })
    },
    sendCode () {
      // 倒计时
      let count = 30
      this.wait = true
      this.codeHint = count + 's后重试'
      let intId = setInterval(() => {
        count--
        if (count === 0) {
          window.clearInterval(intId)
          this.codeHint = '发送验证码'
          this.wait = false
        } else {
          this.codeHint = count + 's后重试'
        }
      }, 1000)
      // 向服务端求取短信服务
      let thisUrl = '/api/tool/telcode?tel=' + this.phone
      this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          if (res.code === 0) {
            // notify 默认背景为红色
            this.$notify({
              message: '验证码发送成功',
              background: '#1989fa'
            });
          } else {
            this.$notify(res.msg)
          }
        })
        .catch(err => {
          this.$notify('数据获取失败')
        })
    },
    zhikaoAgree () {
      this.showAgreeAlert = true      
    },
    closeAgree () {
      this.showAgreeAlert = false
      this.checked = true
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import './main.styl';

// 1rem 是屏幕宽度的十分之一
.header-img {
  background-size: cover;
  background-image: url('./assets/img/login.png');
  background-position: -20px;
  width: 100%;
  height: 6rem;
}

.login-form {
  margin: 1.6rem 0.8rem 0;

  .input-phone {
    border-radius: 1rem;
  }

  .code {
    margin-top: 0.6rem;

    button {
      background: $main-red;
      border-color: $main-red;
    }
  }

  .agree-check {
    margin-top: 1rem;
    font-size: $font-size-normal;
    width: 100%;
    bottom: 0;
  }

  .input-a {
    height: 40px;
    right: 10px;
    font-size: $font-size-normal;
    margin-top: -0.7rem;
    display: compact;
    position: relative;
    float: right;
    color: #FFA83F;
  }

  .btn-login {
    width: 100%;
    margin-top: 1rem;
    color: white;
    background: $main-red;
  }
}
// 考试规则弹框css
.showAgreeAlert
  background-color #00000090
  // opacity .6
  position absolute
  width 100%
  top 0
  bottom 0
  color #000
  z-index 999
  .agreeAlertColse
    width 7%
    margin .35rem -68% 0 0    
  .agreeAlertContent
    margin 0 1.2rem 1.5rem 1.2rem
    border-radius .15rem
    background-color #ffffff
    font-weight 600
    display flex
    flex-direction column
    align-items center
    .ContentTop
      font-size 16px
      display flex
      align-items center
      margin .45rem 0 .4rem 0
      // img
      //   margin-left .1rem
      //   width 23%
      //   height 23%
    .ContentTitle
      font-size 13px
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
      b
        color #000
      // b:last-child
      //   align-self flex-end
      //   margin .1rem 0 .2rem 0
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
