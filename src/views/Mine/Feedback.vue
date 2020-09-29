<template>
  <div class="container">
    <van-field class="van-field" type="textarea" rows="6" v-model="text" placeholder="描述您遇到的问题..." />

    <div class="img-list" >
      <van-uploader 
        accept="image/gif, image/jpeg, image/png" 
        multiple class="uploader"
        :after-read="afterRead(1)"
      >
				<div class="add">+</div>
				<div class="upload">上传图片</div>
      </van-uploader>

      <div class="img" v-for="(item,index) in fileList" :key="index">
        <van-icon name="cross" @click="delFile(index)"></van-icon>
        <img class="del-img" slot="icon" :src="item.content">
      </div>
    </div>

    <van-panel title="联系我们：" desc="**********************************************" class="panel">
    </van-panel>
    <van-tabbar>
			<van-button class="btn" @click="commit" :disabled="(text.length==0)">提交反馈</van-button>
    </van-tabbar> 
  </div>
</template> 

<script>
export default {
  name: 'Feedback',
  props: {
    msg: String
  },
  data () {
    return {
      fileList: [],
      text:''
    };
  },
  methods:{
    afterRead (index) {
      return file => {
        this.fileList.push(file)
      };
    },
    commit (){
      this.axios.post('/api/xxx', {
        text: this.text,
        fileList: this.fileList
      })
      .then(res => {
        res = res.data
        if (res.code === 0) {
          this.$router.push({ path: '/mine' })
        } else {
          this.$notify(res.msg)
        }
      })
      .catch(err => {
        // console.log(err)
      })
    },
    delFile (index){
      // console.log('index:', index)
      this.fileList.splice(index, 1);
    }
  }
}
</script>

<style scoped lang="stylus">
.container
  padding-bottom 1.3rem
  margin-top 0.2rem
  .van-tabbar
    margin-bottom 0
.van-field
  color red
.img-list
  background #fff;
  padding .2rem
  margin .16rem 0
  justify-content flex-start
  flex-wrap wrap
  display: flex  
  flex-direction row
  align-items: flex-start
  .img
    position relative
    border #dedede 1px solid
    width 2rem
    height 2rem
    margin-left 0.2rem
    flex 0
    .van-icon
      position absolute
      font-size: .32rem;
      right: -.16rem;
      background: red;
      border-radius: .2rem;
      top: -.16rem;
      color: white;
  .uploader
    border #dedede 1px solid
    width 2rem
    height 2rem
    margin-left 0.2rem
    .add
      margin-top .2rem
      font-size .6rem
    .upload
      margin-top .2rem
      font-size .35rem
.del-img
  width 2rem
  height 2rem
.panel
  text-align left
  padding-top .2rem
  height 2rem
.btn
  width 100%
  height 1.4rem
  background $main-red
  color #fff
  font-size $font-size-normal
</style>


