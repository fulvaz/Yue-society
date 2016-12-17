import Vuex from 'vuex'
import Vue from 'vue'
import * as actions from './actions.js'
import MeInfo from './modules/MeInfo.js'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    MeInfo
  }
})
