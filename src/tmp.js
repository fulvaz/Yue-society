function updatePicker(pickerConfig, values) {
  if (pickerConfig.length !== values.length) throw new Error('updatePicker: length is not matched')
  let i = 0
  return pickerConfig.map((config) => {
    return {
      ...config,
      values: values[i++]
    }
  })
}

var a= [{
  flex: 1,
    values: [1, 2, 3, 4, 5],
  className: 'addressPicker',
  textAlign: 'center'
}]

var b = updatePicker(a, [[4, 5, 6, 7]])



console.log(b)