import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import DataTables from 'vue-data-tables'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(DataTables)

router.beforeEach(({
  meta,
  path
}, from, next) => {
  let {
    auth = true
  } = meta
  let isLogin = eval(window.localStorage.loginflag) // true用户已登录， false用户未登录
  if (isLogin && path === '/login') {
    return next({
      path: 'data/business/main'
    })
  }
  // 如果没有登录 则自动跳转登录页面
  if (auth && !isLogin && path !== '/login') {
    return next({
      path: '/login'
    })
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
