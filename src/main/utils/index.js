const fs = require('fs')
const readLine = require('readline')
import logger from './log'

let hostsFilePath = '' // hosts文件地址
let hostBacDir = '' // hosts备份目录
if (process.platform === 'win32') {
  const baseDir = 'C:\\d\\test\\'
  hostsFilePath = baseDir + 'hosts'
  hostBacDir = baseDir + 'editmyhosts\\'
}

// hosts备份文件路径
export const hostBacDirPath = hostBacDir
// 系统host文件路径
export const systemHostsPath = hostsFilePath

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

export async function getCheckedFileData(list = []) {
  let data = ''
  for (const index in list) {
    const item = list[index]
    if (item.checked) {
      data += item.data + '\n\n\n'
    }
  }
  return data
}

/**
 * 获取系统hosts文件内容
 * @returns {Promise<string>}
 */
export async function getHostsFile() {
  try {
    return await fs.readFileSync(hostsFilePath, 'utf-8')
  } catch (e) {
    logger.debug(e)
  }
  return ''
}

/**
 *按行读取文件
 * @param filePath
 * @returns {Promise<any>}
 */
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

/**
 * 添加host备份文件夹
 * @returns {Promise<boolean>}
 */
export async function createHostBacDir() {
  try {
    if (!fs.existsSync(hostBacDir)) {
      fs.mkdirSync(hostBacDir)
    }
  } catch (e) {
    logger.debug(e)
    return false
  }
  return true
}

export async function takeEffectHostsFile(fileData) {
  try {
    fs.writeFileSync(hostsFilePath, fileData)
  } catch (e) {
    logger.debug(e)
    return false
  }
  return true
}
