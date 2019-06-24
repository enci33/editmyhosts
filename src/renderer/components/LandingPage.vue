<template>
  <div id="wrapper" class="wrapper">
    <div v-for="item in projectList" class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script>
import { getProject } from '../utils/storage'

export default {
  name: 'landing-page',
  data() {
    return {
      projectList: getProject()
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 200px;
      height: 200px;
      border: 1px solid #eeeeee;
    }
  }
</style>
