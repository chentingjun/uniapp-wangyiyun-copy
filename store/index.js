import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
        removeItem: key => uni.removeStorageSync(key)
      },
      // 存储指定数据
      reducer(state) {
        return {
          userinfo: state.userinfo
        }
      }
    })
  ]
})
export default store
