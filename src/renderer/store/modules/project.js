import { addProject, delProject, getProjectByName, updateProjectByIndex } from '../../utils/storage'

const state = {
  currentIndex: 0 // 当前索引
}

const mutations = {
  CHANGE_CURRENT_INDEX: (state, index) => {
    state.currentIndex = index
  }
}

const actions = {
  changeCurrentIndex({ commit }, index) {
    commit('CHANGE_CURRENT_INDEX', index)
  },
  async addProject({ commit }, { data, index = null }) {
    await addProject(data, index)
  },
  async updateProjectByIndex({ commit }, { index, data }) { // 更新项目
    await updateProjectByIndex(index, data)
  },
  async delProjectByIndex({ commit }, { index }) { // 删除项目
    await delProject(index)
  },
  addHost({ commit }, data) { // 处理系统hosts文件,放在首位
    console.log(data)
    return new Promise(async(resolve, reject) => {
      const host = await getProjectByName('system')
      console.log(host)
      if (!host) {
        await addProject(data, 0)
      } else {
        await updateProjectByIndex(0)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
