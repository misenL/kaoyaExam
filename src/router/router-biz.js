import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/biz/login',
      meta: {
        title: '注册'
      },
      component: () => import(/* webpackChunkName: "bizlogin" */ './Login.vue')
    },
    {
      path: '/biz/order/record',
      meta: {
        title: '订单记录'
      },
      component: () => import(/* webpackChunkName: "bizorderrecord" */ './views/Profit/OrderRecord.vue')
    },
    {
      path: '/biz/cash',
      meta: {
        title: '申请提现'
      },
      component: () => import(/* webpackChunkName: "cash" */ './views/Profit/Cash.vue')
    },
    {
      path: '/biz/cashlist',
      meta: {
        title: '提现明细'
      },
      component: () => import(/* webpackChunkName: "cashlist" */ './views/Profit/CashList.vue')
    },
    {
      path: '/biz/verify/confirm',
      meta: {
        title: '核销商品'
      },
      component: () => import(/* webpackChunkName: "bizverifyconfirm" */ './views/Verify/VerifyConfirm.vue')
    },
    // tabbar
    {
      path: '/biz',
      component: Home,
      children: [
        {
          path: 'verify',
          meta: {
            title: '核销'
          },
          component: () => import(/* webpackChunkName: "verify" */ './views/Verify.vue')
        },
        {
          path: 'profit',
          meta: {
            title: '收益'
          },
          component: () => import(/* webpackChunkName: "profit" */ './views/Profit.vue')
        },
        {
          path: 'mine',
          meta: {
            title: '个人中心'
          },
          component: () => import(/* webpackChunkName: "mine" */ './views/Mine.vue')
        }
      ]
    },
    // 商家页面备胎
    {
      path: '/profitSpare',
      meta: {
        title: '备胎'
      },
      component: () => import(/* webpackChunkName: "bizlogin" */ './views-biz/Profit-spare.vue')
    }
  ]
})
