<template>
    <div class="QRcode">
        <span>员工注册二维码</span>
        <span>扫描以下二维码，即可邀请您的团队成员参与核销商品</span>
        <img :src='"data:image/png;base64,"+QRimg' alt="" srcset="">
    </div>
</template>

<script>
export default {
    data () {
        return {
            QRimg: ''
        }
    },
    created() {
        let getBizId = this.$route.query
        console.log('getuserInfo:', getBizId);
        
        // console.log('getuserInfo.biz_info[0].biz_id:', getuserInfo.biz_info[0].biz_id);
        this.axios.get(`/api/biz/createstaff?bizid=${getBizId.biz_id}`)
            .then((res) => {
                res = res.data
                if (res.code === 0) {
                    console.log(res);
                    this.QRimg = res.data
                }else {
                    this.$notify(res.msg)
                }
            })
            .catch((err) => {
                this.$notify(res.msg)                
            });
    },
}
</script>

<style lang="stylus" scoped>
.QRcode {
    display flex
    flex-direction column
    justify-content center
    align-items center
    padding-top .5rem
}
.QRcode span {
    color #999
    font-size 13px
    margin .5rem 0 0
}
.QRcode span:first-child {
    font-weight 600
    font-size 14px
    color #000
}
.QRcode img {
    margin-top .8rem
}
</style>
