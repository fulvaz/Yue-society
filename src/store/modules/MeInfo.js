import * as type from '../mutation-types'
import * as api from '../../api/index.js'
import config from '../../config/setting'
import Vue from 'vue'
// const _this = Vue
const mutations = {
  [type.SAVE_ME_INFO] (state, payload) {
    // state.uid = payload.id
    // state.nickname = payload.nickname
    // state.realname = payload.realname
    // state.birthday = payload.birthday // 服务端数据类型: 八位数字
    // state.province = payload.province // 发送省市id
    // state.city = payload.city
    // state.height = payload.height
    // state.weight = payload.weight
    // state.age = payload.age
    // state.income = payload.income
    // state.school = payload.school
    // state.degree = payload.degree
    // state.lunar = payload.lunar
    // state.bloodtype = payload.bloodtype
    // state.sex = payload.sex
    // state.nation = payload.nation
    // state.marriage = payload.marriage
    // state.house = payload.house
    // state.car = payload.car
    // state.birthplace = payload.birthplace
    // state.faith = payload.faith
    // state.starssign = payload.starssign
    // state.isvip = payload.isvip
    // state.looked = payload.looked
    // state.focused = payload.focused
    // state.balance = payload.balance
    // state.perfection = payload.perfection
    // state.avatar = payload.avatar
    // state.album = payload.album
    // state.recommender = payload.recommender
    // state.account_status = payload.account_status
    // state.userState = payload.userState
    state.loaded = true
    state = Object.assign(state, payload) // 貌似可靠的快速赋值方法
  },
  EDIT_ONE_STATE (state, payload) {
    state[payload.key] = payload.val
  }
}

const actions = {
  fetchMeInfo (context, val) {
    if (context.state.loaded) return
    api.fetchMeInfo().then(response => {
      context.commit(type.SAVE_ME_INFO, response)
    }).catch(response => {
      console.error(response)
    })
  },
  sendMeInfo (context, val) {
    delete val.infoLoaded
    Vue.http.put(`${config.userApi}/${val.id}`, val, {headers: {'Content-Type': 'application/json'}})
  },
  editProperty (context, payload) {
    context.commit('EDIT_ONE_STATE', payload)
  }
}

const getters = {

}

const state = {
  id: 0,
  avatar: '',
  infoLoaded: false,
  nickname: '',
  realname: '',
  birthday: 0,
  livingPlace: '',
  height: 0,
  weight: 0,
  age: 0,
  income: 0,
  school: '',
  degree: '',
  lunar: '',
  bloodtype: '',
  sex: '',
  nation: '',
  marriage: '',
  house: '',
  car: '',
  birthplace: '',
  faith: '',
  starsign: '',
  isvip: 0,
  looked: 0,
  loaded: false, // 读取标签位, 不发
  focused: 0,
  balance: 0,
  perfection: 0,
  album: '',
  recommender: '',
  account_status: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
