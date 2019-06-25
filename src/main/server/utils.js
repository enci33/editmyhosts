const fs = require('fs')
const readLine = require('readline')

let hostsFilePath = '' // hosts文件地址
if (process.platform === 'win32') {
  hostsFilePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts'
}

/**
 * 获取被选中的host
 * @param list
 * @returns {Promise<void>}
 */
export async function getCheckedHosts(list = []) {
  const data = []
  for (const index in list) {
    const item = list[index]
    if (item.checked) { // 被选中的项目
      data.push(...item.data)
    }
  }
  return await data
}

/**
 * 获取系统hosts文件内容
 * @returns {Promise<string>}
 */
export async function getHostsFile() {
  const hosts = await readFileToArr(hostsFilePath)
  return hosts
}

export function readFileToArr(filePath) {
  return new Promise((resolve, reject) => {
    const fRead = fs.createReadStream(filePath)
    const objReadLine = readLine.createInterface({
      input: fRead
    })
    const arr = []
    objReadLine.on('line', (line) => {
      arr.push(line)
    })
    objReadLine.on('close', () => {
      resolve(arr)
    })
    objReadLine.on('error', err => {
      reject(err)
    })
  })
}
