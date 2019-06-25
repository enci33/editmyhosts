<template>
  <div class="side_bar">
    <div class="project_wrap">
      <div v-for="(item, key) in projectList" class="item">
        <div class="project_name" @click="chooseProject(key)">{{ item.name }}</div>
        <div class="operation">
          <el-switch v-model="item.checked"></el-switch>
        </div>
      </div>
    </div>
    <div class="tool_bar">
      <i class="el-icon-plus" @click="addProject"></i>
    </div>
  </div>
</template>

<script>
import {addProject, delProject, getProjectMap} from '../utils/storage'
import {confirm, errMessage, successMessage} from '../utils/handler'
export default {
  name: "SideBar",
  data() {
    return {
      projectList: {},
      isShowEdit: false,
      currentKey: 0,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getProjectMap().then(data => {
        this.projectList = Object.assign(data)
        console.log(this.projectList)
      })
    },
    addProject() {
      addProject({
        name: '',
        data: [],
        checked: false
      }).then(() => {
        this.init()
      }).catch(() => {
        errMessage('请先检查是否有名称为空的项目')
      })
    },
    chooseProject(key) {
      this.projectList[key].checked = !this.projectList[key].checked
    },
    edit(key) {
      this.isShowEdit = true
      this.currentKey = key
    },
    del(key) {
      confirm('确认删除？').then(() => {
        delProject(key).then(() => {
          this.init()
        }).catch(err => {
          errMessage('删除失败:'+err)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  $itemHeight: 40px;
  $toolBarHeight: 40px;
  .side_bar{
    width: 250px;
    background-color: #304156;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .tool_bar{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: $toolBarHeight;
    line-height: $toolBarHeight;
    padding: 0 15px;
  }
  .project_wrap{
    color: rgb(191, 203, 217);
    .item {
      font-size: 22px;
      cursor: pointer;
      height: $itemHeight;
      line-height: $itemHeight;
      text-align: center;
      position: relative;
      &:hover{
        background-color: #1f2d3d;
      }
    }
  }
  .operation{
    position: absolute;
    right: 10px;
    top: 0;
  }
</style>
