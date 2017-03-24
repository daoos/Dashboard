import Vue from 'vue'
import Router from 'vue-router'
import businessMain from 'views/business/main'
import businessRepeat from 'views/business/repeat'
import businessTerminal from 'views/business/terminal'
import setting from 'views/setting/setting'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '',
    redirect: '/business/main'
  }, {
    path: '/business/main',
    component: businessMain
  }, {
    path: '/business/repeat',
    component: businessRepeat
  }, {
    path: '/business/terminal',
    component: businessTerminal
  }, {
    path: '/setting',
    component: setting
  }]
})
