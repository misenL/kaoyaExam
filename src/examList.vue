<template>
    <div>
        <!-- 考试列表 -->
        <van-cell
        is-link
        @click="showPopup(index)"
        v-for="(item, index) in examList"
        :key="index">
            <div class="item-name">{{item.exam_name}}</div>
            <div class="item-time">
                <img src="./assets/iconfont/time.png" alt="时间：" class="item-icon">
                <span class="item-intro">{{item.start_time}}</span>
            </div>
            <div class="item-location">
                <img src="./assets/iconfont/location.png" alt="地点：" class="item-icon">
                <span class="item-intro">{{item.school_name}}</span>
            </div>
        </van-cell>
        <!-- 底部弹出考试信息 -->
        <van-popup
        v-model="showRecruitPopup"
        position="bottom"
        closeable
        close-icon-position="top-left">
            <div class="popup-div">
                <span>考试名称：</span><span>{{popupName}}</span>
            </div>
            <div class="popup-div">
                <span>考试时间：</span><span>{{popupTime}}</span>
            </div>
            <div class="popup-div">
                <span>考试地点：</span><span>{{popupLoc}}</span>
            </div>
            <div class="popup-div popup-div-center">
                <img src="./assets/iconfont/already.png" alt="" class="popup-icon">
                <span class="popup-text">本场考试已招募人数：</span>
                <span class="popup-text">{{popupText}}</span>
            </div>
            <div class="popup-div popup-div-center">
                <van-button type="info" class="popup-div__btn" @click="enter" :disabled="full">报名</van-button>
            </div>
        </van-popup>
        <!-- 中央弹出报名成功信息 -->
        <van-popup
        v-model="showCenterPopup"
        round
        >
            <div class="success-popup">
                <img :src="centerImg" alt="" class="success-icon">
                <span class="success-hints">{{message}}</span>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 获取用户的id
            userid: '',
            // 获取用户的姓名
            username: '',
            // 某场考试报名人数及总需求人数
            recruitedNumber: '',
            expectNumber: '',
            // 是否已经满人
            full: false,
            // 底部考试信息弹出层应显示的单元的下标及其数据
            popupIndex: 0,
            popupName: '',
            popupTime: '',
            popupLoc: '',
            popupText: '',
            // 底部考试信息弹出层是否展示
            showRecruitPopup: false,
            // 中央弹出层是否显示
            showCenterPopup: false,
            // 中央弹出层图片
            centerImg: '',
            // 中央弹出层文字
            message: '',
            // 静态考试列表（要去除expectNumber和recruitedNumber两个字段，后面再发请求获得它们）
            examList: []
        }
    },
    created () {
        this.axios.get('/api/exam/examlist')
        .then(response => {
            console.log(response)
            let responseData = response.data
            if (!responseData.code) {
                this.examList = responseData.data
            } else {
                this.message = '服务端出错，请重试'
                this.centerImg = require('./assets/iconfont/failure.png')
                this.showCenterPopup = true
            }
        }),
        this.axios.get('/api/getKaoWuUserInfo')
        .then(response => {
            let responseData = response.data
            if (!responseData.code) {
                this.userid = responseData.data.id
                this.username = responseData.data.name
            } else {
                this.message = '服务端出错，请重试'
                this.centerImg = require('./assets/iconfont/failure.png')
                this.showCenterPopup = true
                    }
                })    
        },
    methods: {
        // 弹出弹出层，并发起 get 请求接受三个信息
        // 1. 已招募人数
        // 2. 总人数
        showPopup (index) {
            this.popupIndex = this.examList[index].exam_id
            this.popupName = this.examList[index].exam_name
            this.popupTime = this.examList[index].start_time
            this.popupLoc = this.examList[index].school_name
            let requestUrl = `/api/exam/examinfo?exam_id=${this.popupIndex}`
            this.axios.get(requestUrl)
            .then(response => {
                // 获取返回值中的data，data是真正的返回数据
                let responseData = response.data
                // 如果返回的code是0，说明返回正常
                if (!responseData.code) {
                    // 拼成显示的内容
                    let recruited = responseData.data[0].examInvigilate
                    let expected = responseData.data[0].totalInvigilate
                    this.popupText = `${recruited} / ${expected}`
                    // 判断是否满人
                    if (recruited === expected) this.full = true
                    else this.full = false
                } else {
                    this.message = '服务端繁忙，请重试'
                    this.centerImg = require('./assets/iconfont/failure.png');
                    this.showCenterPopup = true
                }
            })
            .catch(error => {
                // this.showCenterPopup = true
            })
            this.showRecruitPopup = true
        },
        // 点击报名，发起 post 请求
        // 1. 更新招募人数
        enter () {
            let postData = new FormData()
            postData.append('id', this.userid)
            postData.append('name', this.username)
            postData.append('exam_id', this.popupIndex)
            this.axios.post('http://kaoya.huikaoedu.com/api/sign_upkaowu', postData)
            .then(response => {
                console.log(response)
                let responseData = response.data
                if (!responseData.code) {
                    this.message = '报名成功'
                    this.centerImg = require('./assets/iconfont/success.png')
                    this.showCenterPopup = true
                } else {
                    this.message = '报名失败，可能您已报名'
                    this.centerImg = require('./assets/iconfont/failure.png')
                    this.showCenterPopup = true
                }
                this.axios.get(`/api/exam/examinfo?exam_id=${this.popupIndex}`)
                .then(response => {
                    console.log(response)
                    // 获取返回值中的data，data是真正的返回数据
                    let responseData = response.data
                    // 如果返回的code是0，说明返回正常
                    if (!responseData.code) {
                        // 拼成显示的内容
                        let recruited = responseData.data[0].examInvigilate
                        let expected = responseData.data[0].totalInvigilate
                        this.popupText = `${recruited} / ${expected}`
                        // 判断是否满人
                        if (recruited === expected) this.full = true
                        else this.full = false
                    } else {
                        this.message = '服务端繁忙，请重试'
                        this.centerImg = require('./assets/iconfont/success.png')
                        this.showCenterPopup = true
                    }
                })
            })
        }
    },
    computed: {

    },
}
</script>

<style scoped>
    .item-name {
        font-size: .4rem;
        font-weight: 400;
    }

    .item-icon {
        width: .4rem;
        margin-right: .2rem;
        vertical-align: middle;
    }

    .item-intro {
        vertical-align: middle;
    }

    .item-time {
        color: gray;
    }

    .item-location {
        color: gray;
    }

    .van-icon {
        height: 1.92rem;
    }

    .van-icon::before {
        line-height: 1.92rem
    }

    .van-popup {
        padding: 1rem .4rem .6rem;
        text-align: start;
        line-height: .64rem;
        font-size: .42rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .popup-icon {
        width: .64rem;
        height: .64rem;
        vertical-align: middle;
        margin-right: .2rem;
    }

    .popup-text {
        margin: 0;
        vertical-align: middle;
    }
    
    .popup-div {
        margin-left: .4rem;
        margin-top: .4rem;
        display: flex;
        justify-content: flex-start;
    }

    .popup-div-center {
        margin-left: 0;
        justify-content: center;
    }

    .popup-div__btn {
        width: 4rem;
        height: 1.2rem;
    }

    .van-popup--center {
        padding: .4rem .6rem;
        border-radius: .2rem;
    }

    .success-popup {
        width: 6rem;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding-top: .2rem;
    }

    .success-icon {
        width: .6rem;
        height: .6rem;
        margin-right: .4rem;
    }

    .success-hints {
        font-size: .4rem;
        line-height: .6rem;
        display: inline;
        vertical-align: middle;
    }
</style>