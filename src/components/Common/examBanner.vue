<!-- 服务和导航顶部的banner -->
<template>
  <div class="container clearfix">
		<div class="left fl-left">
			<span class="text school"><font>【考点】：</font><b>{{ examInfo.school_name }}</b></span>
			<span class="text exam"><font>【考试】：</font><b>{{ examInfo.exam_name }}</b></span>
			<span class="text building"><font>【楼栋】：</font><b>{{ examInfo.building }}</b></span>
		</div>
		<div class="right">
			<span class="exchange" @click="changeExam">[切换]</span>
		</div>
  </div>

</template>

<script>

export default {
	name: 'ExamBanner',
	props: {
		examInfo: {
			type: Object,
			default: function () {
				return {
					school_name: '华南理工大学',
					building: 'A1教学楼203室',
					exam_name: '注册会计师考试'
				}
			}
		}
	},
  created () {
  },
  components: {
  },
  data () {
    return {

    }
  },
  methods: {
		changeExam () {
			let cookiesExamInfo = this.$cookies.get('examInfo');
			console.log('cookiesExamInfo:', cookiesExamInfo);
			this.$router.push({ path: `/choice?school_id=${cookiesExamInfo.school_id }&school_name=${cookiesExamInfo.school_name}&exam_id=${cookiesExamInfo.exam_id}&exam_name=${cookiesExamInfo.exam_name}`})      
		}
  }
}
</script>

<style scoped lang="stylus">
.container
	border-bottom .1rem solid #f1f1f1
	.left
		width 8rem
		padding 0 .2rem
		font-size 13px
		font
			color red
		span.text
			display block
			height .5rem
			margin .16rem 0
			text-align left
			overflow hidden
	.right
		margin-left 8.4rem
		.exchange
			display inline-block
			width 100%
			line-height 2rem
			color red
			font-size $font-size-normal
</style>
