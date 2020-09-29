<template>
  <div class="container">
    <div class="blur-header">
    </div>

    <div v-if="userInfo" class="bottom-info clearfix">
      <div class="left">
        <img :src="userInfo.headpic" alt="">
        <div class="user-info">
          <span>{{ userInfo.username ? userInfo.username : '用户' + userInfo.tel}}</span><br>
        </div>
      </div>
    </div>

    <div class="item-list">
      <van-cell title="我的订单" icon="orders-o" is-link to="/service/list" />
      <van-cell title="个人资料" icon="newspaper-o" is-link to="/contact" />
      <van-cell title="关于我们" icon="friends-o" is-link to="/aboutUs" />
      <!-- <van-cell title="用户反馈" icon="smile-o" is-link to="/feedback" /> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      userInfo: {
        headpic: '',
        username: '',
        tel: ''
      }
    }
  },
  created () {
    this.axios.get('/api/user/info')
    .then((res) => {
      res = res.data
      if (res.code === 0) {
        this.userInfo = res.data
        console.log('userInfo:', this.userInfo);
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
    // this.userInfo = this.$store.getters.userInfo;
    // console.log(this.userInfo);
    
  },
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
    background-image: url('../assets/img/haha.jpg')
    background-size: cover
    overflow hidden 
    -webkit-filter: blur(.06rem);
    -moz-filter: blur(.06rem);
    -o-filter: blur(.06rem);
    -ms-filter: blur(.06rem);
    filter: blur(.06rem);
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
