var dev = true
var apiPrefix = dev ? 'http://localhost:3000' : 'http://api.resontek.com'

let pageFilter = dev ? '_page' : 'page'
let limitFilter = dev ? '_limit' : 'limitation'

let devApis = {
  'apiPrefix': apiPrefix,
  'circlesRecommendsApi': apiPrefix + '/recommends/circles',
  'usersRecommendsApi': apiPrefix + '/userRecommends',
  'myCircles': apiPrefix + '/myCircles',
  'circlesApi': apiPrefix + '/circles', // 与post是关联的, /circles/0/posts 表示返回circles 0的全部posts
  'activitiesRecommendsApi': apiPrefix + '/recommends/activities',
  'meApi': apiPrefix + '/me',
  'meSelectableApi': apiPrefix + '/meSelectable',
  'wxDataApi': apiPrefix + '/weixin',
  'spouseApi': apiPrefix + '/spouse',
  'userApi': apiPrefix + '/users',
  'postsApi': apiPrefix + '/posts',
  'searchApi': apiPrefix + '/search',
  'searchTags': apiPrefix + '/circleTags',
  'circleByTag': apiPrefix + '/getTags',
  'stateInfo': apiPrefix + '/stateInfo',
  'authPath': 'static/auth.html',
  'applyCircleApi': apiPrefix + '/applyForCircle',
  'msgList': apiPrefix + '/msgList',
  'resetUidCount': '',
  'chat': apiPrefix + '/chat',
  'replyMsg': ''
}

let apis = {
  'apiPrefix': apiPrefix,
  'circlesRecommendsApi': apiPrefix + '/recommends/circles',
  'usersRecommendsApi': apiPrefix + '/userRecommends',
  'myCircles': apiPrefix + '/myCircles',
  'circlesApi': apiPrefix + '/circles', // 与post是关联的, /circles/0/posts 表示返回circles 0的全部posts
  'activitiesRecommendsApi': apiPrefix + '/recommends/activities',
  'meApi': apiPrefix + '/me',
  'meSelectableApi': apiPrefix + '/meSelectable',
  'wxDataApi': apiPrefix + '/weixin',
  'spouseApi': apiPrefix + '/spouse',
  'userApi': apiPrefix + '/users',
  'postsApi': apiPrefix + '/posts',
  'searchApi': apiPrefix + '/search',
  'searchTags': apiPrefix + '/circleTags',
  'circleByTag': apiPrefix + '/getTags',
  'stateInfo': apiPrefix + '/stateInfo',
  'authPath': apiPrefix + '/authorize',
  'applyCircleApi': apiPrefix + '/applyForCircle',
  'msgList': apiPrefix + '/msgList',
  'resetUidCount': '',
  'chat': apiPrefix + '/chat',
  'replyMsg': ''
}

let api = dev ? devApis : apis
function userApiFilter (page, limit) {
  let str = `${api.userApi}/${pageFilter}/page/${limitFilter}/limit`
  let devStr = `${api.userApi}?=_page=${page}&?_limit=${limit}`
  return dev ? devStr : str
}

function usersRecommendsApiFilter (page, limit) {
  let str = `${api.usersRecommendsApi}/${pageFilter}/${page}/${limitFilter}/${limit}`
  let devStr = `${api.usersRecommendsApi}?_page=${page}&_limit=${limit}`
  return dev ? devStr : str
}

function filterPL (page, limit) {
  let str = `/page/${limitFilter}/limit`
  let devStr = `?_page=${page}&_limit=${limit}`
  return dev ? devStr : str
}

const tabbarItems = {
  '/': 0,
  '/circle': 1,
  '/search': 2,
  '/message': 3,
  '/me': 4
}

const exp = Object.assign(
  {},
  api,
  {
    userApiFilter: userApiFilter,
    usersRecommendsApiFilter: usersRecommendsApiFilter,
    filterPL: filterPL,
    dev: dev
  },
  {
    'tabbarItems': tabbarItems
  }
)

window.config = exp
