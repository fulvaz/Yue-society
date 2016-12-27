/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as api from '../../api/index.js'

const state = {
  loaded: false,
  joinedCircles: []
}

const actions = {
  fetchSelectableItem (context, val) {
    api.fetchSelectableItem().then(response => {
      context.commit('SAVE_ME_STATE', response)
    }).catch(response => {
      console.error(response)
    })
  }
}

const mutations = {
  SAVE_ME_STATE (state, payload) {
    state = true
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
