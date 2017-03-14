import Vue from 'vue'
import App from './App'
import router from './router/router'
import vuex from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import DataTables from 'vue-data-tables'

Vue.use(ElementUI)
Vue.use(DataTables)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuex,
  template: '<App/>',
  components: {
    App
  }
})
