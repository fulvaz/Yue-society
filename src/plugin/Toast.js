import {Toast, Indicator} from 'mint-ui'

// 本来只是Toast 但是不知道为什么现在变成了错误处理工具
let toastExport = {
  Indicator: Indicator
}

let errCode = {
  4000: '未知错误',
  4001: 'stateInfo错误'
}

let msgs = {
  'ENTER_ACTIVITY_SUCCESS': '参加活动成功',
  'ENTER_ACTIVITY_FAIL': '网络错误, 请稍后重试',
  'NEW_POST_SUCCESS': '已发布新帖子',
  'NEW_POST_FAIL': '发布失败, 请稍后重试',
  'REPLY_POST_SUCCESS': '回复成功',
  'REPLY_POST_FAIL': '回复失败, 请稍后重试',
  'SEND_MSG_FAIL': '发送消息失败, 请稍后重试',
  'SEND_MSG_SUCCESS': '发送消息成功',
  'APPLY_CIRCLE_SUCCESS': '已发送申请',
  'APPLY_CIRCLE_FAIL': '网络错误, 请稍后重试',
  'PAY_SUCCESS': '购买成功',
  'PAY_BALANCE_NOT_ENOUGH': '余额不足',
  'PAY_FAIL': '购买失败',
  'EDIT_BASIC_SUCCESS': '更新个人信息成功',
  'EDIT_BASIC_FAIL': '更新个人信息失败, 请重试',
  'EDIT_CONDITION_SUCCESS': '更新择偶条件成功',
  'EDIT_CONDITION_FAIL': '网络错误, 请稍后重试',
  'APPOINTMENT_REQ_SUCCESS': '发送约会请求成功',
  'APPOINTMENT_REQ_FAIL': '网络错误, 请稍后重试',
  'UPLOAD_IMAGE_SUCCESS': '上传图片成功',
  'DELETE_IMAGE_SUCCESS': '删除图片成功',
  'UPLOAD_IMAGE_FAIL': '图片上传失败',
  'REG_SUCCESS': '注册成功',
  'QUIT_CIRCLE_SUCCESS': '退出圈子成功',
  'SEARCH_FALED': '网络错误, 请重试'
}

// 用于get获取数据网络错误 一般只用在首次数据加载 后面异步加载不用使用这个方法处理异常!
// 因为处理的方式是重新加载页面!
function handleNetErrWithReload () {
  toast('网络错误, 正在为你重新加载')
  setTimeout(e => {
    // window.location.reload()
  }, 5000)
}

// 当显示页面所必须的数据加载出错用这个方法处理
// 现在需要用这个方法的错误有 微信认证 stateInfo 基本都是刚加载页面时错误都可以用这个
function handleFatalErr () {
  openIndicator()
  handleNetErrWithReload()
}

function toast (msg) {
  Toast({
    message: msg,
    position: 'bottom'
  })
}

function toastMsg (msg, ifCustom) {
  msg = ifCustom ? msg : msgs[msg]
  Toast({
    message: msg,
    position: 'bottom'
  })
}

function toastNetErrMsg (code) {
  toastMsg(code + ' - 网络错误', true)
}

function openIndicator (msg) {
  Indicator.open(msg)
}

function closeIndicator () {
  Indicator.close()
}

function handleSuccess (msg, ifCustom) {
  toastMsg(msg, ifCustom)
  closeIndicator()
}

function handleFail (msg, ifCustom) {
  toastMsg(msg, ifCustom)
  closeIndicator()
}

function handleFailWithCode (status, statusText) {
  toast(`${status} ${statusText}`)
  closeIndicator()
}

function handleAllFail (res) {
  let status = '4000'
  let text = '未知错误'
  // HTTP Err
  if (res.status !== undefined) status = res.status
  if (res.statusText !== undefined) text = res.statusText
  if (res instanceof Error) {
    text = res.toString()
    console.error(res)
  }

  // 微信
  if (res.errMsg) {
    status = ''
    text = res.errMsg + ' 请重试'
  }

  handleFailWithCode(status, text)
}

toastExport.install = function (Vue, options) {
  // 1. add global method or property
  Vue.prototype.toastMsg = toastMsg
  Vue.prototype.openIndicator = openIndicator
  Vue.prototype.closeIndicator = closeIndicator
  Vue.prototype.handleSuccess = handleSuccess
  Vue.prototype.handleFail = handleFail
  Vue.prototype.toastNetErrMsg = toastNetErrMsg
  Vue.prototype.handleFailWithCode = handleFailWithCode
  Vue.prototype.handleAllFail = handleAllFail
  Vue.prototype.handleNetErrWithReload = handleNetErrWithReload
  Vue.prototype.handleFatalErr = handleFatalErr
  Vue.prototype.toast = toast
  Vue.prototype.errCode = errCode
  Vue.Toast = {}
  Vue.Toast.toast = toast
  Vue.Toast.openIndicator = openIndicator
  // 2. add a global asset
  // Vue.directive('my-directive', {
  //   bind (el, binding, vnode, oldVnode) {
  //     // something logic ...
  //   }
  //   ...
  // })
  // 3. inject some component options
  // Vue.mixin({
  //   created: function () {
  //     // something logic ...
  //   }
  //   ...
  // })
  // 4. add an instance method
  // Vue.prototype.toastMsg = function (msg) {
  //   Toast({
  //     message: msg,
  //     position: 'bottom'
  //   })
  // }
}

export default toastExport
