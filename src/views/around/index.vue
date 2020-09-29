<template>
    <div class="aroundPage">
        <div class="aroundContainer">
            <img src="../../assets/img/monkey.png" alt="" srcset="">
            <span>敬请期待</span>
            <p>程序员正在开发中···</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="stylus" scoped>
.aroundPage {
    height 100vh
    background-color #ffffff
}
.aroundContainer {
    display flex
    flex-direction column
    align-items center
    padding-top 3rem
}
.aroundContainer img {
    width 3rem
    margin-bottom .3rem
}
.aroundContainer span {
    font-weight 600
    font-size 20px
    color #333333
}
.aroundContainer p {
    font-size 14px
    color #797979
}
</style>

