import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import localeMsg from './utils/zh_CN.js'
import Toast from './plugin/Toast.js'

import Index from 'components/Index'
import CircleIndex from 'components/circle/Index'
import Circle from 'components/circle/Circle'
import Registry from 'components/User/Registry'
import MeIndex from 'components/me/Index'
import MeInfo from 'components/me/Info'
import Test from 'components/Test'
import MeSpouse from 'components/me/Spouse'
import Post from 'components/posts/Post'
import Auth from 'components/Auth'
import Search from 'components/search/index'
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
      attributes: localeMsg
    }
  }
})
Vue.use(Toast)

// input css resources
require('vue-swipe/dist/vue-swipe.css')
require('./assets/mt-style.css')

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

const routes = [
  {path: '/', component: Index},
  {path: '/index', component: Index},
  {path: '/circle', component: CircleIndex}, // "我的圈子"首页
  {path: '/circles/:id', component: Circle},
  {path: '/circles', component: CircleIndex}, // 返回全部圈子, 可以分类 可以搜索
  {path: '/registry/:openId', component: Registry}, //
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
  {path: '/search', component: Search},
  {path: '/search/:query', component: SearchResult},
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
  if (to.path !== '/auth') {
    // 如果在本地测试登录功能, 你需要注释下面这行, 然后将下下行解除注释
    let cookieAuth = utils.getCookie(document.cookie).auth
    if (config.dev) {
      store.dispatch('itemClicked', config.tabbarItems[to.path])
      store.dispatch('fetchMeState').then(res => {
        next()
      })
      return
    }
    if (cookieAuth === undefined || cookieAuth === 'false') next('/auth')
    // if (!utils.getCookie(document.cookie).auth) next('/auth')
    else {
      // 业务逻辑
      // 修改状态栏状态
      store.dispatch('itemClicked', config.tabbarItems[to.path])
      store.dispatch('fetchMeState').then(res => {
        next()
      })
    }
  } else {
    next()
  }
  // auth
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
  next()
})

let vue = new Vue({
  el: '#app',
  router: router,
  mode: 'hash',
  store: store,
  ...App
})

export default vue
