<template>
  <div>
    <el-form :model="form" label-width="60px">
      <el-form-item label="项目名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <el-table :data="form.data" @selection-change="handleSelectionChange">
      <el-table-column width="55">
        <template slot-scope="scope">
          <el-checkbox v-model="form.data[scope.$index].checked"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="ip">
        <template slot-scope="scope">
          <el-input v-model="form.data[scope.$index].ip"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="host">
        <template slot-scope="scope">
          <el-input v-model="form.data[scope.$index].host"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
  import {getProjectByKey, updateProjectByKey} from '../utils/storage'
  import {errMessage, successMessage} from '../utils/handler'

export default {
  name: 'Edit',
  props: {
    projectKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        name: '',
        data: []
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getProjectByKey(this.projectKey).then(data => {
        this.form = data
        console.log(this.form)
        this.form.data.push({
          ip: '',
          host: '',
          checked: false
        })
        this.form.data.push({
          ip: '',
          host: '',
          checked: false
        })
        this.form.data.push({
          ip: '',
          host: '',
          checked: false
        })
      })
    },
    save() {
      updateProjectByKey(this.projectKey, Object.assign({}, this.form)).then(() => {
        successMessage('保存成功')
      }).catch(err => {
        console.log(err)
        errMessage('保存失败')
      }).finally(() => {
        this.$emit('close')
      })
    },
    handleSelectionChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped>

</style>
