/**
 *
 * Created by fulvaz on 16/12/18.
 */

const state = {
  idSelected: 0
}

const actions = {
  itemClicked (context, val) {
    if (val === undefined) val = -1
    context.commit('CHANGE_SELECTED_ID', val)
  }
}

const mutations = {
  CHANGE_SELECTED_ID (state, id) {
    state.idSelected = id
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
