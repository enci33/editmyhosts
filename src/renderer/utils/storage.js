const storage = window.localStorage

const projectKey = 'projectList'

/**
 * 添加项目
 * @param data,index
 * @returns {Promise<void>}
 */
export async function addProject(data, index) {
  const projectList = await getProjectMap()
  await projectList.forEach(async item => {
    if (item.name === data.name) {
      return '命名重复'
    }
  })
  if (index) {
    await projectList.splice(index, 0, data)
  } else {
    await projectList.push(data)
  }
  await setProject(projectList)
}

/**
 * 删除项目
 * @param index
 * @returns {Promise<void>}
 */
export async function delProject(index) {
  const projectList = await getProjectMap()
  await projectList.splice(index, 1)
  await setProject(projectList)
}

/**
 * 获取所有项目
 * @returns {Promise<any>}
 */
export async function getProjectMap() {
  const res = await storage.getItem(projectKey)
  if (res && res !== 'undefined') {
    return await JSON.parse(res)
  }
  return await []
}

/**
 * 获取所有项目 sync
 * @returns {any}
 */
export function getProjectMapSync() {
  const res = storage.getItem(projectKey)
  if (res && res !== 'undefined') {
    return JSON.parse(res)
  }
  return []
}

/**
 * 获取指定项目通过index
 * @param index
 * @returns {Promise<any>}
 */
export async function getProjectByIndex(index) {
  const projectList = await getProjectMap()
  return await projectList[index]
}

/**
 * 获取指定项目通过name
 * @param name
 * @returns {Promise<void>}
 */
export async function getProjectByName(name) {
  const projectList = await getProjectMap()
  await projectList.forEach(async item => {
    if (item.name === name) {
      return await item
    }
  })
  return await false
}

/**
 * 更新指定项目
 * @param index
 * @param data
 * @returns {Promise<void>}
 */
export async function updateProjectByIndex(index, data) {
  const projectList = await getProjectMap()
  await projectList.splice(index, 1, data)
  await setProject(projectList)
}

/**
 * 更新storage中的项目
 * @param data
 * @returns {Promise<void>}
 */
export async function setProject(data) {
  await storage.setItem(projectKey, JSON.stringify(data))
}
