<template>
  <div id="wrapper" class="wrapper">
    <el-table :data="projectData">
      <el-table-column>
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="ip">
        <template slot-scope="scope">
          <el-input v-model="scope.row.ip"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="host">
        <template slot-scope="scope">
          <el-input v-model="scope.row.host"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="注释">
        <template slot-scope="scope">
          <span>{{ scope.row.comment }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {confirm, errMessage, successMessage} from '../utils/handler'
import { mapGetters } from 'vuex'
export default {
  name: 'landing-page',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'projectList'
    ]),
    projectData() {
      return this.projectList[this.currentIndex]
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    margin-left: 250px;
  }
</style>
