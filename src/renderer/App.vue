<template>
  <div id="app">
    <side-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
export default {
  name: 'Editmyhosts',
  components: {
    SideBar
  },
  data() {
    return {
    }
  }
}
</script>

<style>
  /* CSS */
</style>
