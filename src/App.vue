<template>
  <div id="app">
    <router-view v-if="!isLoading"/>
    <van-loading v-if="isLoading" type="spinner" class="loading"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Base64 from 'js-base64'
export default {
  name: 'app',
  data () {
    return {
      // isLoading: true
      isLoading: false,
      query: null,
      arrSearch: [],
    }
  },
  created () {
    // alert(location.href)
    this.query = this.$route.query
    // 查看登录状态
    this.checkLogin()
  },
  methods: {
    ...mapMutations(['toggleUpdateUserInfoFlag', 'setGotUserInfoFlagTrue']),
    /**
     * 1、每次进入页面，首先检查用户已经是否登录过，如果未登录，需要定位到授权登录页面
     * 2、检查完登录状态之后向后端获取用户信息检查是否存在手机号
     * 3、如果不存在手机号则跳转到注册页面，否则就当无事发生过
     */
    checkLogin () {

      let login = this.$cookies.get('login')
      console.log('checkLogin:', !login);
      console.log('Base64', location.href.split('#')[0]);
      
      
      // if (!login) {
      //   let loginUrl = 'http://kaoya.huikaoedu.com/api/wechat/userlogin?url=' + Base64.Base64.encode(location.href.split('#')[0])
      //   // let loginUrl = 'http://jkapi.huikaoedu.com/api/wechat/userlogin?url=' + Base64.Base64.encode(location.href.split('#')[0])
        
      //   console.log('loginUrl:', loginUrl);
        
      //   // 进行登录
      //   window.location.href = loginUrl
      // } else {
      //   this.getUserInfo()
      // }

        // this.getUserInfo()
        console.log('loginUrl1:', Base64.Base64.encode(location.href.split('#')[0], location.href))
        console.log('loginUrl2==========:', location.href.split('#')[0])
    },
    getUserInfo () {
      // 判断当前页面是用户端还是商家端
      let isBiz = false
      let thisUrl = null
      let jumpPath = null
      // 以 http://kaoyafront.huikaoedu.com/biz/mine 为例
      let nowPage = window.location.href.split('//')[1].split('/')[1]
      if (nowPage === 'biz') {
        isBiz = true
        thisUrl = 'api/bizuser/info'
        jumpPath = '/biz/login'
        if (location.search !== '') {           // 如果url有参数才去取
          let loSearch = location.search.split('?')[1].split('&')
          this.arrSearch = []      // 储存url的参数，不用query是为了防止意外取不到
          loSearch.map(item=>{ this.arrSearch.push(item.split('=')[0], item.split('=')[1]) })
          console.log('query:', this.query);
          console.log('loSearch:', this.arrSearch);
        }
      } else {
        thisUrl = '/api/user/info'
        jumpPath = '/login'
      }
      this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          console.log('App getUserInfo axios:', res);
          this.$cookies.set('openid', res.data.openid, -1)
          this.isLoading = false
          if (res.code === 0) {

              // 用户端和商家端返回信息结构不一致，所以需要分别判断
              // if ((!isBiz && (!res.data || !res.data.tel)) || (isBiz && (!res.data || !res.data.user_info || !res.data.user_info.tel))) {
              //     if (nowPage === 'biz') {
              //         console.log('bizRes:', res.data.length);
              //         this.$router.push({ path: jumpPath, query: this.query })
              //     }
              // }
              if (nowPage === 'biz') {     // biz商家
                  if (res.data === []) {      // 并且data为空，未注册
                      console.log('未注册');
                      this.$router.replace({ path: jumpPath, query: this.query })
                  }else if (res.data.biz_staff === []) {                        // staff为空，说明没有加入任何商家
                      console.log('没有加入任何商家');
                      this.$router.replace({ path: '/contactAdmin' })
                  }else if (res.data.biz_staff !== []) {            // 不为空判断是否已经加入这个商家
                      console.log('有商家');
                      console.log('Appvue判断是否当前是登陆页面:', location.pathname.split('/')[2]);
                      // 如果是login页面才判断
                      if (location.pathname.split('/')[2] === 'login') {
                          let judgeBiz = false
                          console.log('res.data:', res.data, this.arrSearch);
                          if (this.arrSearch.length === 0) {          // 这时的url如果没参数
                            this.$router.replace({ path: '/biz/profit'})
                            return
                          }
                          // 这里是如果有参数的
                          res.data.biz_staff.map(item => {
                            console.log('res.data.biz_staff.map:', item.biz_id);
                            this.arrSearch.indexOf(item.biz_id.toString()) === 1 ? judgeBiz = true : '';
                          })
                          if (judgeBiz) {
                              this.$router.replace({ path: `/biz/profit?${this.arrSearch[0]}=${this.arrSearch[1]}&${this.arrSearch[2]}=${this.arrSearch[3]}` })
                          }else {
                              this.$router.replace({ path: `/biz/confirmJoin?${this.arrSearch[0]}=${this.arrSearch[1]}&${this.arrSearch[2]}=${this.arrSearch[3]}` })
                          }
                      }
                  }
              }
          } else if (res.code === 40001 ) {
            // 重新进行登录
            let loginUrl = 'http://kaoya.huikaoedu.com/api/wechat/userlogin?url=' + Base64.Base64.encode(location.href.split('#')[0])
            window.location.href = loginUrl
          }

          // 不是商家，提示完善信息
          if (nowPage !== 'biz'){
            this.$router.push({path:'/contact'})
            this.$notify('请完善信息')
          }

        })
        .catch(err => {
          this.$notify(err)
        })
    }
  },
  computed: {
    // 这句话的意思是接收Vuex 中state 中的userListUnitReload 值并保存在本地的同名变量中
    ...mapState(['updateUserInfoFlag']),
  },
  watch: {
    updateUserInfoFlag: function (newV, oldV) {
      // console.log('update')
      // 检查是否需要刷新页面
      if (newV) {
        this.getUserInfo()
        // 重新将刷新设为false
        this.toggleUpdateUserInfoFlag()
      }
    }
  }
}
</script>

<style lang="stylus">
body
	background $main-bg

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
