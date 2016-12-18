var dev = true
var apiPrefix = dev ? 'http://localhost:3000' : ''

export default {
  'apiPrefix': apiPrefix,
  'circlesRecommendsApi': apiPrefix + '/recommends/circles',
  'usersRecommendsApi': apiPrefix + '/userRecommends',
  'myCircles': apiPrefix + '/myCircles',
  'circlesApi': apiPrefix + '/circles', // 与post是关联的, /circles/0/posts 表示返回circles 0的全部posts
  'activitiesRecommendsApi': apiPrefix + '/recommends/activities',
  'meApi': apiPrefix + '/me',
  'meSelectableApi': apiPrefix + '/meSelectable',
  'wxDataApi': apiPrefix + '/weixin',
  'userApi': apiPrefix + '/users'
}
