const storage = window.localStorage

const projectKey = 'projectList'

export function addProject(data) {
  const list = getProject()
  list.push(data)
  storage.setItem(projectKey, list)
}

export function getProject() {
  return JSON.parse(storage.getItem(projectKey) || '[]')
}
