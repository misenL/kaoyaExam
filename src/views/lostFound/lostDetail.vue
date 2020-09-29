<template>
<!-- lostDetail -->
    <div class="lostDetailParent">
        <!-- <img :src="lostDetail.goods_picture" alt=""> -->
        <img class="lostDetailImg" @click="imgPreview" v-if="lostDetail.goods_picture!==''" :src="lostDetail.goods_picture" alt="">
        <img class="lostDetailImg" v-else src="../../assets/img/haha.jpg" alt="">
        <div class="lostDetailTop">
            <p>{{lostDetail.goods_name}}</p>
            <div>
                <span class="lostDetailUserInfo">
                    <img v-if="lostDetail.student_info" :src="lostDetail.student_info.headpic" alt="">
                    <img v-else src="../../assets/img/haha.jpg" alt="">
                    {{lostDetail.lostUserName}}
                </span>
                <span class="lineCenter"></span>
                <span class="lostDetailDate">{{lostDetail.create_time}}</span>
            </div>
        </div>
        <div class="lostDetailCenter">
            <p>
                <span class="lineLeft"></span>
                丢失地点
            </p>
            <p>{{lostDetail.goods_location}}</p>
            <p class="goodsInfo">
                <span class="lineLeft"></span>
                物品描述
            </p>
            <p>{{lostDetail.goods_describle}}</p>
        </div>
        <div class="lostDetailBottom">
            <p>
                <span class="lineLeft"></span>
                联系人
            </p>
            <!-- <a href="tell://13414103157">13414103157</a> -->
            <p @click="showSheet">
                <span class="lostDetailContacts">{{lostDetail.username}}</span>
                <span class="lostTel">{{lostDetail.tel}}</span>
                <span class="lostDetailTelIcon"><i class="el-icon-phone-outline" style="color:#369"></i></span>
            </p>
        </div>
        <!-- 上拉选择菜单 -->
        <van-action-sheet
          v-model="show"
          :actions="actions"
          cancel-text="取消"
          @select="onSelect"
        />
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
    data() {
        return {
            lostDetail: {},
            userImg: '',
            tel: '',            //微信电话调用的
            show: false,
            actions: [
                {name: '', disabled: true },
                {name: '拨打'}
            ],
        }
    },
    created () {
        let queryId = this.$route.query.goods_id
        let cutUrl = `/api/lostandfound/getgoodsdetail?goods_id=${queryId}`
        this.axios.get(cutUrl)
        .then((res) => {
            res = res.data
            if (res.code === 0) {
                this.lostDetail = res.data
                this.actions[0].name = this.tel = res.data.tel
            }
        }).catch((err) => {
            this.$notify(res.msg)
        });
    },
    methods: {
        showSheet () {
            this.show = true
        },
        onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
            this.show = false;
            if (item.name === '拨打') {
                console.log(this.tel);
                // 调用电话
                window.location.href = 'tel:'+this.tel
            }
        },
        imgPreview () {
            ImagePreview([
                this.lostDetail.goods_picture
            ]);
        }
    },
}
</script>

<style lang="stylus" scoped>
.lostDetailParent {
    font-size 13px
    color #000
    background-color #f1f1f1
    height 100vh
}
.lostDetailTop,
.lostDetailCenter,
.lostDetailBottom {
    padding .1rem .4rem .05rem .4rem
    margin-bottom .1rem
    background-color #ffffff
}
p {
    margin 0
    text-align left
}
.lineCenter {
    height .35rem
    width 1px
    background-color #c3c3c3
    margin 0 .3rem
    display block
}
.lineLeft {
    width 4px
    background-color #369
    height .45rem
    margin 0 .15rem 0 0    
    display block
}
// end
.lostDetailImg {
    width 96vw
    height 5rem
    // overflow hidden
    object-fit cover
    padding 2vw
    background-color #ffffff
    display block
}
.lostDetailTop p {
    color #29649e
    font-weight 800
}
.lostDetailTop div {
    margin .2rem 0
    color #b3b3b3
}
.lostDetailTop div,
.lostDetailTop span:first-child {
    display flex
    justify-content flex-start
    align-items center
}
.lostDetailTop img {
    width .5rem
    height .5rem
    border-radius .5rem
    margin-right .15rem
}
.lostDetailCenter p {
    display flex
    justify-content flex-start
    align-items center
    margin .2rem 0
}
.lostDetailCenter .goodsInfo {
    margin-top .4rem
}
.lostDetailCenter p:last-child {
    margin-bottom .3rem
    line-height .55rem
}
.lostDetailBottom p {
    display flex
    justify-content flex-start
    align-items center
    margin .2rem 0       
}
.lostDetailContacts {
    margin-right auto
}
.lostDetailBottom p span:last-child {
    font-size 24px
}
.lostTel {
    color #369
}
.lostDetailTelIcon {
    margin-left .2rem
}

</style>

