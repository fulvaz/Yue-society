import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import localeMsg from './utils/zh_CN.js'
import localAttr from './utils/zh_CN_attr.js'
import Toast from './plugin/Toast.js'
import TextResouce from './plugin/Text.js'

import Index from 'components/Index'
import CircleIndex from 'components/circle/Index'
import Circle from 'components/circle/Circle'
import CircleMember from 'components/circle/MemberList'
import Registry from 'components/user/Registry'
import MeIndex from 'components/me/Index'
import MeInfo from 'components/me/Info'
import Test from 'components/Test'
import MeSpouse from 'components/me/Spouse'
import Post from 'components/posts/Post'
import Auth from 'components/Auth'
import SearchIndex from 'components/search/index'
import Search from 'components/search/search'
import SearchResult from 'components/search/result'
import Tag from 'components/search/tag'
import MessageList from 'components/message/index'
import Chat from 'components/message/chat.vue'
import Looked from 'components/me/Looked'
import Focused from 'components/me/Focused'
import Deposite from 'components/me/Deposite'
import Recommend from 'components/me/Recommend'
import MeAlbum from 'components/me/Album'
import MeAppointed from 'components/me/Appointed'
import BuyCircle from 'components/me/BuyCircle'
import User from 'components/user/User'
import Activity from 'components/circle/Activity'
import WhomIFocus from 'components/me/WhomIFocus'
import Service from 'components/me/Services'
import Appointment from 'components/me/Appointment'
import ActivitiesJoined from 'components/me/ActivitiesJoined'
import ConsumeHistory from 'components/me/ConsumeHistory'
import AppointmentRequest from 'components/user/Appointment'
import Demo from 'components/Demo'
import Share from 'components/me/RecommendShare'

import store from './store/index.js'
import * as utils from './utils/utils.js'
import config from './config/setting.js'

// import element ui
import 'element-ui/lib/theme-default/index.css'
import {Button} from 'element-ui'
Vue.component(Button.name, Button)

// register custom icon
import Icon from 'vue-awesome/components/Icon.vue'
Icon.register({
  'wx-circle': {
    width: 100,
    height: 100,
    d: 'M973.1,627c-2.7,10.1-5.8,20.1-9.1,30H615.1c12.2-8.8,23.4-18.9,33.2-30.3c3.7-4.3,7.2-8.7,10.6-13.3l43.1-42.9l20.4-20.3l232.1-231.3c16.2,39.9,27.2,82.4,32.3,126.8c2.1,18.1,3.3,36.5,3.3,55.2C990,544.5,984,586.8,973.1,627z M805.4,626.3l-0.5,0.5h0.5V626.3z M693.8,481.4c-0.4-5.6-1.1-11.3-2-16.9v-60.7v-28.7V48c39.8,16.8,77.7,39.1,112.8,66.9c14.3,11.3,28.2,23.5,41.5,36.7c31,30.9,56.8,65,77.7,101.1c5.2,9.1,10.2,18.3,14.8,27.6L691.8,526.2C694.2,511.4,694.9,496.4,693.8,481.4z M804.6,371.1l0.4-0.4l-0.4-0.3V371.1z M627.1,350.5c-4.3-3.7-8.8-7.2-13.4-10.5l-43.1-42.9l-20.4-20.3L318.2,45.4c40-16.2,82.7-27.1,127.2-32.2c18.2-2.1,36.6-3.3,55.4-3.3c43.8,0,86.3,5.9,126.7,16.8c10.2,2.7,20.2,5.8,30.1,9.1v347.7C648.7,371.4,638.5,360.3,627.1,350.5z M626.7,193.9l0.5,0.5v-0.5H626.7z M483.5,306.3c-5.7,0.4-11.3,1.1-16.9,2h-60.9h-28.8H48.6c16.9-39.7,39.2-77.5,67.1-112.4c11.4-14.3,23.6-28.1,36.8-41.3c31-30.9,65.2-56.6,101.5-77.4c9.1-5.2,18.4-10.1,27.7-14.8l246.7,245.9C513.6,305.9,498.5,305.2,483.5,306.3z M372.4,195.5l-0.4,0.4h0.7L372.4,195.5z M351.7,373.5c-3.7,4.3-7.2,8.7-10.6,13.3l-43.1,42.9L277.7,450L45.6,681.3c-16.2-39.9-27.2-82.4-32.3-126.8C11.2,536.4,10,518,10,499.4c0-43.7,6-86,16.9-126.2c2.7-10.1,5.8-20.1,9.1-30h348.9C372.7,351.9,361.5,362.1,351.7,373.5z M194.6,373.4v0.5l0.5-0.5H194.6z M305.9,516.2c0.4,5.7,1.1,11.3,2,16.9v60.7v28.7v327.1c-39.8-16.8-77.7-39.1-112.8-66.9c-14.3-11.4-28.2-23.5-41.5-36.7c-31-30.9-56.8-65-77.7-101.1c-5.2-9.1-10.2-18.3-14.8-27.7l246.7-245.9C305.5,486.3,304.8,501.3,305.9,516.2z M195.1,626.6l-0.4,0.3l0.4,0.4V626.6z M373,649.5c4.3,3.7,8.8,7.2,13.4,10.5l43.1,42.9l20.4,20.3l232.1,231.3c-40,16.2-82.7,27.1-127.2,32.2c-18.2,2.1-36.6,3.3-55.4,3.3c-43.9,0-86.3-5.9-126.7-16.8c-10.2-2.7-20.2-5.8-30.1-9.1V616.4C351.4,628.6,361.6,639.7,373,649.5z M372.9,806.1h0.5l-0.5-0.5V806.1z M514.2,695.6c5.7-0.4,11.3-1.1,16.9-2H592h28.8h328.3c-16.9,39.6-39.2,77.5-67.1,112.4c-11.4,14.3-23.6,28.1-36.8,41.3c-31,30.9-65.2,56.6-101.5,77.4c-9.1,5.2-18.4,10.1-27.7,14.8L469.2,693.6C484.1,696,499.2,696.7,514.2,695.6z M625.3,806.4l0.3-0.3h-0.7L625.3,806.4z'
  },
  'wx-friends': {
    d: 'M990,615.1C990,477.3,852.1,365,697.3,365c-164,0-293.1,112.3-293.1,250.1c0,138,129.1,250.1,293.1,250.1c34.3,0,68.9-8.6,103.4-17.3l94.5,51.8l-26-86.2C938.5,761.7,990,692.8,990,615.1z M602.2,572c-17.2,0-34.4-17.1-34.4-34.5c0-17.2,17.3-34.4,34.4-34.4c26.1,0,43.1,17.3,43.1,34.4C645.3,554.9,628.3,572,602.2,572z M791.8,572c-17,0-34.2-17.1-34.2-34.5c0-17.2,17.2-34.4,34.2-34.4c25.8,0,43.1,17.3,43.1,34.4C834.9,554.9,817.6,572,791.8,572z M354.7,100.3C165.2,100.3,10,229.4,10,393.4C10,488,61.7,565.8,147.9,626l-34.4,103.7l120.5-60.4c43.1,8.5,77.7,17.3,120.7,17.3c10.8,0,21.5-0.5,32.2-1.4c-6.8-23.1-10.6-47.2-10.6-72.2c0-150.6,129.3-272.8,293-272.8c11.2,0,22.2,0.8,33.2,2C672.5,203.4,524.1,100.3,354.7,100.3z M242.7,332.9c-25.8,0-51.9-17.3-51.9-43.1c0-26,26.1-43,51.9-43c25.9,0,43,17,43,43C285.7,315.7,268.5,332.9,242.7,332.9z M483.9,332.9c-25.8,0-51.8-17.3-51.8-43.1c0-26,26-43,51.8-43c25.9,0,43.1,17,43.1,43C527,315.7,509.8,332.9,483.9,332.9z',
    width: 100,
    height: 100
  },
  taobao: {
    width: 1792,
    height: 1374,
    d: 'M312,313 C401,313 473,249 473,169 C473,90 401,25 312,25 C223,25 151,90 151,169 C151,249 223,313 312,313 L312,313 Z M178,372 L77,527 L264,644 C264,644 389,707 330,827 C274,940 2,1188 2,1188 L246,1340 C414,974 404,1023 446,891 C489,757 499,654 425,580 C330,485 319,476 178,372 L178,372 Z M1760,331 C1760,331 1708,-81 806,174 C844,107 863,63 863,63 L638,0 C638,0 547,296 385,435 C385,435 542,525 540,522 C585,478 625,432 660,388 C696,372 731,357 765,343 C723,419 656,531 588,602 L683,685 C683,685 748,622 819,547 L899,547 L899,686 L585,686 L585,796 L899,796 L899,1062 C895,1061 891,1061 887,1061 C853,1059 798,1054 778,1020 C752,980 771,905 772,859 L555,859 L547,863 C547,863 468,1219 777,1211 C1065,1219 1231,1131 1310,1070 L1342,1188 L1520,1114 L1399,819 L1255,863 L1282,965 C1245,992 1202,1013 1156,1028 L1156,796 L1462,796 L1462,686 L1156,686 L1156,547 L1464,547 L1464,437 L917,437 C956,389 987,345 996,317 L900,291 C1309,145 1537,170 1535,410 L1535,1042 C1535,1042 1559,1259 1310,1244 L1176,1215 L1144,1343 C1144,1343 1725,1508 1772,1062 C1820,615 1760,331 1760,331 L1760,331 Z'
  }
})

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  attempt: 1
})
Vue.use(InfiniteScroll)
Vue.use(Vuex)
Vue.use(VeeValidate, {
  locale: 'zh-CN',
  dictionary: {
    'zh-CN': {
      messages: localeMsg,
      attributes: localAttr
    }
  }
})
Vue.use(Toast)
Vue.use(TextResouce)

// console.log(require('../static/setting.js'))

// input css resources
require('vue-swipe/dist/vue-swipe.css')
require('./assets/mt-style.css')
require('cropperjs/dist/cropper.min.css')

const routes = [
  {path: '/', component: Index},
  {path: '/index', component: Index},
  {path: '/circle', component: CircleIndex}, // "我的圈子"首页
  {path: '/circles/:id', component: Circle},
  {path: '/circles/:id/member', component: CircleMember},
  {path: '/circles', component: CircleIndex}, // 返回全部圈子, 可以分类 可以搜索
  {path: '/reg', component: Registry}, //
  {path: '/me', component: MeIndex}, // 我的 页面
  {path: '/me/info', component: MeInfo}, // 我的 页面
  {path: '/me/spouse', component: MeSpouse}, // 我的 页面
  {path: '/me/recommend', component: Recommend}, // 我的 页面
  {path: '/me/looked', component: Looked}, // 我的 页面
  {path: '/me/focused', component: Focused}, // 我的 页面
  {path: '/me/focus_who', component: WhomIFocus}, // 我的 页面
  {path: '/me/album', component: MeAlbum}, // 我的 页面
  {path: '/me/appointment', component: Appointment}, // 我的 页面joinedCircleactivitiesJoined
  {path: '/me/activitiesJoined', component: ActivitiesJoined}, // 我参加的活动
  {path: '/me/deposite', component: Deposite},
  {path: '/me/consumeHistory', component: ConsumeHistory},
  {path: '/me/service', component: Service},
  {path: '/me/buyCircle/:id', component: BuyCircle},
  {path: '/me/appointed', component: MeAppointed},
  {path: '/test', component: Test},
  {path: '/posts/:id', component: Post},
  {path: '/auth', component: Auth},
  {path: '/search/', component: SearchIndex},
  {path: '/search/users', component: Search},
  {path: '/search/users/:query', component: SearchResult},
  {path: '/message', component: MessageList},
  {path: '/message/chat/:uid', component: Chat},
  {path: '/users/appointment/:uid', component: AppointmentRequest},
  {path: '/users/:uid', component: User},
  {path: '/tags/:tag', component: Tag},
  {path: '/demo', component: Demo},
  {path: '/activities/:id', component: Activity},
  // 以下路径不检查权限
  {path: '/me/wxShare/:qrcode', component: Share}
]

const router = new Router({
  routes: routes,
  base: '/'
})

router.beforeEach((to, from, next) => {
  // 业务逻辑函数
  function afterAuth () {
    // 对已注册用户开始正常的业务逻辑
    // 修改状态栏状态
    store.dispatch('itemClicked', config.tabbarItems[to.path])
    // 获取stateInfo, 这个是很重要的api
    store.dispatch('fetchMeState').then(data => {
      // 没法啦, 判断手机验证是否成功只能放这了, 因为在stateInfo这个api里面
      // 一样的, 验证不能卡住认证页面
      if (!data.mobileAuth && to.path !== '/reg') next('/reg')
      else {
        next()
      }
    }).catch(res => {
      // 出错则重定位到当前路径, 重新加载
      Vue.Toast.openIndicator()
      Vue.Toast.toast(Vue.$errMsg.stateInfo)
      console.error('[StateInfo] ' + res.status + ' ' + res.statusText)
      setTimeout(e => {
        // 只在生产环境做这样的错误处理
        if (process.env.NODE_ENV === 'production') window.location.reload()
      }, 5000)
    })
  }

  // 不验证的path
  function alwaysPass (path) {
    // 微信分享出去的页面不应该检查权限
    let arr = path.split('/')
    if (arr.indexOf('wxShare') !== -1) {
      return true
    }

    // 普通规则
    let alwaysPass = [
      '/auth'
      // '/reg'
    ]
    return alwaysPass.indexOf(path) !== -1
  }

  // 不能拦截去认证和注册页面的路由
  if (alwaysPass(to.path)) {
    // 不阻止认证页面
    next()
  } else {
    // 这个判断只是debug, 不用理
    if (process.env.NODE_ENV === 'development' && config.dev === true) {
      afterAuth()
      return
    }

    // 如果是去其他页面, 都要判断认证是否通过
    let cookieAuth = utils.getCookie(document.cookie).auth
    // 没有注册的去微信认证
    if (cookieAuth === undefined || cookieAuth === 'false') next('/auth')
    else {
      afterAuth()
    }
  }
})

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next(response => {
    // 处理服务端返回的状态
    let data = utils.response2Data(response)

    if (data.errcode && data.errcode !== 0) {
      response.status = data.errcode
      response.statusText = data.errmsg
      response.ok = false
    }
  })
})

let vue = new Vue({
  el: '#app',
  router: router,
  mode: 'hash',
  store: store,
  ...App
})

// if (process.env.NODE_ENV === 'development') {
//   document.write('<script src="http://app.yuezhengyuan.com:8080/target/target-script-min.js#anonymous"></script>')
// }

export default vue
