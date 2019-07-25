<template>
  <div class="wrap">
    <!--<h1>Let's Go, Hosts!</h1>-->
    <div class="item_wrap">
      <item
        v-for="(item, index) in projectList"
        :key="item.name"
        :index="index"></item>
      <div class="add_project"><i class="el-icon-circle-plus-outline" @click="addProject"></i></div>
    </div>
  </div>
</template>

<script>
import Item from './item'
import { mapGetters } from 'vuex'
import {errMessage} from '../utils/handler'
export default {
  name: 'Index',
  components: {
    Item
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'projectList'
    ])
  },
  methods: {
    addProject() {
      const data = {
        name: '',
        data: '',
        checked: false
      }
      this.$store.dispatch('project/addProject', { data }).catch(err => {
        errMessage('添加失败:' + err)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap{
    text-align: center;
  }
  .item_wrap{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: space-between;
  }
  .add_project{
    display: table;
    margin-top: 200px;
    i{
      font-size: 40px;
    }
  }
</style>`
