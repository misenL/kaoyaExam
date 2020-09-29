<template>
	<div class="cantactPage">
		<div class="cantacHeader" v-if="formInfo!=={}">
			<img :src="formInfo.headpic">
			<span>{{formInfo.username}}</span>
		</div>
		<div class="cantacMain">
			<div class="cantacContent">
				<div class="userInfoDiv">
					<el-form
          :model="formInfo"
          ref="ruleForm"
          label-position="top"
          label-width="100px"
          size="small">
          <!-- <el-form-item label="昵称">
            <el-input v-model="formInfo.wechatName" placeholder="请输入你的昵称" class="disabledInput" disabled></el-input>
          </el-form-item> -->
          <el-form-item label="真实姓名">
            <el-input v-model="trueName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别"  class="disabledInput" disabled>
            <!-- <template slot-scope="scope"> -->
              <ul class="sexUl">
                <li v-if="choseSex">
                  <img :src="sexMan">
                  <span>男</span>
                </li>
                <li v-else>
                  <img :src="sexGirl">
                  <span>女</span>
                </li>
              </ul>
            <!-- </template> -->
          </el-form-item>
        <el-form-item label="手机号码">
            <el-input type="number" v-model="tel" :max="11" placeholder="请填写正确手机号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="ID" placeholder="请填写正确的身份证号码"></el-input>
          </el-form-item>
          <el-form-item label="请上传防疫行程证" class="upload">
              <el-upload
                id="uploadimg"
                class="upload-demo"
                action="http://kaoyafront.huikaoedu.com/api/uploadUser"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handelUploadSuccess"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
          </el-form-item>
					</el-form>
				</div>

			</div>
			<input class="preserve" type="button" value="保存" @click="submitForm('ruleForm')">
		</div>
	</div>
</template>

<script>
import { Toast } from 'vant';
export default {
	data () {
		return {
      fileList:[],
			formInfo: {},
			ID: '',
			trueName: '',
			email: '',
			tel: '',
			choseSex: true,			// true是男  false是女
			sexMan: require('../../assets/img/manChose.png'),
			sexGirl: require('../../assets/img/girlChose.png'),
			checkTel: '请输入你的手机号码',
      fanyi:null,
		}
	},
	created () {
		this.axios.get('/api/user/info')
		.then((result) => {
			if (result.data.code === 0) {
				// this.formInfo = result.data.data
				console.log('result.data.data:', result.data.data);
				this.formInfo = result.data.data;
				if (this.formInfo.tel === null) {
					this.checkTel = '暂无手机号码'
				}
				if (result.data.data.user_private_info !== null) {
					this.ID = result.data.data.user_private_info.ID
					this.trueName = result.data.data.user_private_info.trueName
					this.email = result.data.data.user_private_info.email
				}
				this.tel = result.data.data.tel
				result.data.data.sex === '男' ? this.choseSex = true : this.choseSex = false
				console.log('contact:', this.formInfo);
			}
		}).catch((err) => {
			this.$notify('ERR: 网络错误！数据获取失败')
		});
	},
	methods: {
// 文件上传成功
    handelUploadSuccess (response, file, fileList){
      this.fanyi = response
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
    },
    handleExceed (files, fileList) {
      this.$message.warning('只能上传一次文件，请先删除文件,点击文件后可删除');
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
    },
		submitForm (formName) {
			if (this.trueName !== '' && this.ID !== ''  && this.tel !== '' && this.fanyi ) {
				let user_private_info = {
					trueName: this.trueName,
					ID: this.ID,
					email: this.email,
          fanyi:this.fanyi
				}
				this.axios.post('api/user/updateinfo', {
					user_private_info: user_private_info,
					tel: this.tel
				})
				.then((result) => {
					console.log(result);
					Toast.success('保存成功');
					setTimeout(() =>{
						this.$router.push({ path: '/mine' })
					}, 1000)
				}).catch((err) => {
					Toast.success('保存失败');
				});
			}else {
					Toast.success('请输入完整信息');
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
  .upload-demo{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

.cantactPage {
background-color #ffffff
height 100vh
min-height 16rem
width 100vw
}
.cantacHeader {
background linear-gradient(27deg, white, white 10vh, #0b52e4 1vh, #0b52e4 12vh)
height 22vh
display flex
flex-direction column
justify-content center
align-items center
color #ffffff
font-size 14px
}
.cantacHeader img {
width 1.3rem
border-radius 1rem
margin-top -.2rem
margin-bottom .2rem
}
.cantacMain {
height 78vh
font-size 14px
}
.cantacContent {
background-color #ffffff
width 80vw
height 60vh
min-height 9rem
margin -.5rem auto 0
padding-top .4rem
border 1px solid #e3e3e380
border-radius .2rem
box-shadow 3px 3px 5px #a6c2fd
}
.userInfoDiv .el-form-item {
display flex
flex-direction column
justify-content flex-start
align-items flex-start
padding-left 5vw
margin-bottom 0
}
.userInfoDiv >>> .el-form-item__label {
color #676767
font-size 12px
padding 0
}
.userInfoDiv .el-input {
width 60vw
border none
}
.userInfoDiv >>> label {
height .7rem
}
.userInfoDiv .el-input >>> input {
padding 0
color #000000
border none
font-weight 600
background-color #ffffff
}
.disabledInput >>> input,
.disabledInput {
color #C0C4CC!important
}
.sexUl li {
display flex
justify-content center
align-items center
font-weight 800
width 15vw
float left
}
.sexUl img {
width .6rem
margin-right .15rem
}
.preserve {
border none
background-color #0b52e4!important
background #0b52e4!important
background linear-gradient(#0b52e4,#0b52e4)!important
color #ffffff
width 37vw
line-height .8rem
border-radius .1rem
margin-top .6rem
}
>>> .el-form-item__error {
top 75%
font-weight 600
font-size 12px
}

</style>
