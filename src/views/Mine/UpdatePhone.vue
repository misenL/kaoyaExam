<template>
  <div class="container">
    <van-field class="van-field"
        v-model="sms"
        center
        clearable
        placeholder="请输入手机号">
        <!-- <div slot="label">+86 <img class="img" src="./../../assets/img/arrow-down.png"></div> -->
    </van-field>
        <van-field class="van-field"
        type="number"
        v-model="code"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
    >
        <van-button slot="button" size="small" type="primary" class="button">获取验证码</van-button>
    </van-field>
    <van-button size="small" type="primary" class="confirm">确认</van-button>

  </div>
</template> 

<script> 
export default {
  name: 'UpdatePhone',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  // 1rem 是屏幕宽度的十分之一
.container
  margin .3rem
  .van-field
    text-align left
    background #F2F2F2
    margin-top .3rem
    .img
        vertical-align middle
    .button
        background #F76968
        border-color #F76968
        width 100%
        height .9rem
  .confirm
    background #F76968
    border-color #F76968
    width 100%
    margin-top 1rem
    height 1rem

</style>
