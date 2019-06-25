import { Message, MessageBox } from 'element-ui'

export function warnMessage(msg) {
  return Message({
    type: 'warning',
    message: msg,
    duration: 2000
  })
}

export function errMessage(msg) {
  return Message({
    type: 'error',
    message: msg,
    duration: 2000
  })
}

export function successMessage(msg) {
  return Message({
    type: 'success',
    message: msg,
    duration: 2000
  })
}

export function confirm(msg = '确认此操作？') {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve()
    }).catch(() => {
      reject()
    })
  })
}
