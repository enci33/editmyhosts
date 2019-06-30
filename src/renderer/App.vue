<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import {addProject, getProjectMap, updateProjectByKey} from './utils/storage'
import { ipcRenderer } from 'electron'
import { mapGetters, mapActions } from 'vuex'
import {takeEffect} from './utils/handler'
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
    this.$store.dispatch('project/addHost', {
      name: 'system',
      data: systemHost,
      checked: true
    })
    takeEffect() // 修改hosts文件
    console.log(this.projectList)
  },
  methods: {
  }
}
</script>

<style>
  /* CSS */
</style>
