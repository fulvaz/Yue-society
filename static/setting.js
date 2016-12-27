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
  'circleByTag': apiPrefix + '/getTags'
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
  'circleTags': apiPrefix + 'circleTags'
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

const exp = Object.assign(
  {},
  api,
  {
    userApiFilter: userApiFilter,
    usersRecommendsApiFilter: usersRecommendsApiFilter,
    filterPL: filterPL,
    dev: dev
  }
)

window.config = exp
