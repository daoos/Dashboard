import Vue from 'vue'
import Router from 'vue-router'
import businessMain from 'views/business/main'
import businessRepeat from 'views/business/repeat'
import businessTerminal from 'views/business/terminal'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/business/main',
    name: 'businessMain',
    component: businessMain
  }, {
    path: '/business/repeat',
    name: 'businessRepeat',
    component: businessRepeat
  }, {
    path: '/business/terminal',
    name: 'businessTerminal',
    component: businessTerminal
  }]
})
