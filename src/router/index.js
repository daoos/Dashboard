import Vue from 'vue'
import Router from 'vue-router'
import repeat from 'views/business/repeat'
import table from 'components/table/table'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/repeat',
    name: 'repeat',
    component: repeat
  }, {
    path: '/table',
    name: 'table',
    component: table
  }]
})
