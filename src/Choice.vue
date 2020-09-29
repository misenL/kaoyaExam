<template>
  <div class="container">
    <el-input
      class="select school mt-1"
      v-model="school_name"
      readonly
      placeholder="点击选择学校"
      @focus="show=true"
      disabled
    ></el-input>
    <van-popup v-model="show" position="top">
      <form action="/">
        <van-search
          v-model="search"
          placeholder="请输入学校名称"
          show-action
          @search="getSchool"
          @cancel="show=false"
        />
      </form>
      <van-cell-group>
        <van-cell
          v-for="(item,index) in schoolOptions"
          :key="index"
          :value="item.label"
          @click="changeSchool(item)"
        ></van-cell>
      </van-cell-group>
    </van-popup>
    <!-- 选择科目 -->
    <el-select
      class="select"
      @change="changeExam"
      :disabled="school_id==null"
      :label="exam_id"
      v-model="exam_name"
      placeholder="请选择科目"
    >
      <el-option
        v-for="item in examOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <!-- 选择考场 -->
    <el-select v-model="building" class="select" :disabled="exam_id == null" placeholder="请选择楼栋">
      <el-option
        v-for="item in buildingOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <!-- 按钮 -->
    <van-button
      type="default"
      @click="seeMore"
      class="btn-login"
      :disabled="!school_id || !exam_id || !building"
    >查看考场信息</van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'Choice',
  data () {
    return {
      // 用户选择的考场、楼栋、科目
      schoolOptions: [],
      examOptions: [],
      buildingOptions: [],
      school_id: null,
      school_name: null,
      exam_id: null,
      exam_name: null,
      building: null,
      loading: false,
      examInfo: null,
      show: false,
      search: '',
    }
  },
  created () {    
    let query = this.$route.query
    this.examInfo = this.$cookies.get('examInfo')
    
    // 如果是扫码进来的，就根据参数选择考场
    if (Object.keys(query).length !== 0) {
      const { school_id, school_name, exam_id, exam_name } = query
      // alert(school_name + ',' + exam_name)
      let schoolItem = {
        label: school_name,
        value: school_id
      }
      this.schoolOptions.push(schoolItem)
      this.school_id = school_id
      this.school_name = school_name
      // 考场扫码关联
      this.exam_id = exam_id
      // this.exam_name = exam_name
      
      this.changeSchool()      
    } else {
      // 如果是从切换按钮跳转过来的，先选中学校，然后按照学校改变的逻辑处理
      if (this.examInfo) {
        let schoolItem = {
          label: this.examInfo.school_name,
          value: this.examInfo.school_id
        }
        this.schoolOptions.push(schoolItem)
        this.school_id = this.examInfo.school_id
        this.school_name = this.examInfo.school_name

        this.changeSchool().then(() => {
          this.exam_id = this.examInfo.exam_id          
          this.changeExam()
          this.building = this.examInfo.building
        })
      }else {
        // 如果url和cookie都没有参数
        Dialog.alert({
          message: '请扫学校二维码进入!'
        }).then(() => {
          // on close
          console.log('============');
          this.$router.go(-1)
        });
      }
    }
  },
  // 监听搜索框
  watch: {
    search: function () {
      this.getSchool(this.search)
    }
  },
  methods: {
    getSchool (query) {
      console.log('getSchool query:', query);
      // 请求后端接口获取学校数据
      if (query !== '') {
        this.loading = true
        let thisUrl = '/api/exam/searchhall?hall=' + query
        this.axios.get(thisUrl)
          .then(res => {
            res = res.data
            if (res.code === 0) {
              this.loading = false
              this.schoolOptions = []
              if (res.data) {
                res.data.forEach(item => {
                  let tempData = {}
                  tempData.label = item.school_name
                  tempData.value = item.school_id
                  this.schoolOptions.push(tempData)
                });
                // 设置默认值，开发测试时可启用
                // this.school_id = this.schoolOptions[0].value
                // this.changeSchool()
              }
            } else {
              this.$notify(res.msg)
            }
          })
          .catch(err => {
            this.loading = false
            this.$notify('ERR: 学校数据获取失败')
          })
      } else {
        // this.schoolOptions = []
      }
    },
    changeSchool (item) {
      if (item) {
        console.log(item);
        
        this.school_id = item.value
        this.school_name = item.label
        this.show = false
      }
      // 更换学校后，级联添加考场选项
      let thisUrl = '/api/exam/examlist?school_id=' + this.school_id
      return this.axios.get(thisUrl)
        .then(res => {
          res = res.data
          if (res.code === 0) {
            // this.exam_id = null            
            this.building = null
            this.examOptions = []
            if (res.data) {
              res.data.forEach(item => {
                let tempData = {}
                tempData.label = item.exam_name
                tempData.value = item.exam_id
                tempData.building_info = item.building_info
                this.examOptions.push(tempData)
              });
            };
            if (this.exam_id !== null) {
              this.changeExam(this.exam_id);
            }
          } else {
            this.$notify(res.msg)
          }
        })
        .catch(err => {
          this.$notify('ERR: 考试数据获取失败')
        })
    },
    changeExam (item) {
      // console.log('changeExam');
      // console.log(item);
      
      this.building = ''
      this.buildingOptions = []
      this.exam_id = item;
      for (let i = 0, len = this.examOptions.length; i < len; i++) {
        if (parseInt(this.exam_id) === this.examOptions[i].value) {
          this.examOptions[i].building_info.forEach(item => {
            let tempData = {
              label: item.name,
              value: item.name,
              lat: item.lat,
              lng: item.lng
            }
            this.buildingOptions.push(tempData)
            // console.log('buildingOptions:', this.buildingOptions);
            
          });
        }
      }
    },
    // 查看考场信息，默认跳转到服务页面
    seeMore () {
      let schoolObj = this.schoolOptions.find(item => {
        return item.value === this.school_id
      })
      let examObj = this.examOptions.find(item => {
        return item.value === parseInt(this.exam_id)
      })
      let buildingObj = this.buildingOptions.find(item => {
        return item.value === this.building
      })
      // console.log('seeMore schoolObj.label:', schoolObj.label);
      // console.log('seeMore examObj.label:', examObj);
      
      let examInfo = {
        school_id: this.school_id,
        school_name: schoolObj.label,
        exam_id: this.exam_id,
        exam_name: examObj.label,
        building: this.building,
        loc: {
          lat: buildingObj.lat,
          lng: buildingObj.lng
        }
      }
      // 考场信息写cookie，直接设置永久cookie，微信机制每天会清除cookie
      this.$cookies.set('examInfo', JSON.stringify(examInfo), -1)
      this.$router.push({ path: '/goods' })
    }
  }
}
</script>

<style scoped lang="stylus">
@import './main.styl';

.select {
  width: 8rem;
  margin-top: 0.6rem;

  &:first-child {
    margin-top: 2rem;
  }

  &.school {
    .el-select {
      input {
        margin-left: 0.66rem;
      }
    }

    .el-input {
      input {
        padding-left: 1rem;
      }
    }
  }
}

.btn-login {
  width: 8rem;
  margin-top: 1rem;
  color: white;
  background: $main-red;
}
</style>
