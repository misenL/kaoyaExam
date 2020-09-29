<template>
    <div class="aroundPage">
        <div class="aroundNotice">
            <!-- <van-notice-bar
              color="#1989fa"
              background="#d0f0ff"
              left-icon="volume-o">
                {{noticeContent}}
            </van-notice-bar> -->
        </div>
        <div class="aroundExam">
            <p><span>【考场】：</span><span>{{schoold}}</span></p>
            <p><span>【考试】：</span><span>{{exam}}</span></p>
        </div>
        <div class="searceInfo">
            <van-cell-group>
                <van-field v-model="inputValue" input-align="center" placeholder="请输入你的考场号查询" />
            </van-cell-group>
            <van-button type="info" size="small" @click="queryExam">查询</van-button>
        </div>
        <!-- 分情况显示 -->
        <div class="infoContainer" v-if="showInfo">
            <p>查询结果：{{searceRes}}</p>
            <!-- <div class="imgDiv" @click="showPreImg">
                <img class="examRoomImg" :src="roomImg" alt="">
            </div> -->
        </div>
        <div class="onSearce" v-else>
            <img class="onSearce" src="../assets/img/noSearce.png" alt="">
            <p v-if="noInfo">很抱歉，暂无查询结果！</p>
            <p v-else>请输入你的考场号查询</p>
        </div>
        <!-- 导航按钮 -->
        <div class="goPlace" @click="goThis">
            <img src="../assets/img/goPlace.png">
            <span>去这里</span>
        </div>
        <!-- 图片预览 -->
        <van-image-preview
          v-model="showImg"
          @click="previewImg"
          :max-zoom="3"
          :min-zoom="1/3"
          :images="images"
          >
        </van-image-preview>    
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 考场信息
            noticeContent: '候考室指定地点： A1栋二楼201课室~清爽复习，考生必备！',
            schoold: '',
            exam: '',

            inputValue: '',
            searceRes: '311考场对应201课室',         // 查询结果
            roomImg: 'http://kaoya.huikaoedu.com/imgstorage/20190719/5d318689859f3.jpg',
            showImg: false,             // 图片预览
            images: ['http://kaoya.huikaoedu.com/imgstorage/20190719/5d318689859f3.jpg'],
            showInfo: false,             // 显示查询信息，true是有，false是没有
            noInfo: false,                // p标签显示对应信息
            examInfo: null,
        }
    },
    created() {
        this.examInfo = this.$cookies.get('examInfo');
        this.schoold = this.examInfo.school_name;
        this.exam = this.examInfo.exam_name;
        console.log('this.examInfo', this.examInfo);
    },
    methods: {
        // 图片预览
        showPreImg () {
            this.showImg = true
        },
        // 导航
        goThis () {
            location.href = '/exam'
        },
        // 关闭图片预览
        previewImg () {
            console.log('preview');
            
        },
        // 查询
        queryExam () {
            if (this.inputValue !== '') {
                let queryUrl = `/api/exam/examroominfo?school_id=${this.examInfo.school_id}&exam_id=${this.examInfo.exam_id}&exam_room_id=${this.inputValue}`
                // let queryUrl = `/api/exam/examroominfo?school_id=${this.examInfo.school_id}&exam_id=48&exam_room_id=${this.inputValue}`
                this.axios.get(queryUrl)
                .then((result) => {
                    console.log('result.data.code', result.data.code);
                    // if (result.data.code === 0 && result.data.data[0] !== undefined) {
                    //     console.log('result.data.data', result.data.data);
                    //     this.roomImg = result.data.data[0].picture
                    //     this.images = [result.data.data[0].picture]
                    if (result.data.code === 0) {           // 去掉图片
                        console.log('result.data.data', result.data.data);
                        this.searceRes = `${this.inputValue}考场对应${result.data.data.classroom}课室`
                        this.noInfo = false
                        this.showInfo = true
                    }else if (result.data.code == 50001 || result.data.data[0] === undefined) {
                        this.showInfo = false
                        this.noInfo = true              // 暂无考场信息
                    }
                    
                }).catch((err) => {
                    this.$message.error('网络超时，请刷新重试');
                });
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
.aroundPage {
    font-size 14px
    height 100vh 
    background-color #ffffff
}
.aroundNotice {
    width 94vw
    height .8rem
    margin-left 3vw
    border-radius .2rem
    padding-top .2rem
    margin-bottom .3rem
}
.aroundNotice .van-notice-bar {
    border-radius .2rem
    height .8rem
}
.aroundExam p {
    text-align left 
    margin .2rem 0
}
.aroundExam p span:first-child {
    color #797979
    margin-left .4rem
}
.aroundExam p span:last-child {
    font-weight 600
}
.searceInfo {
    padding-top .3rem
}
.searceInfo .van-cell-group {
    width 7rem
    margin 0 auto
    border-radius .5rem
    box-shadow 1px 1px 10px #d3d3d3
    margin-bottom .3rem
}
.searceInfo .van-cell {
    border-radius .5rem
    line-height .4rem
    padding .2rem .4rem
}
.van-hairline--top-bottom::after {
    border none
}
.imgDiv {
    // border 1px solid #e3e3e3
    box-shadow 1px 1px 10px #d3d3d3
    border-radius .2rem
    width 80vw
    height 82vw
    margin .5rem auto 0
}
.searceInfo .van-button {
    width 3rem
    border-radius .2rem
    background-color #0b52e4
}
.infoContainer p {
    margin-top .2rem
    color #ff0000
    font-weight 600
}
.examRoomImg {
    width 76vw
    height 76vw
    margin-top 2vw
}
.goPlace {
    position absolute
    bottom .5rem
    right .5rem
    height 1.6rem
    width 1.6rem
    border-radius 2rem
    display flex
    flex-direction column
    justify-content center
    align-items center
    background-color #0b52e4
    color #ffffff
    font-size 12px
    box-shadow 2px 2px 8px #b3b3b3
}
.goPlace img {
    width .5rem
    margin-bottom .06rem
}
.onSearce img {
    width 3rem
    margin-top 2rem
}
.onSearce p {
    margin-top 0
    color #797979
}
</style>