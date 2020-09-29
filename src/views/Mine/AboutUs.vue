<template>
    <div>
        <div class="aboutUsTop">
            <img src="../../assets/img/aboutUs.png">
        </div>
        <div class="aboutUsContent">
            <van-tabs 
              v-model="active" 
              swipeable
              animated
              title-active-color="#115dff" 
              color="#115dff">
                <van-tab title="公司介绍">
                    <div class="introContent">
                        <div class="introTitle">公司简介</div>
                        <div class="introCenter">
                            <span>小智助考，隶属于广州智考科技有限公司。我们是一家互联网+教育内容的平台公司，专注于为考生与考点提供优质服务。</span>
                            <span>官方信息发布平台，为考生提供考场查询、校内导航、紧急问题解答等服务，同时提供候考室、文具以及衣食住行等周边服务。</span>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="联系我们">
                    <div class="contactUs">
                        <p>广州智考科技有限公司</p>
                        <ul class="contactUsUl">
                            <li v-for="(item, index) in UsInfo" :key="index">
                                <img :src="item.icon" alt="">
                                <div>
                                    <span>{{item.title}}</span>
                                    <span>{{item.content}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            UsInfo: [
                {
                    title:'联系地址',
                    icon: require('../../assets/img/usLocation.png'),
                    content: '广州市番禺区小谷围街青蓝街26号1403',
                },
                {
                    title:'服务热线',
                    icon: require('../../assets/img/usTel.png'),
                    content: '020-39388233',
                },
                {
                    title:'战略合作',
                    icon: require('../../assets/img/cooperation.png'),
                    content: '1043637453@qq.com',
                },
                {
                    title:'微信服务号',
                    icon: require('../../assets/img/usWechat.png'),
                    content: 'gh_73239932f904',
                },
            ]
        }
    },
    created () {

    },
    methods: {

    }
}
</script>

<style lang="stylus" scoped>

.aboutUsTop img {
    width 100%
    height 26vh
    display block
}
.aboutUsContent {
    background-color #ffffff
    height 74vh
}
.aboutUsContent >>> .van-tabs__wrap {
    border-bottom 1px solid #e3e3e3
    padding-bottom .1rem
    height .9rem
}
.aboutUsContent >>> .van-tab,
.aboutUsContent >>> .van-tab span {
    height .7rem
    line-height 1rem
}
.aboutUsContent >>> .van-tabs__nav--line {
    height .9rem
}
.introContent {
    color #676767
    font-weight 200
    width 78vw
    margin 0 auto
    border 1px solid #e3e3e380
    margin-top .3rem
    border-radius .2rem
    box-shadow 3px 3px 5px #a6c2fd
}
.introTitle {
    background-color #115dff
    color #ffffff
    width 2.6rem
    height .8rem
    line-height .8rem
    font-size 15px
    border-radius .5rem
    box-shadow 3px 3px 5px #a6c2fd
    margin .5rem 0 .4rem -.7rem
}
.introCenter {
    font-size 14px
    padding 0 .5rem
    text-align left
    height 45vh
}
.introCenter span {
    display block
    text-indent .8rem
    line-height .6rem
}
.contactUs {
    color #000000
    font-size 13px
}
.contactUs p {
    font-weight 600
    font-size 16px
    margin .4rem
}
.contactUsUl li {
    display flex
    justify-content flex-start
    align-items center
    width 84vw
    margin auto
    padding .3rem
    border 1px solid #e3e3e380
    border-radius .2rem
    box-shadow 3px 3px 5px #a6c2fd
}
.contactUsUl li+li {
    margin .25rem auto
}
.contactUsUl div {
    display flex
    flex-direction column
    justify-content flex-start
    text-align left
    font-weight 800
}
.contactUsUl img {
    width .8rem
    margin-right .3rem
}
.contactUsUl div span:first-child {
    color #676767
    font-weight 500
    margin-bottom .1rem
}
</style>
