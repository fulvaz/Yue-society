// 其实是app内文字的资源文件, 不知道为什么来这里了
let exp = {}
export let text = {
  shareTitle: '月正圆',
  shareDesc: '爱情导航',
  NEW_MOMENT_SUCCESS: '发布动态成功',
  LIKE_MOMENT_FAILED: '请重新点赞',
  NO_NEW_DATA: '没有新数据了',
  SEARCH_EMPTY: '找不到您所需要的结果',
  NEW_POST_SUCCESS: '发布帖子成功',
  NEW_POST_FAIL: '出现网络错误, 请重试',
  NEW_ACT_SUCCESS: '发布帖子成功',
  NEW_ACT_FAIL: '出现网络错误, 请重试'
}

export let errMsg = {
  // 错误信息
  'stateInfo': '4001 网络错误, 重试中. 如无效请返回公众号重试'
}

exp.install = function (Vue, options) {
  // 1. add global method or property
  Vue.$text = text
  Vue.prototype.$text = text
  Vue.$errMsg = errMsg
  Vue.prototype.$errMsg = errMsg

  // 1. global method
  //  Vue.Toast.toast = toast
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

export default exp
