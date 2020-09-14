// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'
// 将 vuex 持久化到 本地缓存中
import VuexPersistence from 'vuex-persist'


import {UniStorage} from '@/common/uni-storage'

Vue.use(Vuex)

// 实例化 VuexPersistence 对象
const vuexLocal = new VuexPersistence({
  storage: new UniStorage()
})

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken (state, value) {
      state.token = value
    }
  },
  plugins: [vuexLocal.plugin]
})
