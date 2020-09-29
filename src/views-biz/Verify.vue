<template>
	<div class="container">
		<!-- <router-link to="/biz/verify/confirm"> -->
			<div class="blue-circle" @click="scanCode">
				<van-icon name="scan" />
			</div>
			<div class="verify">
				开始验证
			</div>
		<!-- </router-link> -->
	</div>
</template>

<script>
import Base64 from 'js-base64'

export default {
	data () {
		return {
			
		}
	},
	created () {
		// console.log('location:',location.href.split('?').indexOf('id=1'));
		// if (location.href.split('?').indexOf('session=1') === 1 ) {
		// 	console.log('if if=======');
		// 	location.href=location.href.split('?')[0]
		// }
	},
	methods: {
		initWx () {
			let thisUrl = 'api/wechat/getjssdk?url=' + Base64.Base64.encode(location.href.split('#')[0])
			console.log('location.href.split:', location.href.split('#')[0]);
			console.log('initWx:', thisUrl)
			// 向服务端提供授权url参数，并且不需要#后面的部分
			return this.axios.get(thisUrl)
				.then(res => {
				res = res.data
				console.log('get wx res: ', res);
				
				let that = this
				that.wx.config({
					debug: false, // 开启调试模式,
					appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
					timestamp: res.timestamp, // 必填，生成签名的时间戳
					nonceStr: res.nonceStr, // 必填，生成签名的随机串
					signature: res.signature, // 必填，签名，见附录1
					jsApiList: ['scanQRCode']
					// jsApiList: res.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				})
				})
				.catch(err => {
					console.log('.catch(err:', err);
					this.$notify('获取微信授权失败')
				})
		},
		scanCode () {
			console.log('scanCode');
			this.initWx().then(res => {
				console.log('wx:', res);
				let that = this
				that.wx.ready(function () {
					that.wx.scanQRCode({
						needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
						scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
						success: function (res) {
							var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
						}
					})
				})
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.blue-circle
	width 4rem 
	height 4rem
	margin 4.6rem 3rem 1rem 
	border-radius 50%
	background $main-blue
	.van-icon
		margin-top .5rem
		font-size 3rem
		color white
.verify
	font-size $font-size-big
	color black
</style>
