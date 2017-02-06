module.exports = function (req, res, next) {
  if (req.method === 'POST' && req._parsedUrl.pathname === '/userDetail') {
    req.method = 'GET'
  }
  if (req.method === 'POST' && req._parsedUrl.pathname === '/circleDetail') {
    req.method = 'GET'
  }
  next()
}
