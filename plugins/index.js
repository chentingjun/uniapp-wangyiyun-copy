import http from './http'

const install = Vue => {
  Vue.prototype.$http = http
}

export default {
  install
}
