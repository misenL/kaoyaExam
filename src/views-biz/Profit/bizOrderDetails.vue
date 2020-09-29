<template>
    <div class="bizOrderDetailColor">
        <div class="bizOrderDetailTop">
            <div>
                <van-icon name="underway-o" size=".5rem" />
                <span>{{orderList.use_status===0?'未使用':orderList.use_status===1?'已使用':'已失效'}}</span>
            </div>
            <div class="showDate">
                <span>{{orderList.use_status===0?'失效':orderList.use_status===1?'核销':'失效'}}时间：</span>
                <span>{{orderList.use_status===1?orderList.use_time:orderList.dismiss_time}}</span>
            </div>
        </div>
        <div class="bizOrderDetailCenter">
            <p class="fontColor">商品信息</p>
            <div class="bizInfo">
                <img :src="orderList.img" alt="" srcset="">
                <div class="goodsInfo">
                    <span>{{orderList.item_good_name}}</span>
                    <span v-if="orderList.item_goods" class="fontEllipsis fontColor">{{orderList.item_goods.summary}}</span>
                </div>
                <div class="goodsInfoPrice">
                    <span>￥{{orderList.price}}</span>
                    <span class="fontColor">x{{orderList.num}}</span>
                </div>
            </div>
        </div>
        <div class="bizOrderDetailBotoom">
            <p class="fontColor"><span>订单信息</span></p>
            <ul>
                <li>顾客：</li>
                <li>
                    <img :src="orderList.student_info.headpic" alt="" srcset="">{{orderList.student_info.username}}
                </li>
            </ul>
            <ul>
                <li>适用于：</li>
                <li class="fontEllipsis">
                    {{orderList.biz.examination_info.school_name}}&nbsp;{{orderList.biz.biz_name}}&nbsp;{{orderList.item_goods===null?'':orderList.item_goods.classroom}}
                </li>
            </ul>
            <ul>
                <li>订单编号：</li>
                <li>{{orderList.order_id}}</li>
            </ul>
            <ul>
                <li>交易时间：</li>
                <li>{{orderList.pay_time}}</li>
            </ul>
            <ul>
                <li>订单总额：</li>
                <li>￥{{orderList.amount}}</li>
            </ul>
            <ul>
                <li>支付方式：</li>
                <li>微信支付</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            orderList: {
                biz: {
                    examination_info: {
                        school_id: '',
                        school_name: '',
                    },
                },
                item_goods: {
                    classroom: '',
                    item_good_name: '',
                    service_summary: '',
                    summary: '',
                },
                student_info: {
                    headpic: '',
                    tel: '',
                    username: '',
                }
            }
        }
    },
    created () {
        let query = this.$route.query
        console.log(query);
        let thisUrl = '/api/biz/servicedetail?service_id=' + query.orderId
        this.axios.get(thisUrl)
            .then(res => {
                res = res.data
                if(res.code === 0) {
                    this.orderList = res.data
                    console.log('orderList:', this.orderList);
                } else {
                    this.$notify(res.msg)
                }
            })
            .catch(err => {
                this.$notify('ERR: 获取订单详情失败，请稍后重试！')
            })
    },
    methods: {

    }
}
</script>

<style lang="stylus" scoped>
// 一些复用样式
.bizOrderDetailTop, .bizOrderDetailCenter, .bizOrderDetailBotoom {
    background-color #fff
    color #000
    font-size 12px
}
.fontColor {
    color #afafaf
}
.fontEllipsis {
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
}
// end
.bizOrderDetailColor {
    background-color #f1f1f1
}
.bizOrderDetailTop {
    height 1.8rem
    display flex
    justify-content space-between
    align-items center
    background-color #336699
    color #ffffff
    font-size 14px
}
.bizOrderDetailTop div {
    display flex
    align-items center
    margin 0 .5rem
}
.bizOrderDetailTop .van-icon {
    margin-right .1rem
}
.showDate span {
    height .5rem
    line-height .5rem
}
.showDate span:last-child {
    font-size 12px
}
// end
.bizOrderDetailCenter p {
    text-align left 
    padding-left .5rem
}
.bizInfo {
    display flex
    justify-content space-between
    padding .3rem .5rem
}
.bizInfo img  {
    width 1.5rem
    height 1.5rem
}
.goodsInfo {
    width 55%
    display flex
    flex-direction column
    justify-content space-around
    align-items flex-start
    margin-left -.8rem
}
.goodsInfo span:last-child {
    width 100%
    text-align left
}
.goodsInfoPrice {
    display flex
    flex-direction column
    align-items flex-end
    justify-content space-around
}
// end
.bizOrderDetailBotoom {
    padding .3rem .5rem
    margin-top .1rem
}
.bizOrderDetailBotoom p {
    display flex
    justify-content flex-start
    margin 0 0 .5rem 0
}
.bizOrderDetailBotoom p span {
    display block
    width 1.5rem
    text-align right 
}
.bizOrderDetailBotoom ul {
    display flex
    justify-content space-between
    margin-top .2rem
}
.bizOrderDetailBotoom li {
    text-align right 
}
.bizOrderDetailBotoom li:first-child {
    color #afafaf
    width 1.8rem
}
.bizOrderDetailBotoom img {
    width .4rem
    height .4rem
    margin-right .2rem
    border-radius 1rem
}
</style>

