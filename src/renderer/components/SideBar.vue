<template>
  <div class="side_bar">
    <div class="project_wrap">
      <div v-for="(item, key) in projectList" class="item" @click="chooseProject(key)">
        <div class="project_name">
          <span>{{ item.name }}</span>
        </div>
        <div class="operation">
          <i class="el-icon-delete" @click="del(key)"></i>
          <i class="el-icon-edit" @click="edit(key)"></i>
          <el-switch v-model="item.checked" @change="switchHandler"></el-switch>
        </div>
      </div>
    </div>
    <div class="tool_bar">
      <i class="el-icon-plus" @click="addProject" title="添加新项目"></i>
      <i class="el-icon-refresh" @click="refreshPage" title="刷新项目"></i>
    </div>
  </div>
</template>

<script>
import {addProject, delProject, getProjectMap, setProject} from '../utils/storage'
import {confirm, errMessage, prompt, successMessage} from '../utils/handler'
export default {
  name: "SideBar",
  data() {
    return {
      projectList: {},
      currentKey: 0,
      isShowEdit: false,
      systemHosts: false
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
        setProject(this.projectList)
      })
    },
    addProject() {
      prompt('请输入项目名').then(value => {
        addProject({
          name: value,
          data: [],
          checked: false
        }).then(() => {
          this.init()
        }).catch(() => {
          errMessage('请先检查是否有名称为空的项目')
        })
      })
    },
    chooseProject() {
      
    },
    edit(key) {
      this.isShowEdit = true
      this.currentKey = key
      prompt('请输入项目名', { inputValue: this.projectList[key].name }).then(value => {
        this.projectList[key].name = value
        this.updateProject()
      })
    },
    del(key) {
      confirm('确认删除？').then(() => {
        delProject(key).then(() => {
          this.init()
        }).catch(err => {
          errMessage('删除失败:'+err)
        })
      })
    },
    refreshPage() {
      location.reload()
    },
    switchHandler(val) {
      this.updateProject()
    },
    updateProject(msg = '修改成功') {
      setProject(this.projectList).then(() => {
        successMessage('修改成功')
      }).catch(err => {
        errMessage('修改失败')
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
      padding: 0 10px;
      font-size: 22px;
      cursor: pointer;
      height: $itemHeight;
      line-height: $itemHeight;
      text-align: center;
      display: flex;
      &:hover{
        background-color: #1f2d3d;
      }
      .project_name{
        flex: 1;
      }
      .operation{
      }
    }
  }
</style>
