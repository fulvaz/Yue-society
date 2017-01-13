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
import Album from 'components/Album'
import Activity from 'components/circle/Activity'
import WhomIFocus from 'components/me/WhomIFocus'
import Service from 'components/me/Services'
import Appointment from 'components/me/Appointment'
import ActivitiesJoined from 'components/me/ActivitiesJoined'
import ConsumeHistory from 'components/me/ConsumeHistory'
import AppointmentRequest from 'components/user/Appointment'

import store from './store/index.js'
import * as utils from './utils/utils.js'
import config from './config/setting.js'

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

// input css resources
require('vue-swipe/dist/vue-swipe.css')
require('./assets/mt-style.css')

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
  {path: '/search/q', component: Search},
  {path: '/search/q/:query', component: SearchResult},
  {path: '/message', component: MessageList},
  {path: '/message/chat/:uid', component: Chat},
  {path: '/users/appointment/:uid', component: AppointmentRequest},
  {path: '/users/:uid', component: User},
  {path: '/tags/:tag', component: Tag},
  {path: '/albums/:uid', component: Album},
  {path: '/activities/:id', component: Activity}
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
      if (!data.mobileAuth) next('/reg')
      else {
        next()
      }
    })
  }

  // 不能拦截去认证和注册页面的路由
  if (to.path === '/auth' || to.path === '/reg') {
    // 不阻止认证页面
    next()
  } else {
    // 这个判断只是debug, 不用理
    if (config.dev) {
      afterAuth()
      return
    }

    // 权限逻辑在这里
    let cookieAuth = utils.getCookie(document.cookie).auth
    // 没有注册的去微信认证
    if (cookieAuth === undefined || cookieAuth === 'false') next('/auth')
    else {
      afterAuth()
    }
  }
})

// const eventHub = new Vue()

// let events = {
//   data () {
//     return {
//       'eventHub': eventHub
//     }
//   }
// }

// Vue.mixin(events)

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

export default vue
