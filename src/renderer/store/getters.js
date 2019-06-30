
export default {
  // storage名称
  storageKey: state => state.project.storageKey,
  // 当前索引
  currentIndex: state => state.project.currentIndex,
  // 项目列表
  projectList: state => state.project.projectList
}
