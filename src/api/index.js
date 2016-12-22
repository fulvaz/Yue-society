import vue from 'vue'
import config from '../config/setting.js'

/*
  依赖: 要求使用前vue实例必须use(vue-resource)
*/

export const fetchSpouse = function (data) {
  data = data || {}
  return new Promise((resolve, reject) => {
    vue.http.get(config.spouseApi).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, (err) => {
      reject(err)
    })
  })
}

export const fetchSelectableItem = function (data) {
  data = data || {}
  return new Promise((resolve, reject) => {
    vue.http.get(config.meSelectableApi).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, (err) => {
      reject(err)
    })
  })
}

export const fetchCircleRecommend = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.circlesRecommendsApi).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, (response) => {
      reject(response)
    })
  })
}

export const fetchActivitiesRecommend = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.activitiesRecommendsApi).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, (response) => {
      reject(response)
    })
  })
}

export const fetchUserRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.usersRecommendsApiFilter(page, limit)).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, (response) => {
      reject(response)
    })
  })
}
