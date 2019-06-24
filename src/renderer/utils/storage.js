const storage = window.localStorage

const projectKey = 'projectList'

export function addProject(data) {
  const map = getProject()
  if (!map[data.name]) {
    map[data.name] = data
    storage.setItem(projectKey, JSON.stringify(map))
    return true
  }
  return false
}

export function getProject() {
  return JSON.parse(storage.getItem(projectKey) || '{}')
}
