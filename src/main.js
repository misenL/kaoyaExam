import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible'
import wx from 'weixin-js-sdk'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import './plugins/vconsole.js'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.wx = wx

Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(Vant)
Vue.use(ElementUI)

// 修改title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
