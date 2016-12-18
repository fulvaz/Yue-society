/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as type from '../mutation-types.js'
import config from '../../config/setting.js'
import Vue from 'vue'

const state = {
  degree: {},
  lunar: {},
  bloodtype: {},
  sex: {},
  nation: {},
  marriage: {},
  house: {},
  faith: {},
  starssign: {},
  car: {}
}

const actions = {
  fetchSelectableItem (context, val) {
    return new Promise((resolve, reject) => {
      Vue.http.get(config.meSelectableApi).then((response) => {
        let remoteData
        if (typeof response.body === 'object') remoteData = response.body
        else remoteData = JSON.parse(response.body)
        context.commit(type.SAVE_SELECTABLE_ITEM, remoteData)
        resolve(remoteData)
      }, (err) => {
        reject(err)
      })
    })
  }
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
