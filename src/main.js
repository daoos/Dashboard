import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import DataTables from 'vue-data-tables'

Vue.use(ElementUI)
Vue.use(DataTables)

router.beforeEach(({meta, path}, from, next) => {
  let { auth = true } = meta
  let isLogin = Boolean(store.state.loginflag) // true用户已登录， false用户未登录
  if (auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
