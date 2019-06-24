import { Message } from 'element-ui'

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
