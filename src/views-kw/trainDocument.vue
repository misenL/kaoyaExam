<template>
  <div>
    <main v-html="msg"></main>
    <footer>
      <van-button type="primary" @click="goAnswer" >开始答题</van-button>
    </footer>
  </div>
</template>

<script>
import { Notify } from 'vant';

export default {
  data() {
    return {
      msg: '',              // 培训文档内容
      exam_id: '',
    }
  },
  created() {
    this.getMsg()
  },
  methods: {
    getMsg() {
      this.exam_id = this.$route.query.exam_id
      console.log('trainDocument', this.exam_id);
      this.axios.get(`api/exam/examinfo?exam_id=${this.exam_id}`).then((result) => {
        console.log(result);
        if (result.data.code === 0) {
          this.msg = result.data.data[0].kaowu_text
        }
      }).catch((err) => {
        Notify({ type: 'danger', message: '网络错误，请刷新重试！' });
      });
    },
    goAnswer() {
      this.$router.push({path: '/invigilator/answer', query: {exam_id: this.exam_id}})
    }
  },
}
</script>

<style lang="stylus" scope>
@import "~vue2-editor/dist/vue2-editor.css";
/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';

p {
  margin 0
}
footer {
  margin 1rem 0 .5rem
}
footer button {
  height 1.2rem
  line-height 1.2rem
  width 40vw
  border-radius 4px
}

</style>