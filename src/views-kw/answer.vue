<template>
  <div>
    <!-- 答题界面 -->
    <div class="answer" v-if="showView === 0">
      <van-row type="flex" class="answer__top">
        <span>第 <i>{{ansNumber}}/{{ansTotal}}</i> 题</span>
      </van-row>
      <van-row type="flex" class="answer__Type">
        <span><b>{{quesType}}</b></span>
      </van-row>
      <main class="answer__main answer__main_danxuan" v-if="quesType === '单选题'">
        <div class="main__title">{{oneQues.title}}</div>
        <div>
          <van-radio-group v-model="quesRadio">
            <van-radio name="A" @click="quesRadio='A'">A. {{oneQues.answer_a}}</van-radio>
            <van-radio name="B" @click="quesRadio='B'">B. {{oneQues.answer_b}}</van-radio>
            <van-radio name="C" @click="quesRadio='C'">C. {{oneQues.answer_c}}</van-radio>
            <van-radio name="D" @click="quesRadio='D'">D. {{oneQues.answer_d}}</van-radio>
          </van-radio-group>
        </div>
      </main>
      <main class="answer__main answer__main_panduan" v-else>
        <div class="main__title">{{oneQues.title}}</div>
        <div>
          <van-radio-group v-model="quesRadio">
            <van-radio name="正确" @click="quesRadio='正确'"><van-icon name="success" /></van-radio>
            <van-radio name="错误" @click="quesRadio='错误'"><van-icon name="cross" /></van-radio>
          </van-radio-group>
        </div>
      </main>
      <van-row class="answer__button">
        <van-button type="primary" @click="quesSwitchFun" :disabled="quesRadio === ''?true: false">{{butTips}}</van-button>
      </van-row>
    </div>
    <!-- 全部正确显示的界面 -->
    <div class="answer answer__success" v-else-if="showView === 1">
      <van-row type="flex" class="answer__top">
        <span>查看结果</span>
      </van-row>
      <p>恭喜你全部回答正确！</p>
      <p>点击下方按钮查看监考考场号</p>
      <van-icon name="checked" color="#32c732" size="60px" />
      <van-row class="answer__button">
        <van-button type="primary" @click="seeExamNumber" >查看考场号</van-button>
      </van-row>
    </div>
    <!-- 错误答题显示的界面 -->
    <div class="answer" v-else>
      <van-row type="flex" class="answer__top">
        <span>查看结果</span>
      </van-row>
      <div class="answer__error-tips">
        <van-row>
          <van-col>本次培训你</van-col>
        </van-row>
        <van-row>
          <van-col>回答正确了：<font color="green">{{rightNumber}}</font> 题</van-col>
          <van-col offset="2">回答错误了：<font color="red">{{errorNumber}}</font> 题</van-col>
        </van-row>
        <van-row style="padding-top: .2rem">
          <!-- <van-col>请认真查看错题解析后<font style="font-weight: 500; font-size: 16px" color="red">重新回答错题</font>：</van-col> -->
          <van-col>请认真查看错题解析：</van-col>        
        </van-row>
      </div>
      <div class="answer__analysis">
        <van-row class="analysis__title">{{oneQues.title}}</van-row>
        <van-row style="color: green">解析：</van-row>
        <van-row class="analysis__content">{{oneQues.analysis}}</van-row>
      </div>
      <van-row class="answer__button">
        <van-button type="primary" @click="quesSwitchFun">{{butAnswer}}</van-button>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant';
export default {
  data() {
    return {
      ansNumber: 0,                     // 当前第几题
      ansTotal: 1,                      // 总的题目数量
      quesType: '单选题',                // 题型
      quesContent: '问题的内容',         // 题目
      quesRadio: '',                    // 当前选项
      quesOption: [],                   // 选项组
      totalContent: {},                 // 所有内容
      oneQues: {},                      // 一道题目的内容
      butTips: '下一题',                 // 按钮的提示文字
      butAnswer: '下一题',               // 查看解析的按钮文字
      rightNumber: 0,                   // 正确题数
      errorNumber: 0,                   // 错误题数
      errorArrDX: [],                   // 存放错题单选
      errorArrPD: [],                   // 存放错题判断
      showView: 0,                      // 切换不同界面 0:初始界面；1：全部回答正确界面；2：错题解析界面
      examid: 0,                        // 对应的考试id
    }
  },
  created() {
    this.examid = this.$route.query.exam_id
    console.log('this.examid', this.examid);
    this.axios.get(`/api/getKaoWuUserSignupInfo?exam_id=${this.examid}`).then((result) => {
      if (result.data.status == '2') {      // 已经培训了
        this.$router.push({ path: `/invigilator/seeExamNum`, query: {examid: this.examid}})
      }else {
        this.axios.get(`/api/exercise/${this.examid}`).then((result) => {
          if (result.data.code == 0) {
            this.totalContent = result.data.data[0]
            this.ansTotal = this.totalContent.questions_danxuan.length + this.totalContent.questions_panduan.length
            this.quesSwitchFun()
          }else {
            this.errorNotify('网络错误，请退出重试！')
          }
        })
      }
    })
  },
  methods: {
    // 题目切换
    quesSwitchFun() {
      this.quesRadio !==''? this.judgeQues(this.oneQues, this.quesRadio): ''        // 想做异步所以把数值传过去
      const dxLength = this.totalContent.questions_danxuan.length
      if (this.ansNumber < dxLength) {
        this.oneQues = this.totalContent.questions_danxuan[this.ansNumber]
      }else {
        if (this.ansNumber === this.ansTotal-1) {       // 都做完了显示
          if (this.showView === 2) {         // 错题查看解析的逻辑
            this.butAnswer = '查看考场号'
          }else {                           // 否则就是正常答题逻辑
            this.butTips = '查看结果'
          }
        }else if (this.ansNumber === this.ansTotal) {     // 
          if (this.showView === 2) {         // 错题查看解析的逻辑
            this.seeExamNumber()
            return      
          }
          this.checkRes()
          return
        }
        this.quesType = '判断题'
        this.oneQues = this.totalContent.questions_panduan[this.ansNumber - dxLength]
      }
      console.log('this.oneQues', this.ansNumber, this.ansTotal, this.quesRadio, this.oneQues);
      this.ansNumber += 1
      this.quesRadio = ''
    },
    // 判断回答是否正确
    judgeQues(arr, str) {
      if (str === arr.answer) {
        this.rightNumber += 1
      }else {
        this.errorNumber += 1
        arr.type ===1? this.errorArrDX.push(arr): this.errorArrPD.push(arr)
      }
      console.log('judgeQues', arr, str, this.rightNumber, this.errorNumber, this.errorArrDX, this.errorArrPD);
    },
    // 查看结果
    checkRes() {
      console.log('checkRes');
      if (this.errorNumber === 0) {
        // 全部回答正确
        this.showView = 1
      }else {
        // 回答错误
        this.totalContent.questions_danxuan = this.errorArrDX
        this.totalContent.questions_panduan = this.errorArrPD
        this.ansTotal = this.errorNumber
        this.ansNumber = 0
        this.quesRadio = ''
        this.quesSwitchFun()
        this.showView = 2
      }
    },
    // 查看考场号
    seeExamNumber() {
      const openid = this.$cookies.get('openid')
      const examid = this.examid
      // this.$router.push({ path: `/invigilator/seeExamNum?openid=${openid}&examid=${examid}`})
      this.axios.get(`/api/getexerciseresult?exam_id=${examid}&status=2`).then((result) => {
        this.$router.push({ path: `/invigilator/seeExamNum`, query: {openid: openid, examid: examid}})
      })
    },
    // 错误提示
    errorNotify(str) {
      Notify({ type: 'danger', message: str });
    },
    // 成功提示
    successNotify(str) {
      Notify({ type: 'success', message: str });
    }
  },
}
</script>

<style lang="stylus" scope>
.answer {
  --mainWidth: 78vw;
  padding 0 .5rem
  display flex
  flex-direction column
  align-items center
}
.answer div {
  text-align left
  font-size 16px
}
.answer__top {
  color white
  width 28vw
  height 7vh
  display flex
  justify-content center
  align-items center
  border-radius 2px
  background linear-gradient(#13f1e7, #7c90f3)
  text-shadow 0 2px 2px grey 
  box-shadow -5px -1px 3px #068494
}
.answer__Type {
  margin-right auto
  padding .3rem 0
}
.answer__main {
  width var(--mainWidth)
}
.answer__main .van-radio {
  padding .34rem 0 .34rem .2rem;
  border 1px solid #e3e3e3
  border-radius 1rem
  box-shadow 1px 2px 3px #e3e3e3
  margin-top .3rem
}
.main__title,
.analysis__content {
  text-indent 28px
}
.answer__button {
  margin-top .6rem
}
.answer__button button {
  height 1.2rem
  line-height 1.2rem
  width 40vw
  border-radius 4px
}
// 成功的界面部分样式
.answer__success .answer__top {
  margin-bottom .5rem
}
.answer__success p {
  color black
  font-size 20px
  margin .3rem 0 0
}
.answer__success .van-icon {
  margin-top .5rem
}
// 错误的界面部分样式
.answer__error-tips {
  width var(--mainWidth)
  padding .5rem 0 0
}
.answer__error-tips font {
  font-weight 600
  font-size 20px
}
.answer__analysis {
  width var(--mainWidth)
  border 1px solid red
  border-radius 8px
  margin-top .5rem
  padding .3rem .2rem .5rem
}
.analysis__content {
  color red
}
</style>