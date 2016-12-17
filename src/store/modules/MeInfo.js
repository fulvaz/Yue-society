import * as type from '../mutation-types'
// import config from '../../config/setting'
// import Vue from 'vue'
// const _this = Vue
const mutations = {
  [type.SAVE_ME_INFO] (state, payload) {
    state.id = payload.id
    state.nickname = payload.nickname
    state.realname = payload.realname
    state.birthday = payload.birthday
    state.province = payload.province
    state.city = payload.city
    state.height = payload.height
    state.weight = payload.weight
    state.age = payload.age
    state.income = payload.income
    state.school = payload.school
    state.degree = payload.degree
    state.lunarid = payload.lunarid
    state.bloodtype = payload.bloodtype
    state.sex = payload.sex
    state.nation = payload.nation
    state.marriage = payload.marriage
    state.house = payload.house
    state.car = payload.car
    state.birthplace = payload.birthplace
    state.faith = payload.faith
    state.starssign = payload.starssign
    state.isvip = payload.isvip
    state.looked = payload.looked
    state.focused = payload.focused
    state.balance = payload.balance
    state.perfection = payload.perfection
    state.avatar = payload.avatar
    state.album = payload.album
    state.recommender = payload.recommender
    state.account_status = payload.account_status
  }
}

const actions = {
  fetchMeInfo (context, val) {
    context.commit(type.SAVE_ME_INFO, val)
  }
}

const getters = {

}

const state = {
  id: 0,
  nickname: '',
  realname: '',
  birthday: 0,
  province: '',
  city: '',
  height: 0,
  weight: 0,
  age: 0,
  income: 0,
  school: '',
  degree: '',
  lunarid: '',
  bloodtype: '',
  sex: '',
  nation: '',
  marriage: '',
  house: '',
  car: '',
  birthplace: '',
  faith: '',
  starssign: '',
  isvip: 0,
  looked: 0,
  focused: 0,
  balance: 0,
  perfection: 0,
  avator: '',
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
