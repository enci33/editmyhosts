import { Message, MessageBox } from 'element-ui'

/**
 * 警告的消息
 * @param msg
 * @returns {ElMessageComponent}
 */
export function warnMessage(msg) {
  return Message({
    type: 'warning',
    message: msg,
    duration: 2000
  })
}

/**
 * 失败的消息
 * @param msg
 * @returns {ElMessageComponent}
 */
export function errMessage(msg) {
  return Message({
    type: 'error',
    message: msg,
    duration: 2000
  })
}

/**
 * 成功的消息
 * @param msg
 * @returns {ElMessageComponent}
 */
export function successMessage(msg) {
  return Message({
    type: 'success',
    message: msg,
    duration: 2000
  })
}

/**
 * 确认操作
 * @param msg
 * @returns {Promise<any>}
 */
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

export function prompt(msg = '请输入内容', obj = {}) {
  return new Promise((resolve, reject) => {
    MessageBox.prompt(msg, '提示', Object.assign({
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }, obj)).then(({ value }) => {
      resolve(value)
    }).catch(e => {
      reject(e)
    })
  })
}
