<template>
  <div class="exam-num">
    <div class="exam-num__top"></div>
    <div class="exam-num__main">
      <ul>
        <li>考点名称：</li>
        <li>{{examInfo.school_name}}</li>
      </ul>
      <ul>
        <li>考试名称：</li>
        <li>{{examInfo.exam_name}}</li>
      </ul>
      <ul class="main__ul-date">
        <li>考试时间：</li>
        <li>{{examInfo.start_time}} ~ {{examInfo.end_time}}</li>
      </ul>
      <ul>
        <li>考场号：</li>
        <li>{{examInfo.exam_room_id}}</li>
      </ul>
    </div>
    <div class="exam-num__footer">
      <span><i>小智助考提醒您：</i></span>
      <p>请记得截图保存哦！并提前一个小时到考务室签到！</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      examInfo: {},
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const query = this.$route.query
      this.axios.get(`/api/getKaoWuUserSignupInfo?exam_id=${query.examid}`).then((result) => {
        this.examInfo = result.data
      })
    }
  },
}
</script>

<style lang="stylus" scope>
.exam-num {
  font-size 16px
  --exam-argin 8vw
  --exam-border-radius 9px
  --exam-green #1cb737
}
.exam-num__top {
  background var(--exam-green)
  height 8vh
  margin 10vh var(--exam-argin) 0
  border-top-left-radius var(--exam-border-radius)
  border-top-right-radius var(--exam-border-radius)
}
.exam-num__main {
  margin 0 var(--exam-argin)
  padding 3vh 0 2vw 2vh
  border 1px solid var(--exam-green)
}
.exam-num__main ul {
  display flex
  justify-content flex-start
  margin 1vh 0
}
.main__ul-date {
  display flex
  flex-direction column
  align-items flex-start
}
.main__ul-date li:last-child {
  margin-top .5vh
}
.exam-num__main li:last-child {
  font-weight 600
}
.exam-num__footer {
  margin 10vh 5vw
}
.exam-num__footer span,
.exam-num__footer p {
  display block
  margin 0
  text-align left 
  font-size 14px
}
.exam-num__footer p {
  margin-top 1vh
  color red
}
</style>