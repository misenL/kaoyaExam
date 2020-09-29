<template>
    <div>
        <div class="confirmJoinContent">
            <img src="./assets/img/confirmJoin.png" alt="" srcset="">
            <p class="fontSize">对方邀请您加入商家</p>
            <p>【考点】：{{school_name}} | 【商家】：{{biz_name}}</p>
            <span>点击下方按钮即可绑定成为员工</span>
        </div>
        <div @click="toRouterProfit" class="confirmJoinBtn">接受邀请</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            joinQuery: '',
            school_name: '',
            biz_name: ''
        }
    },
    created () {
        this.joinQuery = this.$route.query
        console.log('joinQuery:', this.joinQuery);
        this.getExaminfo()
    },
    methods: {
        getExaminfo () {
            let examURL = '/api/biz/info?biz_id=' + this.joinQuery.biz_id;
            let infoURL = '/api/bizuser/info'
            this.axios.get(examURL)
            .then( res => {
                res = res.data
                if (res.code === 0 && res.data !== []) {
                    this.school_name = res.data.examination_info.school_name
                    this.biz_name = res.data.biz_name
                }
            }).catch((err) => {
                this.$notify(res.msg)
            });
            // 判断用户有没有注册
            this.axios.get(infoURL)
            .then(res => {
                res = res.data
                console.log('判断用户有没有注册:', res.data);
                if(res.code === 0) {
                    if (res.data === []) {           // 未注册
                        this.$router.push({ path: `/biz/login`, query: this.joinQuery })
                    }else {
                        this.joinQuery.user_id = res.data.user_info.id
                    }
                }
            }).catch((err) => {
                this.$notify(res.msg)                
            });
        },
        // 接受邀请
        toRouterProfit () {
            let acceptURL = `/api/bizuser/bindbizuser?biz_id=${this.joinQuery.biz_id}&biz_user_id=${this.joinQuery.user_id}`
            console.log('acceptURL:', acceptURL);
            console.log('toRouterProfit:', this.joinQuery);
            this.axios.get(acceptURL)
            .then( res => {
                res = res.data
                console.log(typeof res.code);
                if (res.code === 0 || res.code === '0') {
                    this.$router.push({ path: `/biz/profit?user_id=${this.joinQuery.user_id}&biz_id=${this.joinQuery.biz_id}` })                    
                }else if (res.code === 41001 || res.code === '41001') {
                    alert('网络繁忙,'+res.msg)
                }
            }).catch(err => {
                this.$notify(err)
            });
        }
    }

}
</script>

<style lang="stylus" scoped>
.fontSize {
    font-size 20px
    margin-bottom .3rem
}
.confirmJoinContent {
    font-weight 600
    color #000
    font-size 14px
    margin-top 2rem
}
.confirmJoinContent img {
    width 2rem
    height 2rem
}
.confirmJoinContent span {
    color #afafaf
    font-weight 400
}
.confirmJoinBtn {
    background-color #036
    color #ffffff
    font-size 14px
    width 60%
    height 1rem
    border-radius .16rem
    line-height 1rem
    margin 2.5rem auto
}
</style>
