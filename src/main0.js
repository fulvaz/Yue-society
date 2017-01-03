import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import Vuex from 'vuex'

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
import Recommend from 'components/me/Recommend'
import MeAlbum from 'components/me/Album'
import User from 'components/user/User'
import Album from 'components/Album'
import Activity from 'components/circle/Acti'

import store from './store/index.js'
import * as utils from './utils/utils.js'
import config from './config/setting.js'

Vue.config.debug = config.dev
Vue.config.silent = !config.dev

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  attempt: 1
})
Vue.use(InfiniteScroll)
Vue.use(Vuex)

// input css resources
require('vue-swipe/dist/vue-swipe.css')
require('mint-ui/lib/style.min.css')

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
  {path: '/me/album', component: MeAlbum}, // 我的 页面
  {path: '/test', component: Test},
  {path: '/posts/:id', component: Post},
  {path: '/auth', component: Auth},
  {path: '/search', component: Search},
  {path: '/search/:query', component: SearchResult},
  {path: '/message', component: MessageList},
  {path: '/message/chat/:uid', component: Chat},
  {path: '/users/:uid', component: User},
  {path: '/tags/:tag', component: Tag},
  {path: '/albums/:uid', component: Album},
  {path: '/activities/:id', component: Activity},
]

const router = new Router({
  routes: routes,
  base: '/'
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/auth') {
    // 如果在本地测试登录功能, 你需要注释下面这行, 然后将下下行解除注释
    if (!utils.getCookie(document.cookie).auth && !config.dev) next('/auth')
    // if (!utils.getCookie(document.cookie).auth) next('/auth')
    else {
      // 业务逻辑
      // 修改状态栏状态
      store.dispatch('itemClicked', config.tabbarItems[to.path])
      store.dispatch('fetchMeState', next) // 保证先更新个人信息  TODO 优化?
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
