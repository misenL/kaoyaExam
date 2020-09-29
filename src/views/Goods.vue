<template>
  <div class="container">
    <img class="goodsSwipe" src="../assets/img/swipe/swipeOne.png" alt="">
    <div class="goodsNotice">
      <img src="../assets/img/horn.png" alt="">
      <van-notice-bar
        color="#000000"
        background="#ffffff"
        class="vanNoticeClass"
      >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {{notice}}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </van-notice-bar>
    </div>
    <div class="goodsContent">
      <ExamBanner v-if="examInfo" :examInfo="examInfo"></ExamBanner>
    </div>
    <div class="iconImg">
      <li @click="iconImgClick(index)" v-for="(icon, index) in iconImg" :key="index" :style="{background: icon.bc}">
        <img :src="icon.img" alt="" srcset="">
        <span>{{icon.title}}</span>
      </li>
    </div>
    <div class="goodsContent" v-if="!isLoading">
      <div class="yet-empty" v-if="!goodsList.length">该考点暂无相关服务~</div>
      <div class="card-list" v-if="goodsList.length">
        <van-card class="van-card"
          v-for="item in goodsList"
          :key="item.id"
          :price="item.price"
          :title="item.item_good_name"
          @click="showGoodsDetail(item.id)"
          :thumb="item.img">
          <!-- <div slot="footer" class="right-btn"> -->
            <van-icon slot="footer" size=".6rem" color="red" name="cart-o" />
            <!-- <van-button 
              round 
              type="danger"
              size="small">
              购买
            </van-button> -->
          <!-- </div> -->
        </van-card>
      </div>
    </div>
    <van-loading v-if="isLoading" type="spinner" class="loading"/>
  </div>
</template>

<script>
import ExamBanner from '../components/Common/examBanner'

export default {
  name: 'Goods',
  components: {
    ExamBanner
  },
  data () {
    return {
      examInfo: null,
      goodsList: [],
      iconImg: [
        { img: require('../assets/img/GPS.png'), title: '考场导航', bc: '#5593ff' },
        { img: require('../assets/img/service.png'), title: '周边服务', bc: '#b889f3' },
        { img: require('../assets/img/lostFonud.png'), title: '失物招领', bc: '#ff943c' },
        { img: require('../assets/img/ATA.png'), title: '行业测评', bc: '#68d82d' },
      ],
      isLoading: true,
      // 路由狗子使用
      shoppingId: null,
      // 通知内容
      // notice: '广东省番禺区2019年教师资格证考试指南教师资格证考试指南'
      notice: '小智预祝所有考生考试顺利通过！'
    }
  },
  created () {
    this.examInfo = this.$cookies.get('examInfo');
    console.log('this.examInfo', this.examInfo);
    
    if (!this.examInfo) {
      this.userInfo = this.$store.getters.userInfo
      if(this.userInfo) {
        this.$router.push({ path: '/choice' })
      } else {
        let redirect = '/choice'
        this.$router.push({ path: '/login', query: {redirect} })
      }
    } else {
      this.getGoodsList()
    }
  },
  // 监听物理返回键功能
  mounted(){
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.fun, false);//false阻止默认事件
    }
  },
  destroyed(){
    window.removeEventListener('popstate', this.fun, false);//false阻止默认事件
  },
  methods: {
    getGoodsList () {
      let thisUrl = '/api/goods/goodslist?school_id=' + this.examInfo.school_id
      this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          if (res.code === 0) {
            this.goodsList = res.data 
            console.log(this.goodsList);
            
            this.isLoading = false
          } else {
            this.$notify(res.msg)
          }
        })
        .catch(err => {
          this.$notify('ERR: 数据获取失败')
        })
    },
    showGoodsDetail (id) {
      this.shoppingId = id
      this.$router.push({ path: '/goods/detail', query: {id: id} })
    },
    fun () {
      // console.log('监听了2');
      this.$router.push({ path: `/choice?school_id=${this.examInfo.school_id }&school_name=${this.examInfo.school_name}&exam_id=${this.examInfo.exam_id}&exam_name=${this.examInfo.exam_name}`})      
    },
    // 那四个图标的点击跳转事件
    iconImgClick (index) {
      console.log(index);
      switch (index) {
        case 0:       // 考场导航
          this.$router.push({ path: '/examNumberMap' })          
          break;
        case 1:       // 周边服务
          this.$router.push({ path: '/around' })           
          break;
        case 2:       // 失物招领
          this.$router.push({ path: `/goods/lostList?school_id=${this.examInfo.school_id}` })          
          break;
        case 3:       // 行业测评
          this.$router.push({ path: '/ATA' })
          break;
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.van-card {
  background white
  text-align left
  margin .2rem 0
  padding 0
}
.van-card__desc {
  height 1.2rem
  width 6.3rem
  max-height 1rem
  word-break keep-all
  white-space pre-wrap
}
// end
.goodsSwipe {
  width 100%
  max-height 20vh
  // object-fit cover
}
.goodsNotice {
  display flex
  justify-content flex-start
  align-items center
  margin-top -.2rem
  border-bottom .1rem solid #f1f1f1
  background-color #ffffff
  height .9rem
}
.goodsNotice img {
  width .8rem
  height .8rem
  margin-left .2rem
  background-color #ffffff
}
.goodsNotice .van-notice-bar {
  width 85vw
  padding-left .1rem
  height .8rem
  line-height .7rem
}
.iconImg {
  font-size 14px
  // display flex
  // justify-content space-between
  display grid
  grid-template-columns repeat(2, 1fr)
  grid-row-gap .2rem
  grid-column-gap .2rem
  padding .3rem .5rem
  border-bottom .1rem solid #f1f1f1
  background-color #ffffff
}
.iconImg li {
  list-style none
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding .4rem 0
  border-radius .15rem
  background-color #ff6b6b
  color #ffffff
  font-weight 600

}
.iconImg li img {
  width 1rem
  height 1rem
  margin-bottom .2rem
}
.card-list {
  display grid
  grid-template-columns repeat(2, 1fr)
  padding 0 .5rem
  grid-row-gap .3rem
  grid-column-gap .3rem
}
.van-card__header {
  display flex
  flex-direction column
}
.goodsContent .card-list {
  background-color #ffffff
}
.goodsContent/deep/.van-image__img {
  object-fit cover!important
}
.van-card__thumb {
  margin-right 0
  width 100%
  height 3rem
}
.van-card__content {
  min-height 1rem
  padding-left .2rem
}
.van-card__title {
  font-weight 600
  margin-top .15rem
}
.van-card__price {
  color #369
  font-weight 600
  margin-top .05rem
}
.van-card__footer {
  margin-top -.6rem
  margin-right .2rem
}
</style>
