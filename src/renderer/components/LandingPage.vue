<template>
  <div id="wrapper" class="wrapper">

  </div>
</template>

<script>
import {addProject, delProject, getProjectMap} from '../utils/storage'
import {confirm, errMessage, successMessage} from '../utils/handler'
export default {
  name: 'landing-page',
  data() {
    return {
      projectList: {},
      isShowEdit: false,
      currentKey: 0,
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    margin-left: 250px;
  }
</style>
