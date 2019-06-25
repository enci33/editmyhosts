<template>
  <div id="app">
    <side-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import {addProject, getProjectMap, updateProjectByKey} from './utils/storage'
import { ipcRenderer } from 'electron'
export default {
  name: 'Editmyhosts',
  components: {
    SideBar
  },
  data() {
    return {
    }
  },
  created() {
    getProjectMap().then(async data => {
      if (!data['system']) {
        const systemHost = ipcRenderer.sendSync('getSystemHosts')
        console.log(systemHost)
        await updateProjectByKey('host', {
          name: 'system',
          data: this.handleSystemHosts(systemHost),
          checked: true
        })
      }
      ipcRenderer.send('projectMap', data)
    })
  },
  methods: {
    handleSystemHosts(data) {
      const result = []
      for (const [item, index] of data) {
        const setArr = new Set(item.trim().split(' ')) // 删除多余的空格和#
        setArr.delete('') // 删除空格
        const arr = Array.from(setArr) // 转换为数组
        if (!arr.length) {
          continue
        }
        if (arr[0].indexOf('#') > -1) { // # 127.0.0.1 localhost # 注释
          result.push({
            id: index,
            ip: arr[1] || '',
            host: arr[2] || '',
            checked: true,
            comment: arr[4] || ''
          })
        } else { // 127.0.0.1 localhost # 注释
          result.push({
            id: index,
            ip: arr[0] || '',
            host: arr[1] || '',
            checked: false,
            comment: arr[3] || ''
          })
        }
      }
      return result
    }
  }
}
</script>

<style>
  /* CSS */
</style>
