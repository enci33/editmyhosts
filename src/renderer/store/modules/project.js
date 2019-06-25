const state = {
  currentKey: ''
}

const mutations = {
  CHANGE_CURRENT_KEY: (state, key) => {
    state.currentKey = key
  }
}

const actions = {
  changeCurrentKey({ commit }, key) {
    commit('CHANGE_CURRENT_KEY', key)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
