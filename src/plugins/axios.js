'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 使请求携带cookie
axios.defaults.withCredentials = true

// define the different HOST between development and production environment
// var DEV_HOST = 'http://zkapi.test'
var DEV_HOST = 'http://kaoya.huikaoedu.com'
var PUB_HOST = 'http://kaoya.huikaoedu.com'
// var DEV_HOST = JSON.stringify('http://localhost:8080')
// var PUB_HOST = JSON.stringify('http://{部署服务器ip和端口}')

let config = {
  baseURL: process.env.NODE_ENV === 'development' ? DEV_HOST : PUB_HOST
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
