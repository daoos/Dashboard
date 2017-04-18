import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tableData: {},
  filterItems: [], // 当前点击的filter
  routerArr: [{
    name: '业务数据',
    code: 'home'
  }],
  loginflag: true,
  user: {},
  province: [], // 限制用户查看的省份
  views: {
    dashboard: true, // DashBoard
    pageData: true, // 页面数据
    bisVisit: true, // 信使拜访数据汇总
    bisTerminal: true, // 区域终端购进汇总
    bisRepeat: true, // 区域重复购进汇总
    bisDetail: true, // 信使关注详情
    financialData: true, // 财务数据
    setting: true // 设置
  },
  isLocal: window.location.hostname === 'localhost'
}

export default new Vuex.Store({
  state
})
