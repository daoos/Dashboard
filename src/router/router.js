import Vue from 'vue'
import Router from 'vue-router'
import data from 'views'
import dailyData from 'views/dashboard/dailyData'
import businessMain from 'views/business/main'
import businessRepeat from 'views/business/repeat'
import businessTerminal from 'views/business/terminal'
import businessDetail from 'views/business/detail'
import pageData from 'views/pageData'
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
    path: '/data',
    component: data,
    children: [{
      path: 'dailyData',
      component: dailyData
    }, {
      path: 'business/main',
      component: businessMain
    }, {
      path: 'business/repeat',
      component: businessRepeat
    }, {
      path: 'business/terminal',
      component: businessTerminal
    }, {
      path: 'business/detail',
      component: businessDetail
    }, {
      path: 'setting',
      component: setting
    }, {
      path: 'pageData',
      component: pageData
    }]
  }]
})
