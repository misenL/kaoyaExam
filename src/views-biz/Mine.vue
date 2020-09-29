<template>
  <div class="container">
    <div class="blur-header">
    </div>

    <div class="bottom-info clearfix">
      <div class="left">
        <img v-if="userInfo" :src="userInfo.headpic" alt="">
        <div class="user-info" v-if="userInfo">
          <span>{{ userInfo.username ? userInfo.username : '用户' + userInfo.tel}}</span><br>
        </div>
      </div>
    </div>

    <!-- <div class="item-list">
      <van-cell title="联系客服" icon="phone-o" is-link to="/" />
      <van-cell title="商家指南" icon="smile-o" is-link to="/" />
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Mine',
  data () {
    return {
      userInfo: null
    }
  },
  mounted () {
    this.userInfo = this.$store.getters.userInfo ? this.$store.getters.userInfo.user_info : null
    // console.log(this.userInfo)
  },
  computed: {
    // 有时候用户直接刷新mine页面，获取用户信息的代码放在APP.vue 中
    // 为了保证获取用户信息时app 已经获取用户数据，两个组件需要进行沟通
    ...mapState(['gotUserInfoFlag']),
  },
  watch: {
    gotUserInfoFlag: function (newV, oldV) {
      if (newV) {
        this.userInfo = this.$store.getters.userInfo.user_info
        // console.log(this.userInfo)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  // 1rem 是屏幕宽度的十分之一
  .blur-header
    position absolute
    z-index -1
    top 0
    width 100%
    height 5rem
    background-image: url('../assets/logo.png')
    background-size: cover
    overflow hidden
    -webkit-filter: blur(.03rem);
    -moz-filter: blur(.03rem);
    -o-filter: blur(.03rem);
    -ms-filter: blur(.03rem);
    filter: blur(.03rem);
  .bottom-info
    margin 1.8rem 0
    .left
      width 6rem
      float left
      margin-left .8rem
      img
        float left
        width 2rem
        height 2rem
        border-radius 50%
        border: .04rem solid #fff
      .user-info
        margin-top 1rem
        margin-left 2.4rem
        text-align left
        font-size $font-size-normal
        line-height 1.2
        color white
  .item-list
    text-align left
</style>
