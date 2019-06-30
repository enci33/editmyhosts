function handleSystemHosts(data) {
  const result = []
  for (const index in data) {
    const item = data[index]
    if (!item) {
      continue
    }
    const setArr = new Set(item.trim().split(' ')) // 删除多余的空格和#
    setArr.delete('') // 删除空格
    const arr = Array.from(setArr) // 转换为数组
    if (!arr.length) {
      continue
    }
    const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    if (!ipReg.test(arr[0]) && !ipReg.test(arr[1])) {
      continue
    }
    console.log(arr)
    if (arr[0].indexOf('#') > -1) { // # 127.0.0.1 localhost # 注释
      arr.shift()
      result.push({
        id: index,
        ip: arr.shift() || '',
        host: arr.shift() || '',
        checked: true,
        comment: arr.join(' ') || ''
      })
    } else { // 127.0.0.1 localhost # 注释
      result.push({
        id: index,
        ip: arr.shift() || '',
        host: arr.shift() || '',
        checked: false,
        comment: arr.join(' ') || ''
      })
    }
  }
  console.log(result)
  return result
}
