import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import plugins from './plugins'
import store from './store'
// 引入uView对小程序分享的mixin封装
import mpShare from 'uview-ui/libs/mixin/mpShare.js';

Vue.mixin(mpShare)
Vue.use(uView)
Vue.use(plugins)

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
