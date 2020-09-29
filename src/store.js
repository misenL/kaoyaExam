import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 在这里添加需要全局维护的状态
const state = {
  // 全局存储用户信息
  userInfo: null,
  // 用户当前选择的考场信息
  examInfo: null,
  updateUserInfoFlag: false,
  gotUserInfoFlag: false
}

// getters 可根据需要使用
const getters = {
  userInfo (state) {
    return state.userInfo
  },
  examInfo (state) {
    return state.examInfo
  }
}

// actions 跟 mutations 作用相同，不过是异步操作
const actions = {
}

// mutations 修改共享状态 同步操作
// 在这里添加更改全局状态的方法
const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  toggleUpdateUserInfoFlag (state) {
    state.updateUserInfoFlag = !state.updateUserInfoFlag
  },
  setGotUserInfoFlagTrue (state) {
    state.gotUserInfoFlag = true
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
