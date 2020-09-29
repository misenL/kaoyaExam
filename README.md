# kaoya
智考用户端和商家端

## 安装依赖
```
npm install
```

### 本地运行
```
npm run serve
```

### 打包发布
```
// 将build 得到的dist 目录内容直接放到服务器相应位置
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

test

## 项目结构

kaoya
|__mock                                     // 前期模拟假数据，请忽略...
|__node_modules                             // 依赖包，如果这个不懂请出门右拐
|__public                                   // 项目html文件入口
|   |__index.html                           // 页面入口，可在这里引入部分外链js。少用
|__src                                      // 项目所有组件功能文件夹
|   |__assets                               // 图片、icon等静态文件
|   |__components                           // 部分复用组件封装
|      |__Common                            // 部分复用组件封装
|         |__examBanner.vue                 // 服务和导航顶部的banner
|         |__tencentMap.vue                 // 腾讯地图组件
|   |__components-biz                       // 我也不知道是什么，估计上一任没删，hellowoerld。。。
|   |__plugins                              // 顾名思义，插件外挂的文件夹。导入axios、element以及vconsole
|      |__vconsole.js                       // 可以在移动端打印console的插件，关闭请注释里面代码
|   |__router                               // 路由配置文件夹，不要管这里的路由，真正的路由在外面的router.js文件里，这个是上一任遗留的。
|   |__views                                // 学生端！！！   功能组件文件夹
|       |__around                           // 周边服务页面文件夹，还未开发
|       |__ATA                              // 行业测评文件夹
|          |__index.vue                     // 行业测评首页
|       |__Goods                            // 商品详情文件夹
|          |__GoodsDetail.vue               // 商品详情页面
|          |__pay.vue                       // 一期测试写死的，垃圾代码不用管
|       |__lostFound                        // 失物招领文件夹
|          |__lostDetail.vue                // 失物详情页面
|          |__lostList.vue                  // 失物招领主页面，包含切换面板，在这里可切换报失或招领
|          |__lostPublish.vue               // 失物招领发布页面
|       |__Mine                             // 个人中心文件夹
|          |__AboutUs.vue                   // 关于我们主界面，这里切换公司介绍和联系我们面板
|          |__Contact.vue                   // 个人资料界面，展示个人资料以及修改
|          |__Feedback.vue                  // 之前的我的界面，现在没用了
|          |__ServiceDetail.vue             // 订单详情界面
|          |__ServiceList.vue               // 我的订单列表面板，切换展示未使用、已使用、已失效
|          |__UpdatePhone.vue               // 之前的我的界面，现在没用了
|       |__Exam.vue                         // 考场导航界面。PS：是底部tabbar切换过来的考场导航，不是首页里面的考场查询
|       |__ExamNumberMap.vue                // 查询考场号界面
|       |__Goods.vue                        // 小智助考主页面底部tabbar服务按钮指向的页面
|       |__Home.vue                         // 底部的tabbar按钮组件+ <router-view/>
|       |__Mine.vue                         // 个人中心主界面
|   |__views-biz                            // 商户端！！！   功能组件文件夹
|       |__Profit                           // 收益组件文件夹
|          |__bizOrderDetails.vue           // 订单列表界面，这里切换未使用、已使用、已失效面板
|          |__Cash.vue                      // 申请提现界面
|          |__CashList.vue                  // 提现记录界面
|          |__myProfit.vue                  // 我的收益界面
|          |__OrderRecord.vue               // 订单详情界面，在订单列表点击某一行跳转进来
|       |__Verify                           // 核销界面文件夹
|          |__VerifyConfirm.vue             // 核销商品的内容展示页
|       |__About.vue                        // 没啥用的垃圾组件
|       |__choiceBiz.vue                    // 顾名思义切换商家界面
|       |__contactAdmin.vue                 // 权限提示界面
|       |__Home.vue                         // 底部的tabbar按钮组件+ <router-view/>
|       |__InvitedQR.vue                    // 邀请成员界面
|       |__Mine.vue                         // 以前的页面，没啥用的垃圾组件
|       |__Profit.vue                       // 收益主界面，可在此进入其它子页面
|       |__Verify.vue                       // 核销界面
|   |__App.vue                              // 不懂的请出门右拐
|   |__BizLogin.vue                         // 商家端注册界面
|   |__Choice.vue                           // 学生端选择考场界面
|   |__confirmJoin.vue                      // 商家端员工扫瞄老板二维码显示的界面
|   |__Login.vue                            // 学生端注册界面
|   |__main.js                              // 不懂的请出门右拐
|   |__main.styl                            // 封装一些公用的css样式和变量
|   |__router.js                            // 路由配置文件，可在此修改路由内容
|   |__store.js                             // vuex配置、定义


PS:拿项目请先看README。若项目结构有修改，请及时更新。前人栽树后人乘凉         --Misen