<template>
  <div id="wrapper" class="wrapper">
    <el-table :data="projectData" border stripe>
      <el-table-column width="50">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.checked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="ip" max-width="300">
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
          <el-input v-model="scope.row.comment"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="text">添加</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {confirm, errMessage, successMessage} from '../utils/handler'
import { mapGetters } from 'vuex'
export default {
  name: 'Table',
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
      const result = JSON.parse(JSON.stringify(this.projectList[this.currentIndex].data || []))
      result.push({
        checked: false,
        ip: '',
        host: '',
        comment: ''
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    margin-left: 250px;
  }
</style>
