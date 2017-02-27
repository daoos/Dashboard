import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from './vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

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
