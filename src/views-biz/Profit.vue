<template>
    <div class="parentDiv">
        <div class="profitTop" v-if="userInfo">
            <div class="profitUserContent">
                <div class="profitUserInfo">
                    <img :src="userInfo.headpic" alt="" srcset="">
                    <div class="userInfo">
                        <div>
                            <span class="userPosition">{{userInfo.position===1?'老板':'员工'}}</span>
                            <span class="userName">{{userInfo.username}}</span>
                        </div>
                        <!-- <div class="addDate">加入日期：{{userInfo.addDate}}</div> -->
                        <div class="addDate">{{userInfo.addDate}}</div>
                    </div>
                </div>
                <span class="invite" @click="invitedQR">邀请成员 +</span>
            </div>
        </div>
        <div class="profitExam">
            <div class="profitExamContent">
                <ul>
                    <li>【考点】：</li>
                    <li>{{profitExam.school}}</li>
                </ul>
                <ul>
                    <li>【商家】：</li>
                    <li>{{profitExam.biz}}</li>
                </ul>
            </div>
            <p @click="changeInfo"></p>
            <p @click="changeInfo">[切换]</p>
        </div>
        <div class="profitDiv" @click="toMyProfit">
            <div class="addProfit">
                <span>累计收益</span>
                <span>{{addProfit.toFixed(2)}}</span>
            </div>
            <div class="profitLine"></div>
            <div class="todayProfit">
                <span>今日收益</span>
                <span>{{todayProfit.toFixed(2)}}</span>
            </div>
        </div>
        <div class="bottomImg">
            <span>
                <router-link to="/biz/verify">
                    <img src="../assets/img/scan.png" alt="">
                    <p>扫码核销</p>
                </router-link>
            </span>
            <span>
                <!-- <router-link to="/biz/order/record"> -->
                <div @click="toList">
                    <img class="iconPositon" src="../assets/img/list.png" alt="">
                    <p>订单列表</p>
                </div>
            </span>
            <span v-if="userInfo.position===1">
                <router-link to="/biz/cash">
                    <img src="../assets/img/cash.png" alt="">
                    <p>申请提现</p>
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data () {
		return {
            userInfo: {
                img: '',
                name: '',
                position: '',               // 1是老板2是员工
                addDate: ''
            },
            profitExam: {
                school: '',
                biz: ''
            },
            addProfit: 0.00,
            todayProfit: 0.00,
            scanImg: '',
            listImg: '',
            cashImg: '',
            getuserInfo: {},
            biz_id: 0,           //传给订单列表的商家id
        }
    },
	created () {
        let profitQuery = this.$route.query
        console.log('profitQuery:', profitQuery.biz_id);
        this.axios.get('/api/bizuser/info')
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                this.getuserInfo = res.data
                let biz_id_index = 0
                // 确认该商家在biz_info里的位置
                if (profitQuery.biz_id !== undefined) {             // 如果路由有这个参数
                    this.biz_id = profitQuery.biz_id
                    // 存cookies
                    this.$cookies.set('biz_id', this.biz_id, -1)
                }else {
                    if (this.$cookies.get('biz_id') !== null) {         // 如果cookies有这个东西
                        this.biz_id = this.$cookies.get('biz_id')
                        console.log('this.$cookies.get:', this.$cookies.get('biz_id'));
                    }else {                     // 如果初次进来没有商家选择
                        biz_id_index = 0
                        this.biz_id = this.getuserInfo.biz_info[0].biz_id
                    }
                }
                console.log('this.$cookies:', this.$cookies.get('biz_id'));
                this.getuserInfo.biz_info.map((item, index) => {
                    if (item.biz_id == this.biz_id) {
                        biz_id_index = index
                    }
                })
                console.log('biz_id:', this.biz_id);
                this.userInfo = this.getuserInfo.user_info
                console.log('this.userInfo:', this.userInfo);
                
                this.userInfo.position = this.getuserInfo.biz_staff[biz_id_index].type
                this.addProfit = parseFloat(this.getuserInfo.biz_info[biz_id_index].incomesum)
                this.todayProfit = parseFloat(this.getuserInfo.biz_info[biz_id_index].todayincome)
                this.profitExam.school = this.getuserInfo.biz_staff[biz_id_index].biz.examination_info.school_name
                this.profitExam.biz = this.getuserInfo.biz_info[biz_id_index].biz.biz_name
            }
        })
        .catch((err) => {
            console.log(err);
        });
        
	},
    methods: {
        changeInfo () {
            console.log('changeInfo');
            // this.$router.push({ path: '/biz/profit/choiceBiz' })
            location.href = '/choiceBiz'
        },
        invitedQR () {
            this.$router.push({ path: `/biz/profit/invitedQR?biz_id=${this.biz_id}` })
        },
        toMyProfit () {
            this.$router.push({ path: `/biz/profit/myProfit?biz_id=${this.biz_id}` })
        },
        toList () {
            console.log('toList');
            this.$router.push({ path: `/biz/order/record?biz_id=${this.biz_id}` })            
        }
    },
	// computed: {
    //     // 有时候用户直接刷新mine页面，获取用户信息的代码放在APP.vue 中
    //     // 为了保证获取用户信息时app 已经获取用户数据，两个组件需要进行沟通
    //     ...mapState(['gotUserInfoFlag']),
	// },
    // watch: {
    //     gotUserInfoFlag: function (newV, oldV) {
    //         if (newV) {
    //             this.getuserInfo = this.$store.getters.userInfo
    //                 // console.log(this.userInfo)
    //                 this.getProfit()
    //         }
    //     }
    // }
}
</script>

<style lang="stylus" scoped>
.parentDiv {
    background-color #f2f2f2
    // background-color blue
    position absolute
    width 100%
    top 0
    bottom 0
    color #000
}
.profitExam {
    background-color white
}
a {
    color #000000!important
}
// end
.profitTop {
    background-color #336699
    height 3.5rem
}
.profitUserContent {
    width 86%
    height 2.8rem
    background-color #ebf7fe
    font-size 14px
    border-radius .2rem
    position absolute
    margin-left 7%
    margin-top 1rem
    padding .3rem 0 .5rem 0
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    box-shadow 1px 2px 6px #999
}
.profitUserInfo {
    display flex
    justify-content flex-start
    width 86%
}
.profitUserInfo img {
    width 1.4rem
    height 1.4rem
    border-radius .8rem
}
.userInfo {
    margin-left .5rem
    display flex
    flex-direction column
    justify-content space-around
}
.userInfo div:first-child {
    display flex
    justify-content flex-start
}
.userPosition {
    background-color #FF6600
    border-radius .1rem
    color white
    padding 0 .1rem .04rem .1rem
    margin-right .2rem
    font-size 12px
}
.addDate {
    color #2c3e50
}
.invite {
    background-color #003366
    width 70%
    height .66rem
    line-height .66rem
    color white
    border-radius .1rem
}
// end
.profitExam {
    display flex
    justify-content space-around
    align-items center
    padding-bottom .1rem
}
.profitExam p {
    color red
    font-size 14px
    margin-top 1.5rem
    margin-right .12rem
}
.profitExamContent {
    font-size 14px
    font-weight 900
    padding-top 1.6rem
    width 65%
}
.profitExamContent ul {
    display flex
    justify-content flex-start
    margin-bottom .2rem
}
.profitExamContent ul li:first-child {
    color #999
    font-weight 500
    white-space nowrap
}
.profitExamContent ul li:last-child {
    text-align left 
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    height 18px
}
// end
.profitDiv {
    display flex
    justify-content space-around
    align-items center
    background-color white
    margin-top .25rem
}
.profitDiv div {
    height 2.4rem
    display flex
    flex-direction column
    justify-content center
    align-items center
}
.addProfit {
    margin-left .4rem
}
.todayProfit {
    margin-right .4rem
}
.profitLine {
    width 1px
    height 1.3rem!important
    background-color #d4d4d4
}
.profitDiv span:first-child {
    font-size 14px
    margin-top .1rem
}
.profitDiv span:last-child {
    font-size 24px
    font-weight 800
    margin .08rem 0 .1rem 0
}
// end
.bottomImg {
    height 5.2rem
    margin-top .25rem
    padding-top .5rem
    background-color white
    display flex
    justify-content space-around
    align-items flex-start
}
.bottomImg p {
    font-size 14px
    margin-top 0
}
.bottomImg a:link {
    color #000
}
// 产品给的icon有问题，只能这样调整位置
.iconPositon {
    margin-bottom -6px
}
</style>
