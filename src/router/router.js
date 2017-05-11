import Vue from 'vue'
import Router from 'vue-router'
import data from 'views'
import ring from 'views/dashboard/pages/ring'
import dashboard from 'views/dashboard'
import businessMain from 'views/business/main'
import businessRepeat from 'views/business/repeat'
import businessTerminal from 'views/business/terminal'
import businessDetail from 'views/business/detail'
import businessQuesDetail from 'views/business/quesDetail'
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
      path: 'dashboard',
      component: dashboard,
      redirect: 'dashboard/ring',
      children: [{
        path: 'ring',
        component: ring
      }]
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
      path: 'business/quesDetail',
      component: businessQuesDetail
    }, {
      path: 'setting',
      component: setting
    }, {
      path: 'pageData',
      component: pageData
    }]
  }]
})
