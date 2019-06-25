const storage = window.localStorage

const projectKey = 'projectList'

export function addProject(data) {
  return new Promise((resolve, reject) => {
    getProjectMap().then(map => {
      if (!map[data.name]) {
        map[data.name] = data
        setProject(map)
        resolve()
      } else {
        reject('命名重复')
      }
    }).catch(e => {
      reject(e)
    })
  })
}

export function delProject(key) {
  return new Promise((resolve, reject) => {
    getProjectMap().then(map => {
      delete map[key]
      setProject(map)
      resolve()
    }).catch(e => {
      reject(e)
    })
  })
}

export function getProjectMap() {
  return new Promise((resolve, reject) => {
    try {
      const result = JSON.parse(storage.getItem(projectKey) || '{}')
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

export function getProjectByKey(key) {
  return new Promise((resolve, reject) => {
    getProjectMap().then(data => {
      resolve(data[key])
    }).catch(e => {
      reject(e)
    })
  })
}

export function updateProjectByKey(key, data) {
  return new Promise((resolve, reject) => {
    getProjectMap().then(map => {
      map[key] = data
      setProject(map)
      resolve()
    }).catch(e => {
      reject(e)
    })
  })
}

export function setProject(data) {
  return new Promise((resolve, reject) => {
    try {
      storage.setItem(projectKey, JSON.stringify(data))
      resolve()
    } catch (e) {
      reject(e)
    }
  })
}
