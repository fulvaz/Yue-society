/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as api from '../../api/index.js'

const state = {
  joinedCircles: [],
  unreadMsg: 0,
  uid: 0,
  nickname: '',
  avatar: '',
  focus: []
}

const actions = {
  fetchMeState (context, callback) {
    api.fetchStateInfo().then(response => {
      context.commit('SAVE_ME_STATE', response)
      if (callback) callback()
    }).catch(response => {
      if (callback) callback()
      console.error(response)
    })
  },
  readMsg (context, val) {
    api.resetUidCount(val.uid)
    context.commit('DECREASE_UNREADMSG', val.unread)
  },
  focus (context, uid) {
    context.commit('FOCUS', uid)
  },
  unfocus (context, uid) {
    context.commit('UNFOCUS', uid)
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
  },
  UNFOCUS (state, payload) {
    let index = state.focus.indexOf(payload)
    if (index > -1) state.focus.splice(index, 1)
  },
  FOCUS (state, payload) {
    state.focus.push(payload)
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
