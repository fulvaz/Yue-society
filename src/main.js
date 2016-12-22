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

import store from './store/index.js'

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
  {path: '/test', component: Test} //
]

const router = new Router({
  routes: routes,
  base: '/'
})

const eventHub = new Vue()

let events = {
  data () {
    return {
      'eventHub': eventHub
    }
  }
}

// 全局事件处理器
Vue.mixin(events)

export default new Vue({
  el: '#app',
  router: router,
  mode: 'hash',
  store: store,
  ...App
})
