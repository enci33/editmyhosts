<template>
  <div id="wrapper" class="wrapper">
    <el-table :data="data">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-input></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {addProject, delProject, getProjectMap} from '../utils/storage'
import {confirm, errMessage, successMessage} from '../utils/handler'
import { mapGetters } from 'vuex'
export default {
  name: 'landing-page',
  data() {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters([
      'currentKey'
    ])
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
