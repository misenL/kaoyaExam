<template>
  <div>
     <div class="match-list">
      <cube-scroll class="scroll">
        <ul class="match-inner">
          <li :key="item" v-for="item in [1,2,3,4,5]" class="item-li">
            <div class="div-top">
              <div class="left">候考服务</div>
              <div class="right">
                <img src="../../assets/img/delete.png" class="delete-icom">
              </div>
            </div>
            <div class="match-item" >
              <div class="left">
                <img src="../../assets/img/pen.jpg" alt="" class="logo">
              </div>
              <div class="center">
                <div class="text-describe">服务说明</div>
                <div class="text-location"><span>服务地点: 楼栋-教室 <img src="../../assets/img/location.png" class="location"></span></div>
              </div>
              <div class="right">
                <p class="money">￥10</p>
              </div>
            </div>
            <div class="div-bottom">
              <div class="left">数量</div>
              <div class="right">
                <div class="count">
                  <img src="../../assets/img/sub.png" class="sub">
                  <em class="num">(1)</em>
                  <img src="../../assets/img/add.png" class="add">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>

    <div class="div-btn">
      <div class="left">
        <div class="total">
          <div class="total-money">￥133</div>
          <div class="total-text">到指定服务点兑换服务</div>
        </div>
      </div>
      <div class="right">
        <div class="pay">去结账</div>
      </div>
    </div>
    <img src="../../assets/img/people.png" class="people">
  </div>

</template>

<script>
export default {
  name: 'Pay',
  props: {
    msg: String
  },
  mounted () {
    this.axios.get('/user/list')
      .then(res => {
        // console.log(res)
      })
      .catch(err => {
        // console.log(err)
      })
  }
}
</script>

<style scoped lang="stylus">

.div-top
  background-color #FFFFFF
  height 1rem
  margin-top 0.5rem
  border-bottom 1px solid #e6e6e6
.left
  font-weight bolder
  color #4f4f4f
  float left
  font-size 0.5rem
  margin-top 0.25rem
.right
  float right
  font-size 0.5rem
  margin-top 0.25rem
  .delete-icom
    width: .6rem
    height: .6rem

.match-list
  padding-bottom 1.5rem
  .match-inner
    .item-li
      background-color #FFFFFF
      padding 0rem .3rem
    .match-item
      border-bottom 1px solid #e6e6e6
      height 2rem
      border-bottom 1px solid #E4E4E4
      padding .2rem .2rem 0.2rem 0rem
      display flex
      justify-content space-around
      .left
        text-align left
        width 2.7rem
        img
          display inline-block
          height 2rem
          width 2.7rem
          overflow hidden
          background-size cover
          background-size 100% 100%

      .center
        font-size 0.5rem
        width 5.2rem
        margin  0rem 0.2rem 0rem 0.15rem
        text-align left
        .text-describe
          height 0.9rem
          font-size 0.5rem
          font-weight bolder
          color #4f4f4f
          margin-top 0.2rem
        .text-location
          height 0.9rem
          font-size 0.4rem
          color #838383
          word-wrap break-word
          .location
            width: .5rem
            height: .5rem
            margin-left .1rem

      .right
        .money
          color red
          text-align center
          font-size 0.5rem
          font-weight bolder
          margin-top 0.3rem
        .count
          width 2.4rem
          justify-content space-around
          .sub
            margin-top 1.3rem
            width: .6rem
            height: .6rem
            float left
            text-align right
          .num
            margin-top 1.4rem
            width .9rem
            float left
            text-align center
            font-size 0.4rem
            word-wrap break-word
          .add
            margin-top 1.3rem
            text-align left
            width: .6rem
            height: .6rem
            float left
.div-bottom
  background-color #FFFFFF
  height 1rem
  .left
    float left
    font-size 0.5rem
    font-weight bolder
    color #4f4f4f
    margin-top 0.25rem
  .right
    float right
    font-size 0.5rem
    margin-top 0.25rem
    .sub
      margin-top 0rem
      width: .6rem
      height: .6rem
      float left
      text-align right
    .num
      margin-top .1rem
      width .9rem
      float left
      text-align center
      font-size 0.4rem
      word-wrap break-word
    .add
      margin-top 0rem
      text-align left
      width: .6rem
      height: .6rem
      float left
.div-btn
  position fixed
  bottom 0rem
  z-index 1
  height 1.5rem
  width 100%
  .left
    height 1.5rem
    width 65%
    float left
    background-color #4f4f4f
    .total
      .total-money
        margin-top 0.1rem
        font-size 0.7rem
        color #fff
        font-weight bolder
      .total-text
        margin-top 0.15rem
        margin-left 0.8rem
        font-size 0.3rem
        color #dee
  .right
    height 1.5rem
    width 35%
    float right
    background-color #1484e3
    .pay
      margin-top 0.4rem
      color #fff
      font-size 0.7rem
      font-weight bolder
.people
  position fixed
  bottom 0rem
  left 0.3rem
  z-index 2
  height 1.8rem
  width 1.6rem
</style>
