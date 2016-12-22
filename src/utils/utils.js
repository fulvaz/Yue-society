export function value2Key (obj, val) {
  // 强行转换为普通obj, 因为vue传入的对象并非纯粹的参数
  // console.log(obj)
  // console.log(val)
  obj = {...obj}
  return Object.keys(obj).filter((key) => {
    return obj[key] === val
  })[0]
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
