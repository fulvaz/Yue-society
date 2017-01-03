/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as type from '../mutation-types.js'
import * as api from '../../api/index.js'

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
    api.fetchSelectableItem().then(response => {
      context.commit(type.SAVE_SELECTABLE_ITEM, response)
    }).catch(response => {
      console.error(response)
    })
  }
}

const mutations = {
  [type.SAVE_SELECTABLE_ITEM] (state, payload) {
    state = utils.objAssign(state, payload)
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
