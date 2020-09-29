<template>
    <div class="cashParent">
        <div class="cashTop">
            <span>提现到：</span>
            <span class="fontColorGray">
                微信钱包
                <img src="../../assets/img/wechat.png" alt="" srcset="">
            </span>
        </div>
        <div class="cashCenter">
            <p>提现金额：</p>
            <div class="cashMoneyInput">
                <span>￥</span>
                <van-field
                    readonly
                    clickable
                    :value="money"
                    @touchstart.native.stop="keyboardShow = true"
                />                
                <img @click="emptyMoney" src="../../assets/img/close.png" alt="" srcset="">
            </div>
            <p class="fontColorGray">
                可提现金额&nbsp;￥{{allMoney}}&nbsp;&nbsp;
                <span @click="allCash">全部提现</span>
            </p>
        </div>
        <el-button @click="elBtn" class="elBtn" type="primary" round>申请提现</el-button>
        <p @click="recordRouter" class="cashRecord">提现记录</p>
        <!-- mask -->
        <div class="cashMask" v-if="showMask">
            <div class="maskContent">
                <img src="../../assets/img/moneyApply.png" alt="">
                <span class="maskFirst">提现申请发起成功</span>
                <span class="maskLast">提现 {{money}} 元，预计3个工作日内到账</span>
                <div @click="IKonw" class="iKnow">知道了</div>
            </div>
        </div>
        <!-- vant自定义键盘 -->
        <van-number-keyboard
            :show="keyboardShow"
            v-model="money"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @blur="keyboardShow = false"
            @input="keyboardInput"
            @delete="keyboardShowdelete"
        />    
    </div>
</template>

<script>
export default {
    data () {
        return {
            allMoney: 5555,
            money: '',
            checkMoney: '',
            banInput: false,            // 当出现两个小数点就禁止输入
            showMask: false,
            count: 0,
            keyboardShow: false
        }
    },
    created () {
        // let userInfo = this.$store.getters.userInfo
        // let left = userInfo.user_info.balance
        // console.log(left);
    },
    watch: {
        money (val) {
            console.log('wacth:', parseFloat(this.money));
            if (val !== '' && val !== null) {                
                let strArr = val.toString().split('.');      //.号出现,切字符串
                console.log('if solit.', strArr);
                if ( strArr.length>2 ) {
                    this.money = this.checkMoney
                }
                if (this.money.split('.').length>1) {
                    if (this.money.split('.')[1].length>=2) {
                        this.money = this.checkMoney
                    }
                }
            }
            if (parseFloat(this.money) >= this.allMoney) {
                this.money = this.checkMoney = this.allMoney.toString()
                console.log('val111:', this.money);
            }
        }
    },
    methods: {
        allCash () {
            console.log('allCash money:', this.money);
            this.money = this.allMoney.toString()
        },
        emptyMoney () {
            console.log('emptyMoney');
            this.money = '';
            this.checkMoney = ''
        },
        keyboardInput (val) {
            if (!this.banInput) {
                this.checkMoney += val
            }
            if (this.checkMoney.split('.').length>1) {
                if (this.checkMoney.split('.')[1].length>=2) {
                    this.banInput = true
                }
            }
            console.log('keyboardInput:',this.checkMoney );
        },
        keyboardShowdelete () {
            this.checkMoney = this.checkMoney.substr(0, this.checkMoney.length-1)
            this.banInput = false
        },
        recordRouter () {
            console.log('recordRouter');
            this.$router.push({ path: `/biz/cashlist` })
        },
        elBtn () {
            console.log('elBtn');
            if (this.money !== null && this.money !== '') {
                this.showMask = true      
            }else {
                this.$refs.inputMoney.focus()
            }
        },
        IKonw () {
            console.log('IKonw');
            this.showMask = false                
        },
    },
}
</script>

<style lang="stylus" scoped>
.cashParent {
    width 100%
    height 98vh
    padding-top 2vh
    background-color #f1f1f1
    font-size 12px
}
.cashTop, .cashCenter {
    background-color #ffffff
    padding 0 .5rem
}
.fontColorGray {
    color #afafaf
}
// end
.cashTop {
    display flex
    justify-content space-between
}
.cashTop span {
    height 1rem
    line-height 1rem
    display flex
    align-items center
}
.cashTop img {
    width .5rem
    height .5rem
    margin-left .2rem
}
.cashCenter {
    margin-top .24rem
}
.cashCenter p {
    text-align left 
    font-size 13px
    margin 0
    padding .22rem 0
}
.cashCenter p span {
    color #4995e4
}
.cashCenter img {
    width .4rem 
    height .4rem
}
.cashMoneyInput {
    display flex
    justify-content flex-start
    align-items center
    font-size 24px
    font-weight 800
}
.cashMoneyInput .van-cell {
    height 1.1rem
    font-size 28px
    font-weight 500
    border none
    width 70% 
    padding .15rem
}
.cashMoneyInput img {
    margin-left auto
}
.elBtn {
    width 6rem
    height 1.1rem
    background-color #004994
    border-color #004994
    letter-spacing .05rem
    margin-top .8rem
}
.cashRecord {
    position absolute
    bottom .2rem
    width 100%
    text-align center
    color #4995e4
}
// mask
.cashMask {
    position absolute
    top 0
    width 100%
    height 100vh
    background-color #00000080
    // display none 
}
.maskContent {
    background #ffffff
    border-radius .2rem
    width 70%
    margin 2.5rem auto 0
    display flex
    flex-direction column
    justify-content center
    align-items center
}
.maskContent img {
    width 2rem
    height 2rem
    margin .6rem 0
}
.maskFirst {
    font-weight 800
    font-size 16px
    margin-bottom .3rem
}
.maskLast {
    color #afafaf
    margin-bottom .8rem
}
.iKnow {
    background-color #004994
    color #ffffff
    line-height .8rem
    width 60%
    height .8rem
    border-radius .8rem
    margin-bottom .8rem
}
</style>

