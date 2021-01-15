import Vue from 'vue'
import Vuex from 'vuex'
import * as post from './modules/Post';
import * as user from './modules/User';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    post,
    user
  }
})
