import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    setLogin(state, param) {
      this.state.isLogin = true;
    },
  },
  actions: {
  },
  modules: {
  }
})
