import store from '../store'
/**
 * name 云函数名
 * data 云函数参数
 * silent 是否统一消息处理, false 的话要自己在前端处理
 */
const request = (name, data, silent = true) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        result
      } = await uniCloud.callFunction({
        name,
        data
      })
      if (result.message) {
        if (silent) {
          uni.showModal({
            title: '提示',
            content: result.message,
            showCancel: false,
          })
        }
        return reject(result)
      }
      resolve(result.data)
    } catch (err) {
      console.error(`${name} is err: `, err)
      store.commit('updateErrorList', err)
      //TODO handle the exception
      reject(err)
      if (silent) {
        uni.showModal({
          title: '提示',
          content: JSON.stringify(err),
          showCancel: false,
        })
      }
    }
  })
}

/**
 * 前端 js 直接转调 云函数 桥梁
 */
const http = new Proxy({}, {
  get(target, property) {
    if (property === 'request') return request
    return (...options) => {
      // app 上没有 console.group 和 console.groupEnd
      let group = console.log
      let groupEnd = console.log
      // #ifdef H5 || MP-WEIXIN
      group = console.group
      groupEnd = console.groupEnd
      // #endif
      group(`调用云函数：${property}`);
      console.log(`云函数：${property}`)
      console.log(`参数：`, ...options)
      groupEnd();
      return request(property, ...options)
    }
  }
})

export default http
