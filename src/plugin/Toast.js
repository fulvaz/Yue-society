import {Toast, Indicator} from 'mint-ui'

let toast = {}

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
  'PAY_FAIL': '购买失败',
  'EDIT_BASIC_SUCCESS': '修改个人信息成功',
  'EDIT_BASIC_FAIL': '修改个人信息失败, 请重试',
  'APPOINTMENT_REQ_SUCCESS': '发送约会请求成功',
  'APPOINTMENT_REQ_FAIL': '网络错误, 请稍后重试',
  'UPLOAD_IMAGE_SUCCESS': '上传图片成功',
  'UPLOAD_IMAGE_FAIL': '图片上传失败'
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

function openIndicator () {
  Indicator.open()
}

function closeIndicator () {
  Indicator.close()
}

function handleSuccess (msg) {
  toastMsg(msg)
  closeIndicator()
}

function handleFail (msg) {
  toastMsg(msg)
  closeIndicator()
}

toast.install = function (Vue, options) {
  // 1. add global method or property
  Vue.prototype.toastMsg = toastMsg
  Vue.prototype.openIndicator = openIndicator
  Vue.prototype.closeIndicator = closeIndicator
  Vue.prototype.handleSuccess = handleSuccess
  Vue.prototype.handleFail = handleFail
  Vue.prototype.toastNetErrMsg = toastNetErrMsg
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

export default toast