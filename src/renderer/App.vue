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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Editmyhosts',
  components: {
    SideBar
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'projectList'
    ])
  },
  created() {
    const systemHost = ipcRenderer.sendSync('getSystemHosts')
    console.log(systemHost)
    console.log(...mapActions(['project']))
    this.$store.dispatch('project/addHost', {
      name: 'system',
      data: this.handleSystemHosts(systemHost),
      checked: true
    })
    ipcRenderer.send('projectList', this.projectList)
  },
  methods: {
    handleSystemHosts(data) {
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
      console.log(result)
      return result
    }
  }
}
</script>

<style>
  /* CSS */
</style>
