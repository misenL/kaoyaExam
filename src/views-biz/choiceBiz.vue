<template>
    <div class="choiceBizContainer">
        <!-- 选择考点 -->
        <!-- <el-select
          class="choiceBizSelect"
          v-model="choiceExam" 
          filterable 
          clearable 
          placeholder="请选择考点"
          @change.native="elOptionExam"
          @focus="elSelectFocus">
            <el-option
              v-for="(item, index) in examList"
              :key="index"
              :label="item.school_name"
              :value="item.school_id">
            </el-option>
        </el-select> -->
        <el-input
            class="choiceBizSelect"
            v-model="choiceExam"
            readonly
            placeholder="请选择考点"
            @focus="show=true">
        </el-input>
        <van-popup v-model="show" position="top">
            <form action="/">
                <van-search
                    v-model="search"
                    placeholder="请选择考点"
                    show-action
                    @search="getExam"
                    @cancel="show=false"
                />
            </form>
            <van-cell-group>
                <van-cell
                    v-for="(item,index) in examList"
                    :key="index"
                    :value="item.school_name"
                    @click="changeExam(item)">
                </van-cell>
            </van-cell-group>
        </van-popup>
        
        <!-- 选择商家 -->
        <el-select 
        class="choiceBizSelect"
          v-model="choiceBiz" 
          clearable 
          :disabled="!choiceExam"
          placeholder="请选择商家"
          @change="elOptionBiz">
            <el-option
              v-for="(item, index) in bizList"
              :key="index"
              :label="item.biz_name"
              :value="item.biz_id">
            </el-option>
        </el-select>
            <van-button
              type="default"
              @click="seeMore"
              class="btn-login"
              :disabled="!choiceExam || !choiceBiz "
            >
                切换商家
            </van-button>
    </div>
</template>

<script>
import { log } from 'util';
export default {
    data() {
        return {
            cutBiz: [],
            // mock
            examList: [{
                school_name: '',
                school_id: '',
            }],
            bizList: [],
            choiceExam: '',
            choiceBiz: '',
            examId: '',
            userId: null,
            show: false,
            search: '',
        }
    },
	created () {
        this.axios.get('/api/bizuser/info')
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                this.userId = res.data.user_info.id
                this.cutBiz = res.data.biz_staff
                let arrNewSet = [...new Set(this.cutBiz)];                
                let arrMapSchoolId = this.cutBiz.map(item => item.biz.examination_info.school_id)
                let arrMapSchoolName = this.cutBiz.map(item => item.biz.examination_info.school_name)
                console.log('arrMapSchoolId:', arrMapSchoolId);
                console.log('arrMapSchoolName:', arrMapSchoolName);                
                let setSchoolId = [...new Set(arrMapSchoolId)]
                let setSchoolName = [...new Set(arrMapSchoolName)]
                this.examList = []
                setSchoolId.forEach((school_id,index) => {
                    let school_name = setSchoolName[index]
                    this.examList.push({school_id, school_name})
                })
            }
        })
        .catch((err) => {
            console.log(err);
        });
	},
    methods: {
        elOptionExam () {
            console.log('elOptionExam:', this.choiceExam);
            if (this.choiceExam !== null) {
                this.axios.get(`/api/changebiz?school_id=${this.examId}&biz_user_id=${this.userId}`)
                .then((result) => {
                    result = result.data
                    if (result.code === 0) {
                        this.bizList = result.data;
                        this.choiceBiz = ''
                        console.log(this.bizList);
                    }
                }).catch((err) => {
                    console.log(err);                    
                });
            }
        },
        getExam (ele) {
            console.log('getExam:', ele);
            
        },
        changeExam (ele) {
            console.log('changeExam:', ele);
            this.choiceExam = ele.school_name;
            this.examId = ele.school_id;
            this.elOptionExam();
            this.show = false
        },
        // elSelectFocus () {
        //     console.log('elSelectFocus:');
        // },
        elOptionBiz () {
            console.log('elOptionExam:', this.choiceBiz);
        },
        seeMore () {
            console.log('seeMore:');
            let query = {
                school_id: this.choiceExam,
                biz_id: this.choiceBiz,
            }
            this.$router.push({ path: '/biz/profit', query: query })
        }
    },

}
</script>

<style lang="stylus" scoped>
.choiceBizSelect {
    width: 8rem;
    margin-top: 0.6rem;
}
.btn-login {
  width: 8rem;
  margin: 1rem auto
  color: white;
  background-color: #DC1829;
}
</style>
