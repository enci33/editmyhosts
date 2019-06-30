import { ipcMain } from 'electron'
import logger from '../utils/log'
import fs from 'fs'
logger.debug('平台：', process.platform)
import {
  getHostsFile,
  getCheckedFileData,
  createHostBacDir,
  hostBacDirPath,
  systemHostsPath,
  takeEffectHostsFile
} from '../utils/index'

// 创建备份文件夹，如果第一次创建，再备份文件夹中复制一份host文件
const hostBacFilePath = hostBacDirPath + 'hosts'
if (!fs.existsSync(hostBacFilePath)) {
  const content = fs.readFileSync(systemHostsPath, 'utf-8')
  fs.writeFileSync(hostBacFilePath, content, { encoding: 'utf-8' })
}

/**
 * 修改并写入host文件
 */
ipcMain.on('effective', async(event, arg) => {
  // 获取选中的hsots列表
  const fileData = await getCheckedFileData(arg)
  logger.debug(fileData)
  logger.debug(new Date())
  await createHostBacDir()
  await takeEffectHostsFile(fileData)
})

ipcMain.on('getSystemHosts', async(event, arg) => {
  event.returnValue = await getHostsFile()
})

