<template>
    <div>
        <img src="../assets/img/noPermission.png" alt="">
        <h6>对不起，您暂无权限！</h6>
        <p>请联系管理员开通访问权限！</p>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
div {
    background #ffffff
    height 100vh
}
img {
    width 100%
    margin-top 20%
}
h6 {
    margin 1rem 0 0
}
p {
    font-size 14px
}

</style>
