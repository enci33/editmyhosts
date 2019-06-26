import { getProjectMapSync } from '../utils/storage'

export default {
  // 当前索引
  currentIndex: state => state.project.currentIndex,
  // 项目列表
  projectList: () => getProjectMapSync()
}
