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
          active-color="red"
        >
          <van-tabbar-item icon="service-o">服务</van-tabbar-item>
          <van-tabbar-item icon="location-o">导航</van-tabbar-item>
          <van-tabbar-item icon="user-o">我的</van-tabbar-item>
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
      active: 0
    }
  },
  created () {
    // console.log(this.deepCopy)
  },
  mounted () {
    // console.log(this.$route.path)
    let page = this.$route.path.split('/')[1]
    let nowIndex = page === 'goods' ? 0 : page === 'exam' ? 1 : 2
    this.active = nowIndex
  },
  methods: {
    // ...mapMutations(['setUserInfo']),
    changeTab (index) {
      // console.log(index)
      if (index === 0) {
        this.$router.push({ path: '/goods' })
      } else if (index === 1) {
        // this.$router.push({ path: '/exam' })
        location.href = '/exam'
      } else if (index === 2) {
        this.$router.push({ path: '/mine' })
      }
    },
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
    height: $bom-height
    bottom: 0
    .van-tabbar
      height: $bom-height
      .van-tabbar-item
        font-size .38rem
        .van-tabbar-item__icon
          font-size .6rem
  .cube-tab-bar
    background-color: white
    .cube-tab
      div
        font-size $font-size-normal
</style>
