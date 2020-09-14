import Vue from 'vue'
import uView from 'uview-ui'
import request from '~/uview-ui/libs/request'

import App from '@/App'
import store from '@/store/index.js'
// http拦截器设置
import httpInterceptor from '@/api/http.interceptor.js'
import {parse4URL, TOKEN_INVALID_EVENT} from '@/common/token-parse'

Vue.config.productionTip = false

// 挂载 vuex 到 vue实例中
Vue.prototype.$store = store
// 引入 uView 组件
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})


~(async () => {

  /*等待 vuex 从 本地缓存中初始化成功*/
  await app.$store.restored

  // 获取 static 静态文件夹下的域名配置信息
  // TODO 将 从serverConfig.json中 获取的数据，赋值到对象中，然后挂载到vue实例上，Vue.prototype.$appConfig
  const {BACKEND_BASE_URL} = await request.get('/h5/static/serverConfig.json')
  // 配置请求的baseUrl
  request.setConfig({baseUrl: BACKEND_BASE_URL})
  Vue.prototype.baseUrl = BACKEND_BASE_URL

  // 拦截器配置的挂载放在 request.setConfig() 后，防止拦截器配置被覆盖
  Vue.use(httpInterceptor, app)

  /*处理token信息*/
  const token = parse4URL(location.search) || app.$store.state.token
  // 跳转页面到登录页
  const navigateToLogin = () => {
    location.href = `${BACKEND_BASE_URL}/cas/login?redirect_uri=${location.href}`
  }

  if (token) {
    app.$store.commit('setToken', token)
  } else {
    navigateToLogin()
  }

  // 监听 从 http.interceptor.js 中 emit() 传递过来的 token失效事件
  app.$on(TOKEN_INVALID_EVENT, navigateToLogin)
  app.$mount()
})()
