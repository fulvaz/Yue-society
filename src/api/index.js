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
      let remoteData = utils.response2Data(response)
      resolve(remoteData)
    }, (err) => {
      reject(err)
    })
  })
}

export const fetchMyCircle = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.myCircles + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, (err) => {
      reject(err)
    })
  })
}

export const fetchCircleRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.circlesRecommendsApi + filterPL(page, limit)).then((response) => {
      resolve(response)
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

export const searchCircles = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.searchCircles, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const searchUsers = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.searchUsers, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
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
      resolve(response)
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

export const getWhomIFocus = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.whomIFocus).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getAppointments = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.meAppointments).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getAppointed = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(config.meAppointed).then(response => {
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

export const uploadImageId = function (serverId) {
  let data = {serverId: serverId}
  return new Promise((resolve, reject) => {
    vue.http.post(config.uploadImage, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const uploadImageIds = function (serverIds) {
  return new Promise((resolve, reject) => {
    function inner (ids) {
      uploadImageId(ids.pop()).then(res => {
        if (ids.length !== 0) {
          console.log(ids.length)
          inner(ids)
        } else {
          resolve(serverIds)
        }
      }).catch(res => {
        reject(res)
      })
    }
    inner(serverIds)
  })
}

export const uploadAvatarId = function (serverId) {
  let data = serverId
  return new Promise((resolve, reject) => {
    vue.http.post(config.uploadAvatar, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const focus = function (uid) {
  return new Promise((resolve, reject) => {
    let data = {
      uid
    }
    vue.http.post(config.focus, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const unfocus = function (uid) {
  let data = {
    uid
  }
  return new Promise((resolve, reject) => {
    vue.http.post(config.unfocus, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

// 这是个必须做重试处理的api, 应该在进入页面时就开始做, 否则直接刷新页面
// 不要问为啥, 被这个坑惨了
export const wxAuth = function (jsApiList) {
  return new Promise((resolve, reject) => {
    getWXConfig(window.location.pathname + window.location.hash).then(response => {
      let wxConfig = utils.response2Data(response)
      wxConfig.jsApiList = jsApiList
      if (process.env.NODE_ENV === 'development') wxConfig.debug = true
      // 开始认证
      wx.config(wxConfig)
      wx.ready(function (res) {
        resolve(res)
      })
      wx.error(function (res) {
        reject(res)
      })
    }).catch(res => {
      reject(res)
    })
  })
}

export const wxChooseImage = function (count) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: count, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      },
      cancel: function (res) {
        res.errMsg = ''
        res.status = ''
        res.statusText = ''
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
        resolve(res)
      },
      fail: res => reject(res)
    })
  })
}

export const wxUploadImages = function (localIds) {
  return new Promise((resolve, reject) => {
    function inner (ids) {
      wxUploadImage(ids.pop()).then(res => {
        serverIds.push(res.serverId)
        if (ids.length !== 0) {
          inner(ids)
        } else {
          resolve(serverIds)
        }
      }).catch(res => {
        reject(res)
      })
    }

    let serverIds = []
    inner(localIds)
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

export const authCircle = function (circleId) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.authCircle + '/' + circleId).then(response => {
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

export const getCircleMoments = function (circleid, page, limit) {
  let api = `${config.getCircleMoments}/${circleid}`
  return new Promise((resolve, reject) => {
    vue.http.get(api + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getMyMoments = function (uid, page, limit) {
  let api = `${config.getMyMoments}/${uid}`
  return new Promise((resolve, reject) => {
    vue.http.get(api + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const newMyMoment = function (data) {
  let api = `${config.newMyMoment}`
  return new Promise((resolve, reject) => {
    vue.http.post(api, data).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const newCircleMoment = function (data) {
  let api = `${config.newCircleMoments}`
  return new Promise((resolve, reject) => {
    vue.http.post(api, data).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const likeMoment = function (data) {
  let api = `${config.likeMoment}`
  return new Promise((resolve, reject) => {
    vue.http.post(api, data).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getCircleActivity = function (circleid, page, limit) {
  let api = `${config.circlesApi}/${circleid}/activities`
  return new Promise((resolve, reject) => {
    vue.http.get(api + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const joinCircle = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.joinCircle, data).then(response => {
      resolve(response)
    }, res => {
      reject(res)
    })
  })
}

export const getActivitiesJoined = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.activitiesJoined}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getConsumeHistory = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.consumeHistory}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getBuyVipPage = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.buyVipPage}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getBuyCirclePage = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.buyCirclePage}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const buyVip = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.put(config.buyVip, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const buyCircle = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.put(config.buyCircle, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const makeAppointment = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.put(config.makeAppointment, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getAppointmentPageInfo = function (uid) {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.userApi}/${uid}/meeting`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getReg = function () {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.getReg}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getVerifyCode = function (mobile) {
  return new Promise((resolve, reject) => {
    vue.http.get(`${config.getVerify}/${mobile}`).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const sendReg = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.put(`${config.sendReg}`, data).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

// GET /circles/members/{circleId}/page/{page}/limitation/{limit}
export const getCircleMember = function (circleId, page, limit) {
  return new Promise((resolve, reject) => {
    let api = config.dev ? `${config.circleMember}?_page=${page}&_limit=${limit}` : `${config.circleMember}/${circleId}/page/${page}/limitation/${limit}`
    vue.http.get(api).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getRecentLogin = function (page, limit) {
  return new Promise((resolve, reject) => {
    let api = config.dev ? `${config.recentLogin}?_page=${page}&_limit=${limit}` : `${config.recentLogin}/page/${page}/limitation/${limit}`
    vue.http.get(api).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

// GET /search/users/newSignUp/page/{page}/limitation/{limit}
export const getRecentReg = function (page, limit) {
  return new Promise((resolve, reject) => {
    let api = config.dev ? `${config.recentReg}?_page=${page}&_limit=${limit}` : `${config.recentReg}/page/${page}/limitation/${limit}`
    vue.http.get(api).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getSearchRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    let api = config.dev ? `${config.searchRecommend}?_page=${page}&_limit=${limit}` : `${config.searchRecommend}/page/${page}/limitation/${limit}`
    vue.http.get(api).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

// getSliderContent
export const getSliderContent = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.getSliderContent).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getQrCode = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.getQrCode).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const deletePhoto = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.put(`${config.deletePhoto}`, data).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const quitCircle = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.quitCircle, data).then(res => {
      resolve(res)
    }, res => {
      reject(res)
    })
  })
}

export const wxShareCircle = function (title, link, imgUrl) {
  return new Promise((resolve, reject) => {
    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接
      imgUrl, // 分享图标
      success: function () {
          // 用户确认分享后执行的回调函数
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
    })
  })
}

export const wxShareFriend = function (title, link, imgUrl, desc) {
  return new Promise((resolve, reject) => {
    wx.onMenuShareAppMessage({
      title,
      desc,
      link,
      imgUrl,
      success: function () {
        resolve()
      },
      cancel: function () {
        reject()
      }
    })
  })
}

/**
send:
```
 uid,
 circleId,
 title,
 content
```
*/
export const newActivity = function (data) {
  return new Promise((resolve, reject) => {
    vue.http.post(config.newActivity, data).then(response => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getTopicRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.getTopicRecommend + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getPaidUserRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.getPaidUserRecommend + filterPL(page, limit)).then((response) => {
      resolve(response)
    }, response => {
      reject(response)
    })
  })
}

export const getUserRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.usersRecommendsApiFilter(page, limit)).then((response) => {
      resolve(response)
    }, (response) => {
      reject(response)
    })
  })
}

export const getActivitiesRecommend = function (page, limit) {
  return new Promise((resolve, reject) => {
    vue.http.get(config.activitiesRecommendsApi).then((response) => {
      resolve(response)
    }, (response) => {
      reject(response)
    })
  })
}
