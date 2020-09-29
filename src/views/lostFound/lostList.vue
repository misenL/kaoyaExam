<template>
    <div>
        <div class="lostListTop">
            <div class="lostTab">
                <van-tabs 
                  animated 
                  @click="cutTab" 
                  background="#003366"
                  color='#ffffff'
                  title-active-color="#ffffff"
                  title-inactive-color="#ffffff">
                    <van-tab 
                      v-for="(item, index) in lostTab" 
                      :key="index" 
                      :title='item.title'>
                      <!-- 报失 1 和招领 2 显示的是不一样的 -->
                        <div v-if="item.value === 1">
                            <div v-for="(lostC, index) in lostList" :key="index" @click="tabToDetail(lostC.id)" class="lostListContent">
                                <p>{{lostC.goods_name}}</p>
                                <p>{{lostC.goods_describle}}</p>
                                <div class="lostListUserInfo">
                                    <span class="userInfo" v-if="lostC.student_info">
                                        <img v-if="lostC.student_info.headpic!==''" :src="lostC.student_info.headpic" alt="">
                                        <img v-else src="../../assets/img/haha.jpg" alt="">
                                        {{lostC.username}}
                                    </span>
                                    <span class="seatLine"></span>
                                    <span class="pushDate">
                                        {{lostC.create_time}}
                                    </span>
                                </div>
                            </div>
                      </div>
                      <div v-else-if="item.value === 2">
                          <div class="lostReceive">
                              <p class="lostNoticeP">
                                  遗失物品公告
                              </p>
                              <div class="lostGoods">
                                  <p class="fontStyle">恰得物品及数量</p>
                                  <ul>
                                      <li v-for="(noticeItem, index) in lostNoticeList" :key="index">
                                          <span>{{noticeItem.title}}</span>
                                          <span>({{noticeItem.number}})</span>
                                      </li>
                                  </ul>
                              </div>
                              <div class="receivePlace">
                                  <p class="fontStyle">领取地点、工作时间及联系电话</p>
                                  <div>
                                      <span>{{receivePlace.notice+receivePlace.lostandfound_location}}</span>
                                      <span>{{receivePlace.lostandfound_work_time}}</span>
                                      <span>{{receivePlace.lostandfound_tel}}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </van-tab>
                </van-tabs>
            </div>
            <div class="lostEdit" @click="toPublish">
                <i class="el-icon-edit-outline"></i>
                <span>发布</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            urlQuery: '',
            lostTab: [
                { title: '报失', value: 1 },
                { title: '招领', value: 2 },
            ],
            lostList: [],
            lostNoticeList: [
                {title: '文件', number: 0},
                {title: '电子产品', number: 0},
                {title: '医疗用品', number: 0},
                {title: '证件', number: 0},
                {title: '背包', number: 0},
                {title: '银行卡', number: 0},
                {title: '现金', number: 0},
                {title: '书籍', number: 0},
                {title: '钥匙', number: 0},
                {title: '手表', number: 0},
                {title: '雨伞', number: 0},
                {title: '水杯', number: 0},
                {title: '其他', number: 0},
            ],
            receivePlace: {},
        }
    },
    created () {
        this.urlQuery = this.$cookies.get('examInfo')
        console.log('urlQuery:', this.urlQuery);
        // console.log('text cookie:', this.$cookies.get('examInfo'));
        // 获取列表信息
        let cutUrl = `/api/lostandfound/getgoodslist?class=1&school_id=${this.urlQuery.school_id}`       //1是报失2是招领
        this.axios.get(cutUrl)
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                console.log(res);
                this.lostList = res.data
            }
        }).catch((err) => {
            this.$notify(res.msg)
        });
        // 获取位置信息
        let locationUrl = `/api/lostandfound/school_lostandfound_location?school_id=${this.urlQuery.school_id}`
        this.axios.get(locationUrl)
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                console.log('位置：', res);
                this.receivePlace = res.data
            }
        }).catch((err) => {
            this.$notify(res.msg)
        });
    },
    methods: {
        cutTab (index, title) {
            console.log('index:', index, 'title:', title);
            console.log('this.lostList: ', this.lostList);
            
            let cutUrl = `/api/lostandfound/getgoodslist?class=${index+1}&school_id=${this.urlQuery.school_id}`
            // let cutUrl = `/api/lostandfound/getgoodsdetail?goods_id=${index+1}`
            this.axios.get(cutUrl)
            .then((res) => {
                res = res.data
                if (res.code === 0) {
                    // 报失和招领返回的数据不一样 0报失 1招领
                    if (index === 0) {
                        console.log('index = 0:', res);
                        this.lostList = res.data
                    }else if (index === 1) {
                        let noticeData = res.data.map
                        console.log('index = 1:', noticeData);
                        this.lostNoticeList.map((item, index) => {
                            // console.log(item, index);
                            item.number = noticeData[index].count
                        })         
                    }
                }
            }).catch((err) => {
                this.$notify(res.msg)
            });
        },
        tabToDetail (id) {
            console.log('lostId:', id);
            this.$router.push({ path: 'lostList/lostDetail', query: {goods_id: id} })
        },
        toPublish () {
            this.$router.push({ path: 'lostList/lostPublish' })
        }
    }
}
</script>

<style lang="stylus" scoped>
.lostListTop {
    height 100vh
    font-size 13px
    color #000
    background-color #f1f1f1
}
.lostTab /deep/.van-tabs__wrap {
    background-color #003366
    height 1.1rem
}
.lostTab /deep/.van-tabs__nav {
    width 40%
}
.lostTab .van-tabs--line {
    padding-top 1.1rem
}
.lostTab /deep/.van-tab {
    line-height 1.1rem
}
// end
.lostEdit {
    position absolute
    top .2rem
    right .5rem
    z-index 999
    background-color #ffffff
    color #369
    padding .15rem .15rem .08rem .2rem
    border-radius .18rem
    font-size 16px
    display flex
    align-items center
}
.lostEdit span {
    display block
    margin-left .1rem
    margin-top -.1rem
    font-size 13px
}
.lostListContent {
    padding .3rem .5rem
    margin-bottom .15rem
    background-color #ffffff
}
.lostListContent p {
    text-align left 
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    margin 0
    color #a1a1a1
}
.lostListContent p:first-child {
    color #000
    margin-bottom .2rem
    font-size 14px
}
.lostListUserInfo {
    color #c3c3c3
    display flex
    justify-content flex-start
    align-items center
    margin-top .25rem
}
.lostListUserInfo .userInfo {
    display flex
    align-items center
}
.lostListUserInfo .userInfo img {
    width .5rem
    height .5rem
    border-radius .5rem
    margin-right .2rem
}
.seatLine {
    height .4rem
    width 1px
    background-color #c3c3c3
    margin 0 .3rem
}
// end
.fontStyle {
    color #003366
    font-weight 600
    text-align left
}
.lostReceive {
    background #ffffff
    margin  0 .5rem
    border-radius .2rem
    padding-bottom .5rem
}
.lostNoticeP {
    background #003366
    color #ffffff
    border-top-left-radius .2rem
    border-top-right-radius .2rem
    height 1.1rem
    line-height 1.1rem
}
.lostGoods, .receivePlace {
    padding 0 .5rem
}
.lostGoods p, .receivePlace p {
    margin .4rem 0
}
.lostGoods ul {
    display flex
    justify-content space-between
    flex-wrap wrap
}
.lostGoods ul li {
    width 30vw
    display flex
    justify-content space-between
    margin .02rem 0
}
.receivePlace div {
    display flex
    flex-direction column
    justify-content flex-start
    margin-top -.1rem
}
.receivePlace span {
    text-align left
    margin .04rem 0
}
</style>
