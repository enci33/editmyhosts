import { ipcMain } from 'electron'
console.log('平台：', process.platform)
import {
  getHostsFile,
  getCheckedHosts } from './utils'

ipcMain.on('projectMap', async(event, arg) => {
  console.log('参数', arg)
  const choosedHosts = await getCheckedHosts(arg)
  console.log('111111111111111')
  console.log(choosedHosts)
  console.log('22222222222222')
  const hostsFileContent = await getHostsFile()
  console.log(hostsFileContent)
})

ipcMain.on('getSystemHosts', async(event, arg) => {
  event.returnValue = await getHostsFile()
})

