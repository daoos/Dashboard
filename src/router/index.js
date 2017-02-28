import Vue from 'vue'
import Router from 'vue-router'
import repeat from 'views/business/repeat'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/repeat',
    name: 'repeat',
    component: repeat
  }]
})
