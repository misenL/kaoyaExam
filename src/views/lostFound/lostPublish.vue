<template>
    <div class="publishParent">
        <p class="publishLabelP">
            <span class="publishLabel">发布类型</span>
            <span>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="publishLabel" :options="publishOptions" />
                </van-dropdown-menu>
            </span>
        </p>
        <p class="publishGoodsType">
            <span class="goodsType">物品类型</span>
            <span>
                <van-dropdown-menu>
                    <van-dropdown-item v-model="goodsType" :options="goodsTypeOptions" />
                </van-dropdown-menu>
            </span>
        </p>
        <p style="border-top: none">
            <van-cell-group>
                <van-field
                    v-model="goodsName"
                    :error="isNull?(goodsName?false:true):false"
                    required
                    clearable
                    label="物品名称"
                    placeholder="请填写物品名称"
                />
            </van-cell-group>       
        </p>
        <span class="leftSpan fontColorGray">联系人</span>
        <div class="publishContacts">
            <van-cell-group>
                <van-field
                    v-model="userName"
                    :error="isNull?(userName?false:true):false"
                    required
                    clearable
                    label="姓名"
                    placeholder="请填写真实姓名"
                />
                <van-field
                    v-model="userTel"
                    :error="isNull?(userTel?(isTel?true:false):true):false"
                    type="number"
                    maxlength='11'
                    required
                    clearable
                    label="电话"
                    placeholder="请填写联系电话"
                />
                <van-field
                    v-model="lostPlace"
                    :error="isNull?(lostPlace?false:true):false"
                    required
                    clearable
                    label="丢失地点"
                    placeholder="请填写丢失地点"
                />
            </van-cell-group>       
        </div>
        <div class="goodsDes">
            <!-- <span class="leftSpan">物品描述</span> -->
            <van-cell-group>
                <van-field
                    v-model="goodsDes"
                    type="textarea"
                    clearable
                    label="物品描述"
                    :maxlength='50'
                    placeholder="请填写物品描述（最多不超过50字）"
                />
            </van-cell-group>       
        </div>
        <div class="upImg">
            <span class="leftSpan">物品图片</span>
            <!-- <van-uploader class="uploaderImg" preview-size='2rem' :after-read="afterRead" v-model="fileList" :max-count="1" /> -->
            <el-upload
                class="avatar-uploader"
                action="http://kaoya.huikaoedu.com/api/tool/uploadimg"
                name="imgfile"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="lostImg" :src="lostImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="publishBtn" @click="publish">发布</div>
        <van-dialog
            v-model="lostshow"
            showConfirmButton
            @confirm="publishRouter"
            class="alertContent"
        >
            <img src="../../assets/img/confirmJoin.png">
                <!-- 用户报失要审核 -->
                <p v-if="publishLabel===1">提交成功，管理员审核通过即可发布在平台！</p>
                <!-- 用户招失也要审核 -->
                <p v-if="publishLabel===2">
                    <span>小智为您的拾金不昧精神点赞~</span>
                    <span>请将恰得物品交到</span>
                    <span><b>{{schoolAddress}}</b></span>
                </p>
        </van-dialog>


    </div>
</template>

<script>
export default {
    data() {
        return {
            publishLabel: 1,
            publishOptions: [
                { text: '报失', value: 1},
                { text: '招领', value: 2}
            ],
            goodsType: '文件',
            goodsTypeOptions: [
                { text: '文件', value: 1 },
                { text: '电子产品', value: 2 },
                { text: '医疗用品', value: 3 },
                { text: '证件', value: 4 },
                { text: '背包', value: 5 },
                { text: '银行卡', value: 6 },
                { text: '现金', value: 7 },
                { text: '书籍', value: 8 },
                { text: '钥匙', value: 9 },
                { text: '手表', value: 10 },
                { text: '雨伞', value: 11 },
                { text: '水杯', value: 12 },
                { text: '其他', value: 13 },
            ],
            goodsName: '',
            userName: '',
            userTel: '',
            lostPlace: '',
            goodsDes: '',
            lostImg: '',
            student_id: 0,
            formDate: {},
            isNull: false,           // 表单验证是否有填
            isTel: false,         // 电话号码验证
            lostshow: false,
            schoolAddress: '华南理工大学大学城校区A2地区地址教学楼'           // 丢失物品移交的地址
        }
    },
    created () {
        let urlQuery = this.$cookies.get('examInfo')
        let infoUrl = '/api/user/info'
        this.axios.get(infoUrl)
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                this.student_id = res.data.student_id
                console.log(this.student_id);
            }
        }).catch((err) => {
            this.$notify(res.msg)            
        });
        // 获取位置信息
        let locationUrl = `/api/lostandfound/school_lostandfound_location?school_id=${urlQuery.school_id}`
        this.axios.get(locationUrl)
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                console.log('位置：', res);
                this.schoolAddress = res.data.notice+res.data.lostandfound_location;
            }
        }).catch((err) => {
            this.$notify(res.msg)
        });
    },
    watch: {
        userTel: function () {
            // 电话验证
            if(!(/^1[3456789]\d{9}$/.test(this.userTel))){ 
                this.isTel = true       
                return 
            }else {
                this.isTel = false
                return                 
            }
        }
    },
    methods: {
        // 图片上传
        beforeAvatarUpload(file) {
            const isImg = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isImg) {
                this.$message.error('只能上传png或jpg格式')
                return false
            }
            return true
        },
        handleAvatarSuccess(res, file) {
            console.log('res:', res);
            console.log('file:', file);
            this.lostImg = res.data
        },
        // 提交
        publish () {
            let school_id = this.$cookies.get('examInfo').school_id
            console.log('publish school_id:', school_id);
            
            this.isNull = true      // 启动表单验证
            if (this.goodsName!==''&&this.userName!==''&&this.userTel!==''&&!this.isTel) {
                let postUrl = '/api/lostandfound/infoupload'
                this.formDate = {
                    class: this.publishLabel,
                    goods_category: this.goodsType,
                    goods_name: this.goodsName,
                    goods_describle: this.goodsDes,
                    goods_location: this.lostPlace,
                    goods_picture: this.lostImg,
                    username: this.userName,
                    tel: this.userTel,
                    student_id: this.student_id,
                    school_id: school_id,
                    review: 0                   // 0 未审核
                }
                console.log('this.formDate:', this.formDate);
                this.axios.post(postUrl, this.formDate)
                .then(res => {
                    res = res.data
                    if (res.code === 0) {
                        // this.$router.push({ path: '/goods/lostList' })
                        this.lostshow = true
                    }
                }).catch(err => {
                    this.$notify(res.msg)                                                
                });
            }
        },
        publishRouter () {
            this.$router.push({ path: '/goods/lostList' })
        }
    },
}
</script>

<style lang="stylus" scoped>
// 复用样式+deep穿透
.publishParent {
    font-size 13px
    color #000
    background-color #f1f1f1
    height 100vh
}
.publishParent /deep/ .van-cell {
    font-size 13px
    line-height .5rem
    text-align left
}
.publishParent /deep/ .van-dropdown-menu__title {
    font-size 13px
}
.publishParent /deep/ .van-field__label {
    width 80px
}
.publishLabelP /deep/ .van-dropdown-menu__title,
.publishGoodsType /deep/ .van-dropdown-menu__title {
    width 60vw
    display flex
    justify-content space-between
}
.publishGoodsType /deep/ .van-dropdown-menu,
.publishGoodsType /deep/ .van-dropdown-menu__item {
    height .8rem
}
p, .publishContacts {
    border-top 1px solid #e3e3e3
    border-bottom 1px solid #e3e3e3
    margin 0
    background-color #ffffff
}
.leftSpan {
    display block
    text-align left
    padding .15rem .3rem
}
.fontColorGray {
    color #a3a3a3
}
// end
.publishLabelP {
    display flex
    justify-content flex-start
    align-items center
    height 1.2rem
    margin-bottom .1rem
}
.publishLabelP span .van-dropdown-menu {
    height 1.18rem
}
.publishGoodsType .van-dropdown-menu::after {
    border none
}
.publishLabel, .goodsType {
    margin 0 .8rem 0 .45rem
}
.publishLabel:before,
.goodsType:before {
    position: absolute
    left: 7px
    color: #f44
    font-size: 14px
    content: '*'
}
.publishGoodsType {
    display flex
    justify-content flex-start
    align-items center
    height 1rem
    border-bottom none
}
.goodsDes {
    margin-top .1rem
    border-top 1px solid #e3e3e3
}
.goodsDes .van-field {
    display flex
    flex-direction column
}
.goodsDes /deep/ span {
    display block
    margin-bottom .1rem
}
.upImg {
    display flex
    flex-direction column
    justify-content flex-start
    background-color #ffffff
    margin-top .1rem
}
// .uploaderImg {
//     margin .1rem 0 0 .3rem
// }


.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float left
    margin 0 0 .4rem .2rem
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
}
.avatar {
    width: 1.8rem;
    height: 1.8rem;
    display: block;
}
.publishBtn {
    background-color #27496b
    color #ffffff
    width 38%
    height .8rem
    line-height .8rem
    border-radius .2rem
    margin .8rem auto
}
// mask style
</style>

<style lang="stylus" scoped>


.alertContent {
    top 40%
}
.alertContent img {
    width 1.5rem
    height 1.5rem
    margin-top 1rem
    margin-bottom .2rem
}
.alertContent p {
    border none
    margin-bottom 1rem
    padding 0 .5rem
    display flex
    flex-direction column
}
</style>



