let CONFIG_LOCAL = require('./local.js').default
  // 本地测试 此句代码需删除
let CONFIG = require('./config.js').default
if (isLocal()) {
  CONFIG = CONFIG_LOCAL
}
let params = {
  'size': 10000,
  'sort': [{
    'current_date': {
      'order': 'desc'
    }
  }]
}
let paramsRepeat = {
  'size': 10000,
  'sort': [{
    'sales_month': {
      'order': 'desc'
    }
  }]
}

CONFIG.PARAMS = params
CONFIG.PARAMS_REPEAT = paramsRepeat
export default CONFIG

// 判断是否是本地环境
function isLocal() {
  return window.location.hostname === 'localhost'
}
