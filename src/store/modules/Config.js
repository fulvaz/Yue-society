/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as type from '../mutation-types.js'
import config from '../../config/setting.js'
import Vue from 'vue'

const state = {

}

const actions = {

}

const mutations = {
  [type.SAVE_SELECTABLE_ITEM] (state, payload) {
    state = Object.assign(state, payload)
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
