var dev = true;
var apiPrefix = dev ? 'http://test.com:3000' : 'http://api.resontek.com';

var pageFilter = dev ? '_page' : 'page';
var limitFilter = dev ? '_limit' : 'limitation';

var devApis = {
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
  'authPath': '/authorize',
  'applyCircleApi': apiPrefix + '/applyForCircle',
  'msgList': apiPrefix + '/msgList',
  'resetUidCount': apiPrefix + '/postData',
  'chat': apiPrefix + '/chat',
  'replyMsg': apiPrefix + '/postData',
  'looked': apiPrefix + '/looked',
  'recommend': apiPrefix + '/meRecommend',
  'focused': apiPrefix + '/focused',
  'wxConfig': 'http://api.resontek.com/wechat/config?redirectUrl=',
  'album': apiPrefix + '/album',
  'uploadImage': apiPrefix + '/postData',
  'meUpdate': apiPrefix + '/me/update',
  'focus': apiPrefix + '/postData',
  'unfocus': apiPrefix + '/postData',
  'newPost': apiPrefix + '/postData',
  'activityApi': apiPrefix + '/activities',
  'takePartInActivites': apiPrefix + '/postData',
  'authCircle': apiPrefix + '/right',  // 圈子发言权限
  'joinCircle': apiPrefix + '/postData', // 加入某个圈子
  'replyMsg': apiPrefix + '/postData', // 回复某个人的私信
  'whomIFocus': apiPrefix + '/looked', // 我关注的人
  'activitiesJoined': apiPrefix + '/activitiesJoined', // 我参加的活动
  'consumeHistory': apiPrefix + '/consumeHistory', // 消费记录
  'buyVipPage': apiPrefix + '/vipPage',
  'buyCirclePage': apiPrefix + '/vipPage',
  'buyVip': apiPrefix + '/postData',
  'buyCircle': apiPrefix + '/postData',
  'makeAppointment': apiPrefix + '/postData',
  // new
  'meAppointments': apiPrefix + '/meRecommend',  // 我约的人页面
  'meAppointed': apiPrefix + '/meRecommend' // 约我的人页面
};

var apis = {
  'apiPrefix': apiPrefix,
  'circlesRecommendsApi': apiPrefix + '/recommends/circles',
  'usersRecommendsApi': apiPrefix + '/recommends/users',
  'myCircles': apiPrefix + '/circles/myCircles',
  'circlesApi': apiPrefix + '/circles', // 与post是关联的, /circles/0/posts 表示返>回circles 0的全部posts
  'activitiesRecommendsApi': apiPrefix + '/recommends/activities',
  'meApi': apiPrefix + '/users/me',
  'meUpdate': apiPrefix + '/users/me/update',
  'meSelectableApi': apiPrefix + '/meSelectable',
  'wxDataApi': apiPrefix + '/weixin',
  'spouseApi': apiPrefix + '/users/me/spouse',
  'userApi': apiPrefix + '/users',
  'postsApi': apiPrefix + '/posts',
  'searchApi': apiPrefix + '/search',
  'searchTags': apiPrefix + '/search/tags',
  'circleByTag': apiPrefix + '/circles/tags',
  'stateInfo': apiPrefix + '/users/me/stateInfo',
  'authPath': apiPrefix + '/authorize',
  'applyCircleApi': apiPrefix + '/circles/apply',
  'msgList': apiPrefix + '/message/list',
  'resetUidCount': '',
  'chat': apiPrefix + '/message/chat',
  'wxConfig': apiPrefix + '/wechat/config?redirectUrl=',
  'looked': apiPrefix + '/users/me/visitors', // 谁看过了用户列表
  'recommend': apiPrefix + '/users/me/recommend', // 我推荐的人列表
  'focused': apiPrefix + '/users/me/followers', // 谁关注我列表
  'album': apiPrefix + '/users/me/album', // 相册图片列表
  'uploadImage': apiPrefix + '/users/me/album/upload', // 接受serverId的api
  'focus': apiPrefix + '/users/follow', // 关注某人
  'unfocus': apiPrefix + '/users/unFollow', // 取消关注某人
  'newPost': apiPrefix + '/posts/add', // 创建新帖子
  'activityApi': apiPrefix + '/activities', // 获取某个活动的信息
  'takePartInActivites': apiPrefix + '/circles/activity/attend', //参加某个活动
  'authCircle': apiPrefix + '/posts/right'
};

var api = dev ? devApis : apis;
function userApiFilter(page, limit) {
  var str = api.userApi + '/' + pageFilter + '/page/' + limitFilter + '/limit';
  var devStr = api.userApi + '?=_page=' + page + '&?_limit=' + limit;
  return dev ? devStr : str;
}

function usersRecommendsApiFilter(page, limit) {
  var str = api.usersRecommendsApi + '/' + pageFilter + '/' + page + '/' + limitFilter + '/' + limit;
  var devStr = api.usersRecommendsApi + '?_page=' + page + '&_limit=' + limit;
  return dev ? devStr : str;
}

function filterPL(page, limit) {
  var str = '/' + pageFilter + '/' + page + '/' + limitFilter + '/' + limit;
  var devStr = '?_page=' + page + '&_limit=' + limit;
  return dev ? devStr : str;
}

var tabbarItems = {
  '/': 0,
  '/circle': 1,
  '/search': 2,
  '/message': 3,
  '/me': 4
};

function objAssign (target, varArgs) {
  if (target == null) { // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object')
  }

  var to = Object(target)

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index]

    if (nextSource != null) { // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey]
        }
      }
    }
  }
  return to
}

var exp = objAssign({}, api, {
  userApiFilter: userApiFilter,
  usersRecommendsApiFilter: usersRecommendsApiFilter,
  filterPL: filterPL,
  dev: dev
}, {
  'tabbarItems': tabbarItems
});

window.config = exp;
