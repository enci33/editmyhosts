<template>
  <div class="item" @click.stop="toggleChoose" @mouseenter="showMask = true" @mouseleave="showMask = false">
    <div class="item_name_wrap title_font">
      <span
        v-if="!isEdit"
        class="item_name">{{ item.name }}</span>
      <el-input
        v-else
        ref="title"
        v-model="nameInput"
        @blur="nameBlur"
        @focus="title = true"></el-input>
    </div>
    <div
      class="item_data">
      <span v-if="!isEdit">{{ item.data }}</span>
      <el-input
        v-else
        type="textarea"
        v-model="contentInput"
        @blur="contentBlur"
        @focus="data = true"></el-input>
    </div>
    <div v-if="item.checked" class="item_checked">
      <i class="el-icon-s-flag"></i>
    </div>
    <transition name="fade">
      <div v-if="!isEdit && showMask">
        <div class="mask"></div>
        <div class="operation_btn">
          <i class="el-icon-edit" @click.stop="editProject"></i>
          <i v-if="item.name !== 'system'" class="el-icon-delete" @click.stop="delProject"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {confirm, errMessage, successMessage} from '../utils/handler'
export default {
  name: 'Item',
  props: ['index'],
  data() {
    return {
      showMask: false,
      isEdit: false,
      title: false,
      data: false,
      nameInput: '',
      contentInput: ''
    }
  },
  computed: {
    ...mapGetters([
      'projectList'
    ]),
    item() {
      return this.projectList[this.index]
    }
  },
  methods: {
    delProject() {
      confirm('确定删除？').then(() => {
        this.$store.dispatch('project/delProjectByIndex', {
          index: this.index
        }).then(() => {
          successMessage('删除成功')
        }).catch(err => {
          errMessage('删除失败:' + err)
        })
      })
    },
    toggleChoose() {
      if (this.isEdit) {
        return
      }
      const checked = !this.item.checked
      this.$store.dispatch('project/updateProjectByIndex', {
        mark: true,
        index: this.index,
        data: Object.assign({}, this.item, {
          checked
        })
      })
    },
    editProject() {
      this.isEdit = true
      this.$nextTick(() => {
        this.nameInput = this.item.name
        this.contentInput = this.item.data
        this.$refs['title'].focus()
      })
      // this.$refs['title'].focus()
    },
    nameBlur() {
      console.log(this.nameInput)
      this.title = false
      this.$store.dispatch('project/updateProjectByIndex', {
        index: this.index,
        data: Object.assign({}, this.item, {
          name: this.nameInput
        })
      })
      this.isAllBlur()
    },
    contentBlur() {
      this.data = false
      this.$store.dispatch('project/updateProjectByIndex', {
        mark: true,
        index: this.index,
        data: Object.assign({}, this.item, {
          data: this.contentInput
        })
      })
      this.isAllBlur()
    },
    isAllBlur() {
      setTimeout(() => {
        if (!this.title && !this.data) {
          this.isEdit = false
          this.showMask = false
        }
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss">
  .item{
    width: 20%;
    min-width: 250px;
    height: 400px;
    margin: 20px;
    border-radius: 10px;
    background: #fffeac;
    padding: 10px;
    position: relative;
    /deep/ input{
      background-color: rgba(0, 0, 0, 0);
      height: 28px;
    }
    /deep/ .el-textarea{
      height: 100%;
      textarea{
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
  .item_name{
    margin: 2px;
  }
  .item_data{
    position: absolute;
    top: 42px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    overflow: auto;
    text-align: left;
    white-space: pre-line;
    word-break: break-all;
  }
  .mask{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
    transition: all .4s ease-in-out;
    opacity: 0.5;
  }
  .operation_btn{
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 200;
    .el-button{
      margin: 0 10px;
    }
    i{
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 30%;
      background: #fff;
      font-size: 20px;
      color: #3e0e0c;
      margin: 0 5px;
      transition: all 0.3s ease 0s;
      &:hover{
        background: #3e0e0c;
        color: #fff;
      }
    }
  }
  .item_checked{
    position: absolute;
    top: 10px;
    right: 10px;
    i{
      color: red;
      font-size: 26px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
