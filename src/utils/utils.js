export function value2Key (obj, val) {
  // 强行转换为普通obj, 因为vue传入的对象并非纯粹的参数
  // console.log(obj)
  // console.log(val)
  obj = {...obj}
  return Object.keys(obj).filter((key) => {
    return obj[key] === val
  })[0]
}

export function objVals (obj) {
  return Object.keys(obj).map(e => {
    return obj[e]
  })
}

// 小心使用这个函数, 只是强行转换了一下数字, 然而js的parseInt并没那么好用
export function value2Id (obj, val) {
  return parseInt(value2Key(obj, val))
}

export function isStrNum (str) {
  return /^-?[0-9]+$/.test(str)
}

// 如果传入的字符串带有字母, 返回NaN
export function strictParseInt (str) {
  if (isStrNum(str)) return parseInt(str)
  else return NaN
}

export function pickerHelper (values) {
  return [{
    flex: 1,
    values: values[0],
    className: 'picker-left',
    textAlign: 'center'
  },
  {
    divider: true,
    content: '-'
  },
  {
    flex: 1,
    values: values[1],
    className: 'picker-right',
    textAlign: 'center'
  }]
}

export function singlePickerHelper (values) {
  return [{
    flex: 1,
    values: values,
    className: 'picker-left',
    textAlign: 'center'
  }]
}

export function pickerHelper2 (values) {
  return [{
    flex: 1,
    values: values,
    className: 'picker-left',
    textAlign: 'center'
  },
  {
    divider: true,
    content: '-'
  },
  {
    flex: 1,
    values: values,
    className: 'picker-right',
    textAlign: 'center'
  }]
}

export function rangeArr (min, max) {
  let i = min
  let arr = []
  for (i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

export function genAgeObj (min, max) {
  let obj = {}
  rangeArr(min, max).forEach(e => {
    obj[e] = rangeArr(e, max).map(e => '' + e)
  })
  return obj
}

function _to2Num (num) {
  if (num.length > 2) throw new Error('[_to2Num] length > 2')
  if (/^\d$/.test(num)) return '0' + '' + num
  else return num
}

export function Date2YMD (date) {
  // js世界没有标准的日期字符串 'Thu Jan 19 2017 01:30:21 GMT+0800 (CST)' 就是说用-是不行的
  let dd = new Date(date)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  return '' + y + '-' + _to2Num(m) + '-' + _to2Num(d)
}

export function normalizeDate (date) {
  let tmp = date.split('-')
  let y = tmp[0]
  let m = _to2Num(tmp[1])
  let d = _to2Num(tmp[2])
  // return y
  return '' + y + '-' + m + '-' + d
}

export function date2YMDHMM (date) {
  date = new Date(date)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  return y + '-' + _to2Num(m) + '-' + _to2Num(d) + ' ' + _to2Num(hour) + ':' + _to2Num(min) + ':' + _to2Num(sec)
}

export function date2MMDDHHMM (date) {
  date = new Date(date)
  let m = date.getMonth() + 1
  let d = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  return _to2Num(m) + '-' + _to2Num(d) + ' ' + _to2Num(hour) + ':' + _to2Num(min)
}

export function response2Data (response) {
  // console.log(response)
  // 说明请求返回的是错误信息
  if (!response.body) return response
  let remoteData
  if (typeof response.body === 'object') remoteData = response.body
  else if (typeof response.body === 'string') remoteData = response.body
  else remoteData = JSON.parse(response.body)

  return remoteData
}

export function search2query (search) {
  let obj = {}
  search.slice(1).split('&').forEach(e => {
    let [key, value] = e.split('=')
    obj[key] = value
  })
  return obj
}

export function getCookie (cookie) {
  let obj = {}
  cookie.split('; ').forEach(e => {
    let [key, value] = e.split('=')
    obj[key] = value
  })
  return obj
}

export function obj2arr (obj) {
  let arr = []
  Object.keys(obj).forEach(e => {
    arr.push(obj[e])
  })
  return arr
}

export function objAssign (target, varArgs) {
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

export function batchAssign (data, to) {
  Object.keys(data).forEach(key => {
    if (data[key] && to[key] !== undefined) {
      to[key] = data[key]
    }
  })
}
