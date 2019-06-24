<template>
  <div id="wrapper" class="wrapper">
    <div v-for="(item, key) in projectList" class="item">
      <div class="project_name" @click="chooseProject(key)">{{ item.name }}</div>
      <i class="edit el-icon-edit" @click.prevent="edit(key)"></i>
      <i class="del el-icon-delete" @click.prevent="del(key)"></i>
      <i class="view el-icon-view" @click.prevent="view(key)"></i>
      <i v-if="item.checked" class="choose el-icon-success"></i>
    </div>
    <div class="item" @click="addProject">
      <i class="add_more el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
  import {addProject, getProject} from '../utils/storage'
  import {errMessage, successMessage} from "../utils/handler"

export default {
  name: 'landing-page',
  data() {
    return {
      projectList: getProject()
    }
  },
  methods: {
    addProject() {
      this.$prompt('请输入项目名', '提示').then(({ value }) => {
        const result = addProject({
          name: value,
          data: {},
          checked: false
        })
        if (result) {
          successMessage('添加成功')
          const webview = document.querySelector('webview')
          webview.reload()
        } else {
          errMessage('添加失败，请检查是否重名')
        }
      })
    },
    chooseProject(key) {
      this.projectList[key].checked = !this.projectList[key].checked
    },
    edit(key) {
    },
    del(key) {
    },
    view(key) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    flex-wrap: wrap;
    i{
      font-size: 29px;
      color: #8c939d;
      &:hover{
        color: black;
      }
    }
    .project_name{
      font-size: 29px;
      line-height: 160px;
      text-align: center;
    }
    .item {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 178px;
      height: 178px;
      margin: 20px;
    }
    .choose{
      position: absolute;
      right: 10px;
      top: 10px;
      color: #409eff;
    }
    .view{
      position: absolute;
      right: 90px;
      bottom: 10px;
    }
    .del{
      position: absolute;
      right: 50px;
      bottom: 10px;
    }
    .edit{
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .add_more{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
