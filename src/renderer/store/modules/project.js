import {
  addProject,
  delProject,
  getProjectByName,
  getProjectMapSync, setProject,
  updateProjectByIndex
} from '../../utils/storage'

const state = {
  currentIndex: 0, // 当前索引
  projectList: getProjectMapSync()
}

const mutations = {
  CHANGE_CURRENT_INDEX: (state, index) => {
    state.currentIndex = index
  },
  UPDATE_PROJECT_LIST: (state) => {
    state.projectList = getProjectMapSync()
  }
}

const actions = {
  changeCurrentIndex({ commit }, index) {
    commit('CHANGE_CURRENT_INDEX', index)
  },
  async addProject({ commit }, { data, index = null }) {
    await addProject(data, index)
    await commit('UPDATE_PROJECT_LIST')
  },
  async updateProjectByIndex({ commit }, { index, data }) { // 更新项目
    await updateProjectByIndex(index, data)
    await commit('UPDATE_PROJECT_LIST')
  },
  async delProjectByIndex({ commit }, { index }) { // 删除项目
    await delProject(index)
    await commit('UPDATE_PROJECT_LIST')
  },
  async addHost({ commit }, data) { // 处理系统hosts文件,放在首位
    const host = await getProjectByName('system')
    console.log(host)
    if (!host) {
      await addProject(data, 0)
    } else {
      await updateProjectByIndex(0, host)
    }
    await commit('UPDATE_PROJECT_LIST')
  },
  async updateProject({ commit }, data) { // 更新project
    await setProject(data)
    await commit('UPDATE_PROJECT_LIST')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
