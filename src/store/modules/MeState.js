/**
 *
 * Created by fulvaz on 16/12/18.
 */
import * as api from '../../api/index.js'

const state = {
  joinedCircles: [],
  joinedActivities: [],
  appliedCircles: [],
  unreadMsg: 0,
  uid: 0,
  nickname: '',
  avatar: '',
  focus: []
}

const actions = {
  fetchMeState (context) {
    return new Promise((resolve, reject) => {
      api.fetchStateInfo().then(response => {
        context.commit('SAVE_ME_STATE', response)
        resolve(response)
      }).catch(response => {
        reject(response)
      })
    })
  },
  readMsg (context, val) {
    api.resetUidCount(parseInt(val.uid))
    context.commit('DECREASE_UNREADMSG', parseInt(val.unread))
  },
  focus (context, uid) {
    if (typeof uid !== 'number') uid = parseInt(uid)
    context.commit('FOCUS', uid)
  },
  unfocus (context, uid) {
    if (typeof uid !== 'number') uid = parseInt(uid)
    context.commit('UNFOCUS', uid)
  },
  takePartInActivity (context, circleId) {
    if (typeof circleId !== 'number') circleId = parseInt(circleId)
    context.commit('JOIN_ACTIVITY', circleId)
  },
  applyCircle (context, circleId) {
    if (typeof circleId !== 'number') circleId = parseInt(circleId)
    context.commit('APPLY_CIRCLE', circleId)
  }
}

const mutations = {
  JOIN_ACTIVITY (state, payload) {
    state.joinedActivities.push(payload)
  },
  APPLY_CIRCLE (state, payload) {
    state.appliedCircles.push(payload)
  },
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
