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

export const updateSpouse = function (id, data) {
  return new Promise((resolve, reject) => {
    vue.http.put(config.spouseApi, data).then((res) => {
      resolve(res)
    }, (res) => {
      reject(res)
    })
  })
}

export const fetchSelectableItem = function () {
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

export const fetchPost = function (id) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.postsApi + '/' + id).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, (res) => {
      reject(res)
    })
  })
}

export const fetchCircle = function (id) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.circlesApi + '/' + id).then(response => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, resp => {
      reject(resp)
    })
  })
}

export const replyPost = function (postId, data) {
  return new Promise((resolve, reject) => {
    vue.http.patch(config.postsApi + '/' + postId, data).then(response => {
      resolve(response)
    }, res => {
      reject(res)
    })
  })
}

export const search = function (query) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.searchApi + '/' + query).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const fetchSearchTags = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.searchTags).then(response => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, response => {
      reject(response)
    })
  })
}

export const fetchCircleByTag = function (query) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.circleByTag + '/' + query).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const fetchMeInfo = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.meApi).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, response => {
      reject(response)
    })
  })
}

export const fetchStateInfo = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.stateInfo).then((response) => {
      let remoteData
      if (typeof response.body === 'object') remoteData = response.body
      else remoteData = JSON.parse(response.body)
      resolve(remoteData)
    }, response => {
      reject(response)
    })
  })
}
