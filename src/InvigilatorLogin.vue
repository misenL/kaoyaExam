<template>
  <div>
    <div>
      <!-- 姓名 -->
      <div class="unit">
        <span class="unit__span">姓名：</span>
        <div class="unit__result">
          <input type="text" class="unit__input" placeholder="请输入姓名" v-model="result.name" />
        </div>
      </div>
      <!-- 性别 -->
      <div class="unit">
        <span class="unit__span">性别：</span>
        <div class="unit__result">
          <van-radio-group v-model="result.sex" icon-size=".4rem">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <!-- 身份 -->
      <div class="unit">
        <span class="unit__span">身份：</span>
        <div class="unit__result">
          <van-cell is-link @click="showIdentityPopup">{{identitiesText}}</van-cell>
          <van-popup v-model="showIdentities" position="bottom">
            <van-picker
              :columns="identities"
              @confirm="onIdentityConfirm"
              :show-toolbar="true"
              :default-index="0"
            />
          </van-popup>
        </div>
      </div>
      <!-- 学校 -->
      <div class="unit">
        <span class="unit__span">{{isNotAtSchool}}学校：</span>
        <div class="unit__result">
          <van-cell is-link @click="showSchoolPopup">{{schoolText}}</van-cell>
          <van-popup v-model="showSchools" position="bottom">
            <van-picker
              :columns="schools"
              @confirm="onSchoolConfirm"
              :show-toolbar="true"
              :default-index="0"
            />
          </van-popup>
        </div>
      </div>

      <!-- 在校生选择 -->
      <div v-if="!result.identity || result.identity === '在校生'">
        <!-- 学历 -->
        <div class="unit">
          <span class="unit__span">学历：</span>
          <div class="unit__result">
            <van-cell is-link @click="showEduBgPopup">{{eduBgText}}</van-cell>
            <van-popup v-model="showEduBgs" position="bottom">
              <van-picker :columns="eduBackgrounds" @confirm="onEduBgConfirm" :show-toolbar="true" />
            </van-popup>
          </div>
        </div>
        <!-- 年级 -->
        <div class="unit">
          <span class="unit__span">年级：</span>
          <div class="unit__result">
            <van-cell is-link @click="showGradePopup">{{gradeText}}</van-cell>
            <van-popup v-model="showGrades" position="bottom">
              <van-picker :columns="grades" @confirm="onGradeConfirm" :show-toolbar="true" />
            </van-popup>
          </div>
        </div>
      </div>

      <!-- 教职工选择 -->
      <div v-if="result.identity === '教职工'">
        <!-- 所属部门 -->
        <div class="unit">
          <span class="unit__span">所属部门：</span>
          <div class="unit__result">
            <input
              type="text"
              class="unit__input"
              placeholder="请输入所属部门"
              v-model="result.employee_info.department"
            />
          </div>
        </div>
        <!-- 职位 -->
        <div class="unit">
          <span class="unit__span">职位：</span>
          <div class="unit__result">
            <input type="text" class="unit__input" placeholder="请输入" v-model="result.employee_info.job" />
          </div>
        </div>
      </div>

      <!-- 非校内人员选择 -->
      <div v-if="result.identity === '非校内人员'">
        <!-- 推荐人姓名 -->
        <div class="unit">
          <span class="unit__span">推荐人姓名：</span>
          <div class="unit__result">
            <input
              type="text"
              class="unit__input"
              placeholder="请输入推荐人姓名"
              v-model="result.other_info.recName"
            />
          </div>
        </div>
        <!-- 推荐人所属部门 -->
        <div class="unit">
          <span class="unit__span">推荐人所属：</span>
          <div class="unit__result">
            <input
              type="text"
              class="unit__input"
              placeholder="请输入推荐人所属部门"
              v-model="result.other_info.recDepartment"
            />
          </div>
        </div>
      </div>

      <!-- 手机 -->
      <div class="unit">
        <span class="unit__span">手机号：</span>
        <div class="unit__result">
          <input
            type="number"
            placeholder="请输入手机号"
            class="unit__input"
            v-model="result.tel"
            maxlength="11"
          />
        </div>
      </div>
      <!-- 验证码 -->
      <div class="unit">
        <span class="unit__span">验证码：</span>
        <div class="unit__result">
          <input
            type="number"
            placeholder="请输入验证码"
            class="unit__input"
            v-model="result.code"
            maxlength="6"
          />
          <van-button
            type="info"
            class="unit__send-code-btn"
            @click="sendCode"
            :disabled="wait"
          >{{codeHint}}</van-button>
        </div>
      </div>
      <!-- 身份证号 -->
      <div class="unit">
        <span class="unit__span">身份证号：</span>
        <div class="unit__result">
          <input type="text" placeholder="请输入身份证号" class="unit__input" v-model="result.idNumber" />
        </div>
      </div>

      <!-- 学生证号 -->
      <div class="unit" v-if="!result.identity || result.identity === '在校生'">
        <span class="unit__span">学生证号：</span>
        <div class="unit__result">
          <input
            type="number"
            placeholder="请输入学生证号"
            class="unit__input"
            v-model="result.student_info.studentID"
          />
        </div>
      </div>
      <!-- 教职工号 -->
      <div class="unit" v-if="result.identity === '教职工'">
        <span class="unit__span">教职工号：</span>
        <div class="unit__result">
          <input
            type="text"
            class="unit__input"
            placeholder="请输入教职工号"
            v-model="result.employee_info.workNumber"
          />
        </div>
      </div>
      <!-- 推荐人手机 -->
      <div class="unit" v-if="result.identity === '非校内人员'">
        <span class="unit__span">推荐人手机：</span>
        <div class="unit__result">
          <input
            type="number"
            placeholder="必须可打通的推荐人手机号"
            class="unit__input"
            v-model="result.other_info.recPhone"
            maxlength="11"
          />
        </div>
      </div>
      <!-- 图片上传 -->
      <div class="unit">
        <span class="unit__span">上传身份证：</span>
        <div class="unit__result unit__img-hint">需要上传正反两面清晰照片(请使用本地图片)</div>
      </div>
      <div class="file-upload">
        <!-- 身份证 -->
        <van-uploader
          v-model="imgIDList"
          :max-count="2"
          preview-image
          preview-full-image
          :before-read="beforeRead"
          :after-read="afterReadID"
        />
      </div>
      <div class="unit">
        <span class="unit__span">{{cardType}}</span>
        <div class="unit__result unit__img-hint">需要上传正反两面清晰照片(请使用本地图片)</div>
      </div>
      <div class="file-upload">
        <!-- 个人证件 -->
        <van-uploader
          v-model="imgUserList"
          :max-count="2"
          preview-image
          preview-full-image
          accept="image/*"
          :before-read="beforeRead"
          :after-read="afterReadUser"
        />
      </div>
    </div>
    <!-- 用户协议 -->
    <div class="agree-unit">
      <van-checkbox v-model="agree" @click="a">
        <p>我已阅读并同意</p>
      </van-checkbox>
      <a href="javascript: void(0);" @click="showProtocal">《监考网用户协议》</a>
    </div>
    <!-- 用户协议内容 -->
    <van-popup v-model="protocal">内容</van-popup>
    <!-- 提交按钮 -->
    <div class="submit-unit">
      <van-button :disabled="canSubmit" type="info" @click="doLogin">确认提交</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import Base64 from 'js-base64'

export default {
  data () {
    return {
      // Popup弹出层是否显示
      showSchools: false,
      showIdentities: false,
      showEduBgs: false,
      showGrades: false,
      protocal: false,
      // 身份、学校、学历、年级选项
      identities: ['请选择', '在校生', '教职工', '非校内人员'],
      // 从后端返回学校数组
      schools: [
        '请选择',
        '华南理工大学',
        '中山大学',
        '广东外语外贸大学',
        '暨南大学',
        '广州大学'
      ],
      // 学历
      eduBackgrounds: ['请选择', '本科生', '研究生', '博士'],
      // 写死的年级数组，请每年维护
      grades: [
        '请选择',
        '2012级',
        '2013级',
        '2014级',
        '2015级',
        '2016级',
        '2017级',
        '2018级',
        '2019级',
        '2020级',
        '2021级',
        '2022级'
      ],
      // 学校选择栏文字
      schoolText: '请选择',
      // 身份选择栏文字
      identitiesText: '请选择',
      // 学历选择栏文字
      eduBgText: '请选择',
      // 年级选择栏文字
      gradeText: '请选择',
      // 验证码是否在倒数
      enableSendCodeBtn: false,
      // 验证码按钮文字
      codeHint: '发送验证码',
      // 同意监考网用户协议
      agree: true,
      // 身份证路径（1为正面，2为反面）
      idCardSrc1: '',
      idCardSrc2: '',
      // 个人证件路径（1为正面，2为反面）
      personalCardSrc1: '',
      personalCardSrc2: '',
      result: {
        // 类型：标注Number的为Number，其他都为String
        // 公共信息：
        name: '',
        sex: '',
        identity: '',
        school: '',
        tel: '',
        code: '',
        // 这里要注意身份证号中可能有xyz，因此是String
        idNumber: '',
        // 最终传给后端的对象
        student_info: {
          // 学生信息：
          // 1. 学历
          // 2. 年级
          // 3. 学生号
          // 4. 学生卡照片正反面
          eduBg: '',
          grade: '',
          studentID: '',
          // 学生证正反面照片
          studentCardFileList: []
        },
        employee_info: {
          // 教职工信息：
          // 1. 部门
          // 2. 工作
          // 3. 工号
          // 4. 工卡照片正反面
          department: '',
          job: '',
          workNumber: '',
          // 职工证正反面照片
          workCardFileList: []
        },
        other_info: {
          // 非校内人员信息：
          // rec: recommender 推荐人
          // 1. 推荐人姓名
          // 2. 推荐人部门
          // 3. 推荐人手机
          // guarant: guarantor 担保人
          // 4. 担保人证件照片正反面
          recName: '',
          recDepartment: '',
          recPhone: '',
          // 担保人证件正反面照片
          guarantCardFileList: []
        },
        // 身份证
        idcard1: '',
        idcard2: '',
      },
      // 图片上传预览用
      imgIDList: [],
      imgUserList: [],
    };
  },
  created() {
    this.axios.get('/api/getKaoWuUserInfo').then((result) => {
      if (result.data.code == 0) {
        const resData = result.data.data
        if ( resData!== null&& resData !==[]&& resData!=='') {  // 说明有数据
          this.$router.push({path: '/invigilator/examList'})
        }else {
          this.getSchoolInfo()
        }
      }else {
        this.message = '网络错误，请刷新重试'
        this.centerImg = require('./assets/iconfont/failure.png')
        this.showCenterPopup = true
      }
    })
  },
  methods: {
    getSchoolInfo () {
      this.axios.get(`/api/schoollist`).then((result) => {
        if (result.data.code == 0) {
          let [resInfo, arrEach] = [result.data.data, ['请选择']]
          resInfo.forEach((el, ind) => {
            arrEach.push(el.school_name)
          });
          this.schools = arrEach
        }
      })
    },
    // 测试用 用户协议
    a () {
      console.log(this.result);
    },
    // 图片上传之前判断类型
    beforeRead (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        Toast('请上传 jpg/png 格式图片');
        return false;
      }
      return true;
    },
    // 图片上传成功后调用的函数
    afterReadID (file) {
      // 上传到后台并返回Url
      this.imgIDList.length === 2? this.postImgApi(1,1): ''
    },
    afterReadUser (file) {
      this.imgUserList.length === 2? this.postImgApi(1, 2): ''
    },
    postImgApi (index, id) {            // index为数组下标+1；  id为图片所属，1为身份证，2为个人证件
      let data = new FormData()
      id === 1? data.append('imgfile', this.imgIDList[index- 1].file): data.append('imgfile', this.imgUserList[index -1].file)
      this.axios.post('/api/tool/uploadimg', data).then((result) => {
        if (result.data.code === 0) {
          if (id === 1) {
            this['idCardSrc'+ index] = result.data.data
          }else if (id === 2) {
            this['personalCardSrc'+ index] = result.data.data
          }
        }
      })
      if (index < 2) {      // 递归
        index ++
        this.postImgApi(index, id)
      }else {         // 递归出口
        return false
      }
    },
    // 分别确定弹出层弹出
    showSchoolPopup () {
      this.showSchools = true;
    },
    showIdentityPopup () {
      this.showIdentities = true;
    },
    showEduBgPopup () {
      this.showEduBgs = true;
    },
    showGradePopup () {
      this.showGrades = true;
    },
    // 分别确定用户输入的学校、身份、学历和年级背景
    onSchoolConfirm (value, index) {
      this.schoolText = this.schools[index];
      if (index === 0) this.result.school = '';
      else this.result.school = this.schools[index];
      this.showSchools = false;
    },
    onIdentityConfirm (value, index) {
      this.identitiesText = this.identities[index];
      if (index === 0) this.result.identity = '';
      else this.result.identity = this.identities[index];
      this.showIdentities = false;
      if (index === 1) {
        this.result.student_info = {
          eduBg: '',
          grade: '',
          studentID: '',
          studentCardFileList: []
        };
        this.result.employee_info = null;
        this.result.other_info = null;
        return;
      }
      if (index === 2) {
        this.result.student_info = null;
        this.result.employee_info = {
          department: '',
          job: '',
          workNumber: '',
          workCardFileList: []
        };
        this.result.other_info = null;
        return;
      }
      if (index === 3) {
        this.result.student_info = null;
        this.result.employee_info = null;
        this.result.other_info = {
          recName: '',
          recDepartment: '',
          recPhone: '',
          guarantCardFileList: []
        };
      }
    },
    onEduBgConfirm (value, index) {
      this.eduBgText = this.eduBackgrounds[index];
      if (index === 0) this.result.student_info.eduBg = '';
      else this.result.student_info.eduBg = this.eduBackgrounds[index];
      this.showEduBgs = false;
    },
    onGradeConfirm (value, index) {
      this.gradeText = this.grades[index];
      if (index === 0) this.result.student_info.grade = '';
      else this.result.student_info.grade = this.grades[index];
      this.showGrades = false;
    },
    // 发送验证码
    sendCode () {
      // 倒计时
      let count = 30;
      this.enableSendCodeBtn = true;
      this.codeHint = count + 's后重试';
      let intId = setInterval(() => {
        count--;
        if (count === 0) {
          window.clearInterval(intId);
          this.codeHint = '发送验证码';
          this.enableSendCodeBtn = false;
        } else {
          this.codeHint = count + 's后重试';
        }
      }, 1000);
      // 向服务端求取短信服务
      let thisUrl = '/api/tool/telcode?tel=' + this.result.tel;
      this.axios
        .get(thisUrl)
        .then(res => {
          res = res.data;
          if (res.code === 0) {
            // notify 默认背景为红色
            this.$notify({
              message: '验证码发送成功'
            });
          } else {
            this.$notify(res.msg);
          }
        })
        .catch(err => {
          this.$notify('数据获取失败');
        });
    },
    // 在上传前判断是否是图片
    beforeAvatarUpload (file) {
      console.log('beforeAvatarUpload', file);
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isImg) {
          this.$message.error('只能上传png或jpg格式')
          return false
      }
      return true
    },
    // 展示协议
    showProtocal () {
      this.protocal = true;
    },
    // 确认提交
    doLogin () {
      if (this.result.identity === '在校生') {
        this.result.student_info.studentCardFileList.push(this.personalCardSrc1)
        this.result.student_info.studentCardFileList.push(this.personalCardSrc2)
      }
      if (this.result.identity === '教职工') {
        this.result.employee_info.workCardFileList.push(this.personalCardSrc1)
        this.result.employee_info.workCardFileList.push(this.personalCardSrc2)
      }
      if (this.result.identity === '非校内人员') {
        this.result.other_info.guarantCardFileList.push(this.personalCardSrc1)
        this.result.other_info.guarantCardFileList.push(this.personalCardSrc2)
      }
      this.result.idcard1 = this.idCardSrc1
      this.result.idcard2 = this.idCardSrc2
      this.axios
        .post('/api/kaowuuser/reg', this.result)
        .then(res => {
          res = res.data;
          if (res.code === 0) {
            // 页面跳转
            this.$router.replace({ path: '/invigilator/examList' })
            console.log('注册成功');
          } else {
            console.log(res.msg);
            this.$notify(res.msg);
          }
        })
        .catch(err => {});
        console.log(this.result)
    }
  },

  computed: {
    // 如果是非在校人员则改为“推荐人学校”
    isNotAtSchool: function () {
      if (this.result.identity === '非校内人员') return '推荐人'
      else return ''
    },
    // 上传证件类型
    cardType: function () {
      switch (this.result.identity) {
        case '教职工': {
          return '上传职工证：'
        }
        case '非校内人员': {
          return '担保人证件：'
        }
        default: return '上传学生证：'
      }
    },
    // 是否可提交
    canSubmit: function () {
      let res = this.result;
      let stu = this.result.student_info;
      let emp = this.result.employee_info;
      let oth = this.result.other_info;
      let publicInfo =
        this.agree &&
        res.name.length &&
        res.sex.length &&
        res.identity.length &&
        res.school.length &&
        res.tel.length &&
        res.code.length &&
        res.idNumber.length &&
        this.idCardSrc1 &&
        this.idCardSrc2 &&
        this.personalCardSrc1 &&
        this.personalCardSrc2
      if (!publicInfo) return true;
      if (res.identity === '在校生') {
        return !(stu.eduBg.length && stu.grade.length && stu.studentID.length);
      }
      if (res.identity === '教职工') {
        return !(
          emp.department.length &&
          emp.job.length &&
          emp.workNumber.length
        );
      }
      if (res.identity === '非校内人员') {
        return !(
          oth.recName.length &&
          oth.recDepartment.length &&
          oth.recPhone.length
        );
      }
      return true;
    },
    // 发送验证码按钮是否可用
    wait: function () {
      // 如果手机号没填，按钮不亮
      if (!this.result.tel.length) return true;
      // 如果验证码在倒数，按钮不亮
      return this.enableSendCodeBtn;
    }
  }
};
</script>

<style lang='stylus' scoped>
* {
  padding: 0;
  margin: 0;
}

input {
  display: block;
  background: transparent;
  border: none;
  width: 100%;
  height: 1rem;
  line-height: 0.6rem;
}

.unit {
  box-sizing: border-box;
  width: 100%;
  padding: 0.2rem 0.4rem;
  display: flex;
  flex-wrap: nowrap;
}

.img-upload {
  display: block;
}

.unit__span {
  width: 25%;
  text-align: left;
  font-size: 0.38rem;
  line-height: 1rem;
}

.unit__result {
  width: 73%;
  padding: 0 0.4rem;
  margin-left: 2%;
  font-size: 0.36rem;
  box-sizing: border-box;
  color: gray;
  text-align: start;
  display: flex;
}

.unit__send-code-btn {
  width: 80% !important;
  height: 1rem;
  line-height: 1rem;
  margin: 0 0 0 0.4rem !important;
}

.unit__img-upload-hint {
  width: 100%;
  display: flex;
  position: relative;
}

.unit__img-hint {
  color: black;
  line-height: 1rem;
}

.agree-unit {
  display: flex;
  width: fit-content;
  margin: 0.4rem auto 0;
}

.agree-unit p {
  font-size: 0.36rem;
  line-height: 0.6rem;
}

.agree-unit a {
  font-size: 0.36rem;
  line-height: 0.6rem;
}

.van-cell {
  background: transparent;
  line-height: 1rem;
}

.van-cell__right-icon {
  line-height: 1rem;
}

.van-cell__value {
  color: gray;
}

.van-radio-group {
  display: flex;
  flex-wrap: nowrap;
  height: 1rem;
}

.van-radio {
  font-size: 0.36rem;
  margin-right: 0.8rem;
}

.van-uploader {
  margin-top: 0.4rem;
}

.van-button {
  width: 90%;
  margin: 0.4rem auto;
}

.file-upload {
  display: flex;
  justify-content: center;
}

.file {
  margin: .3rem;
  width: 2rem;
  height: 2rem;
  border: .02rem solid lightgray;
}

.file-upload /deep/ .el-upload {
  width: 100%;
  height: 100%;
}

.file-upload /deep/ .el-icon-plus {
  width: .5rem;
  height: .5rem;
  position: relative;
  margin-top: 1rem;
  top: -0.25rem;
  
}

.file-upload /deep/ .el-icon-plus::before {
  width: 100%;
  height: 100%;
  line-height: 0.5rem;
  font-size: 0.5rem;
  display: block;
}

.file-upload /deep/ img {
  width: 99%;
  height: 100%;
}

</style>