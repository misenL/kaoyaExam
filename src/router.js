import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BizHome from './views-biz/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'userLogin',
      meta: {
        title: '注册'
      },
      component: () => import(/* webpackChunkName: "login" */ './Login.vue')
    },
    {
      path: '/choice',
      name: 'userChoice',
      meta: {
        title: '选择考场'
      },
      component: () => import(/* webpackChunkName: "choice" */ './Choice.vue')
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/exam',
          name: 'exam',
          meta: {
            title: '考场导航'
          },
          component: () => import(/* webpackChunkName: "exam" */ './views/Exam.vue')
        },
        {
          path: '/goods',
          name: 'goods',
          meta: {
            title: '小智助考'
          },
          component: () => import(/* webpackChunkName: "goods" */ './views/Goods.vue')
        },
        {
          path: '/mine',
          name: 'mine',
          meta: {
            title: '个人中心'
          },
          component: () => import(/* webpackChunkName: "mine" */ './views/Mine.vue')
        },
      ]
    },
    // 周边服务
    {
      path: '/around',
      name: 'around',
      meta: {
        title: '周边服务'
      },
      component: () => import(/* webpackChunkName: "goodsepay" */ './views/around/index.vue')
    },
    // 考场导航
    {
      path: '/examNumberMap',
      name: 'examNumberMap',
      meta: {
        title: '查询考场号'
      },
      component: () => import(/* webpackChunkName: "exam" */ './views/ExamNumberMap.vue')
    },
    // 行业测评
    {
      path: '/ATA',
      name: 'ATA',
      meta: {
        title: '行业测评'
      },
      component: () => import(/* webpackChunkName: "exam" */ './views/ATA/index.vue')
    },
    // goods page
    {
      path: '/goods/pay',
      name: 'goodspay',
      meta: {
        title: '结算'
      },
      component: () => import(/* webpackChunkName: "goodsepay" */ './views/Goods/Pay.vue')
    },
    {
      path: '/goods/detail',
      name: 'goodsdetail',
      meta: {
        title: '商品详情'
      },
      component: () => import(/* webpackChunkName: "goodsdetail" */ './views/Goods/GoodsDetail.vue')
    },
    // lostFound page
    {
      path: '/goods/lostList',
      name: 'lostList',
      meta: {
        title: '失物招领'
      },
      component: () => import(/* webpackChunkName: "goodsdetail" */ './views/lostFound/lostList.vue')
    },
    {
      path: '/goods/lostList/lostDetail',
      name: 'lostDetail',
      meta: {
        title: '失物招领'
      },
      component: () => import(/* webpackChunkName: "goodsdetail" */ './views/lostFound/lostDetail.vue')
    },
    {
      path: '/goods/lostList/lostPublish',
      name: 'lostPublish',
      meta: {
        title: '失物招领'
      },
      component: () => import(/* webpackChunkName: "goodsdetail" */ './views/lostFound/lostPublish.vue')
    },
    // mine page
    {
      path: '/service/list',
      name: 'servicelist',
      meta: {
        title: '我的订单'
      },
      component: () => import(/* webpackChunkName: "servicelist" */ './views/Mine/ServiceList.vue')
    },
    {
      path: '/service/detail',
      name: 'servicedetail',
      meta: {
        title: '订单详情'
      },
      component: () => import(/* webpackChunkName: "servicedetail" */ './views/Mine/ServiceDetail.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      meta: {
        title: '个人资料'
      },
      component: () => import(/* webpackChunkName: "contact" */ './views/Mine/Contact.vue')
    },
    {
      path: '/update/phone',
      name: 'updatephone',
      meta: {
        title: '修改手机号'
      },
      component: () => import(/* webpackChunkName: "updatephone" */ './views/Mine/UpdatePhone.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      meta: {
        title: '用户反馈'
      },
      component: () => import(/* webpackChunkName: "feedback" */ './views/Mine/Feedback.vue')
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      meta: {
        title: '关于我们'
      },
      component: () => import(/* webpackChunkName: "feedback" */ './views/Mine/AboutUs.vue')
    },
    // 商家端
    {
      path: '/biz/login',
      meta: {
        title: '注册'
      },
      component: () => import(/* webpackChunkName: "bizlogin" */ './BizLogin.vue')
    },
    {
      path: '/biz/confirmJoin',
      meta: {
        title: '小智助考'
      },
      component: () => import(/* webpackChunkName: "bizlogin" */ './confirmJoin.vue')
    },
    {
      path: '/biz/order/record',
      meta: {
        title: '订单列表'
      },
      component: () => import(/* webpackChunkName: "bizOrderDetails" */ './views-biz/Profit/OrderRecord.vue')
    },
    {
      path: '/biz/order/detail',
      meta: {
        title: '订单详情'
      },
      component: () => import(/* webpackChunkName: "bizOrderDetails" */ './views-biz/Profit/bizOrderDetails.vue')
    },
    {
      path: '/biz/cash',
      meta: {
        title: '申请提现'
      },
      component: () => import(/* webpackChunkName: "cash" */ './views-biz/Profit/Cash.vue')
    },
    {
      path: '/biz/cashlist',
      meta: {
        title: '提现记录'
      },
      component: () => import(/* webpackChunkName: "cashlist" */ './views-biz/Profit/CashList.vue')
    },
    {
      path: '/biz/verify/confirm',
      meta: {
        title: '核销商品'
      },
      component: () => import(/* webpackChunkName: "bizverifyconfirm" */ './views-biz/Verify/VerifyConfirm.vue')
    },
    // 联系管理员
    {
      path: '/contactAdmin',
      meta: {
        title: '联系管理员'
      },
      component: () => import(/* webpackChunkName: "bizverifyconfirm" */ './views-biz/contactAdmin.vue')
    },
    // tabbar
    {
      path: '/biz',
      component: BizHome,
      children: [
        {
          path: 'verify',
          meta: {
            title: '核销'
          },
          component: () => import(/* webpackChunkName: "verify" */ './views-biz/Verify.vue')
        },
        {
          path: 'profit',
          meta: {
            title: '收益'
          },
          component: () => import(/* webpackChunkName: "profit" */ './views-biz/Profit.vue')
        },
        {
          path: 'mine',
          meta: {
            title: '个人中心'
          },
          component: () => import(/* webpackChunkName: "mine" */ './views-biz/Mine.vue')
        }
      ]
    },
    // 商家页面
    {
      path: '/biz/profit/invitedQR',
      meta: {
        title: '邀请成员'
      },
      component: () => import(/* webpackChunkName: "bizlogin" */ './views-biz/InvitedQR.vue')
    },
    {
      path: '/biz/profit/myProfit',
      meta: {
        title: '我的收益'
      },
      component: () => import('./views-biz/Profit/myProfit.vue')
    },
    {
      path: '/choiceBiz',
      meta: {
        title: '切换商家'
      },
      component: () => import('./views-biz/choiceBiz.vue')
    },
    // 考务端
    {
      path: '/invigilator/login',
      meta: {
        title: '考务人员注册'
      },
      component: () => import('./InvigilatorLogin.vue')
    },
    {
      path: '/invigilator/examList',
      meta: {
        title: '考试列表'
      },
      component: () => import('./examList.vue')
    },
    {
      path: '/invigilator/trainDocument',
      meta: {
        title: '培训文档'
      },
      component: () => import('./views-kw/trainDocument.vue')
    },
    {
      path: '/invigilator/answer',
      meta: {
        title: '答题'
      },
      component: () => import('./views-kw/answer.vue')
    },
    {
      path: '/invigilator/seeExamNum',
      meta: {
        title: '查看考场'
      },
      component: () => import('./views-kw/seeExamNum.vue')
    },
  ]
})
