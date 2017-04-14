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
  loginflag: true
}

export default new Vuex.Store({
  state
})
