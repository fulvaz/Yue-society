import Vuex from 'vuex'
import Vue from 'vue'
import * as actions from './actions.js'
import MeInfo from './modules/MeInfo.js'
import MeSelectable from './modules/MeSelectable'
import MeState from './modules/MeState'

Vue.use(Vuex)

const instance = new Vuex.Store({
  actions,
  modules: {
    MeSelectable,
    MeInfo,
    MeState
  }
})

export default instance
