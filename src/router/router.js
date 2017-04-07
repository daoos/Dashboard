import Vue from 'vue'
import Router from 'vue-router'
import business from 'views/business'
import businessMain from 'views/business/main'
import businessRepeat from 'views/business/repeat'
import businessTerminal from 'views/business/terminal'
import businessDetail from 'views/business/detail'
import setting from 'views/setting'
import login from 'views/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, {
    path: '/business',
    component: business,
    children: [{
      path: 'main',
      component: businessMain
    }, {
      path: 'repeat',
      component: businessRepeat
    }, {
      path: 'terminal',
      component: businessTerminal
    }, {
      path: 'detail',
      component: businessDetail
    }, {
      path: 'setting',
      component: setting
    }]
  }]
})
