import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'

import Index from 'components/Index'
import CircleIndex from 'components/circle/Index'
import Circle from 'components/circle/Circle'
import Registry from 'components/User/Registry'
import Login from 'components/User/Login'
import Test from 'components/Test'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '',
  loading: './assets/ring-alt.svg',
  attempt: 1
})
Vue.use(InfiniteScroll)

// input css resources
require('vue-swipe/dist/vue-swipe.css')

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
  {path: '/registry', component: Registry}, // 返回全部圈子, 可以分类 可以搜索
  {path: '/login', component: Login}, // 返回全部圈子, 可以分类 可以搜索
  {path: '/test', component: Test} // 返回全部圈子, 可以分类 可以搜索
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

new Vue({
  el: '#app',
  router: router,
  mode: 'hash',
  ...App
})
