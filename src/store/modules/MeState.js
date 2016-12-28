/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as api from '../../api/index.js'

const state = {
  joinedCircles: [],
  unreadMsg: 0
}

const actions = {
  fetchMeState (context, val) {
    api.fetchStateInfo().then(response => {
      context.commit('SAVE_ME_STATE', response)
    }).catch(response => {
      console.error(response)
    })
  },
  readMsg (context, val) {
    api.resetUidCount(val.uid)
    context.commit('DECREASE_UNREADMSG', val.unread)
  }
}

const mutations = {
  SAVE_ME_STATE (state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
  },
  DECREASE_UNREADMSG (state, payload) {
    state.unreadMsg -= payload
  }
}

const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}
