import vue from 'vue'
import config from '../config/setting.js'
import wx from 'weixin-js-sdk'
import * as utils from '../utils/utils.js'

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

export const sendMeInfo = function (uid, info) {
  return new Promise((resolve, reject) => {
    vue.http.put(`${config.meUpdate}`, info).then(response => {
      resolve(response)
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

// applyCircleApi
export const applyForCircle = function () {
  return new Promise((resolve, reject) => {
    vue.http.post(config.applyCircleApi).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const fetchMsgList = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.msgList).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const resetUidCount = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.resetUidCount, {uid: uid}).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getChat = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.chat + '/' + uid).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const replyMsg = function (uid, msg) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.replyMsg + '/' + uid, msg).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getFocused = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.focused).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getLooked = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.looked).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getRecommend = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.recommend).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getWXConfig = function (url) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.wxConfig + window.encodeURIComponent(url)).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getUser = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.userApi + '/' + uid).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getAlbum = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.album + '/' + uid).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const uploadImageId = function (msg) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.uploadImage, msg).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const focus = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.focus, {uid}).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const unfocus = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.unfocus, {uid}).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const wxAuth = function (href, jsApiList) {
  return new Promise((resolve, reject) => {
    getWXConfig(href).then(response => {
      let wxConfig = utils.response2Data(response)
      wxConfig.jsApiList = jsApiList
      wxConfig.debug = config.dev

      // 开始认证
      wx.config(wxConfig)
      wx.ready(function (res) {
        resolve(res)
      })
      wx.error(function (res) {
        reject(res)
      })
    })
  })
}

export const wxChooseImage = function () {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

export const wxPreviewImage = function (current, urls) {
  wx.previewImage({
    current,
    urls
  })
}

export const wxUploadImage = function (localId) {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        // 上传成功就向服务端发送id
        uploadImageId({serverId: res.serverId}).then(response => {
          resolve(response)
        }).catch(response => {
          reject(response)
        })
      },
      fail: res => reject(res)
    })
  })
}

export const newPost = function (post) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.newPost, post).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getActivity = function (id) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.activityApi + '/' + id).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const takePartIn = function (msg) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.takePartInActivites, msg).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const authCircle = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.authCircle).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getCircleInfo = function (id) {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.circlesApi}/${id}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

function filterPL (page, limit) {
  if (page === undefined || limit === undefined) return ''
  let str = `/page/${page}/limitation/${limit}`
  let devStr = `?_page=${page}&_limit=${limit}`
  return config.dev ? devStr : str
}

// /posts/circles/1/page/1/limitation/20
export const getCirclePost = function (circleid, page, limit) {
  let api = config.dev ? `${config.circlesApi}/${circleid}/posts` : `${config.postsApi}/circles/${circleid}`
  return new Promise((resolve, reject) => {
    vue.http.get(api + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getCircleActivity = function (circleid, page, limit) {
  let api = config.dev ? `${config.circlesApi}/${circleid}/activities` : `${config.postsApi}/activities/${circleid}`
  console.log(api)
  return new Promise((resolve, reject) => {
    vue.http.get(api + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}
