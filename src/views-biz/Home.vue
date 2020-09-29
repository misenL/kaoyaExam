<template>
  <div class="home">
    <div class="content">
      <div class="index"></div>

      <div class="main">
        <router-view/>
      </div>

      <div class="tab-bar">
        <van-tabbar
          v-model="active"
          @change="changeTab"
          active-color="#3887e1"
        >
          <van-tabbar-item icon="certificate">核销</van-tabbar-item>
          <van-tabbar-item icon="after-sale">收益</van-tabbar-item>
          <!-- <van-tabbar-item icon="user-o">我的</van-tabbar-item> -->
        </van-tabbar>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      active: this.$cookies.get('changeTab')===null?0:this.$cookies.get('changeTab')
    }
  },
  created () {
    console.log('+++++++++++++++created');
    this.active = 0
  },
  destroyed () {
    this.active = 0
  },
  mounted () {
    // console.log(this.$route.path)
    let page = this.$route.path.split('/')[2]
    let nowIndex = page === 'verify' ? 0 : page === 'profit' ? 1 : 2
    this.active = nowIndex
  },
  methods: {
    // ...mapMutations(['setUserInfo']),
    changeTab (index) {
      console.log('changeTab index:', index)
      this.$cookies.set('changeTab', index, -1)
      if (index === 0) {
        // this.$router.push({ path: '/biz/verify?session=1' })
        location.href = '/biz/verify'
      } else if (index === 1) {
        this.$router.push({ path: '/biz/profit' })
        // location.href = '/biz/profit'
      } else if (index === 2) {
        this.$router.push({ path: '/biz/mine' })
      }
    }
  },
  watch: {
    active (newV) {
      // console.log(newV)
    }
  }
}
</script>

<style scoped lang="stylus">
  .index
    height: 100%

  .main
    height: -webkit-calc(100% - 55px)
    height: -moz-calc(100% - 55px)
    height: calc(100% - 55px)
    padding-bottom: 55px

  .tab-bar
    position: fixed
    width: 100%
    height: 1.33rem
    bottom: 0

  .cube-tab-bar
    background-color: white
    .cube-tab
      div
        font-size: $font-size-normal
</style>
