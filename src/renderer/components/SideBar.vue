<template>
  <div class="side_bar">
    <div class="project_wrap">
      <div v-for="(item, index) in projectList" :class="['item', {'item_active': currentIndex === index}]" @click="chooseProject(index)">
        <div class="project_name">
          <span>{{ item.name }}</span>
        </div>
        <div class="operation">
          <i class="el-icon-delete" @click="del(index)"></i>
          <i class="el-icon-edit" @click="edit(index)"></i>
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
import { setProject } from '../utils/storage'
import {confirm, errMessage, prompt, successMessage} from '../utils/handler'
import {mapGetters} from 'vuex'
export default {
  name: "SideBar",
  data() {
    return {
      isShowEdit: false,
      systemHosts: false
    }
  },
  computed: {
    ...mapGetters([
      'currentIndex',
      'projectList'
    ])
  },
  created() {
    console.log(this.projectList)
  },
  methods: {
    init() {
      setProject(this.projectList)
    },
    addProject() {
      prompt('请输入项目名').then(value => {
        const data = {
          name: value,
          data: [],
          checked: false
        }
        this.$store.dispatch('project/addProject', {
          data,
          index: null
        }).then(() => {
          successMessage('添加成功')
        }).catch(err => {
          console.log(err)
          errMessage('添加失败,请先检查是否有名称为空的项目')
        })
      })
    },
    chooseProject(index) {
      this.$store.dispatch('project/changeCurrentIndex', index)
    },
    edit(index) {
      this.isShowEdit = true
      prompt('请输入项目名', { inputValue: this.projectList[index].name }).then(value => {
        this.$store.dispatch('project/updateProjectByIndex', {
          index,
          data: Object.assign(this.projectList[index], value)
        }).then(() => {
          successMessage('更新成功')
        })
        this.init()
      })
    },
    del(index) {
      confirm('确认删除？').then(() => {
        this.$store.dispatch('project/delProjectByIndex', { index }).then(() => {
          successMessage('删除成功')
        }).catch(err => {
          errMessage('删除失败')
        })
        this.init()
      })
    },
    refreshPage() {
      location.reload()
    },
    switchHandler(val) {
      setProject(this.projectList)
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
    .item_active{
      background-color: #1f2d3d;
    }
  }
</style>
