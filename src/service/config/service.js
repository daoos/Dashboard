let CONFIG_LOCAL = require('./local.js').default
  // 本地测试 此句代码需删除
let CONFIG = require('./config.js').default
if (!isLocal()) {
  CONFIG = CONFIG_LOCAL
}
let params = {
  'size': 10000,
  'sort': {
    'current_date': {
      'order': 'desc'
    }
  }
}

let pGroup = {
  'size': 0,
  'sort': {
    'current_date': {
      'order': 'desc'
    }
  },
  'query': {
    'bool': {
      'filter': {
        'range': {
          'current_date': {
            'gte': '2015-01-01',
            'lte': '2017-01-01'
          }
        }
      },
      'must': []
    }
  },
  'aggs': {
    'city_id_name': {
      'terms': {
        'size': 10000,
        'field': 'city_id_name.keyword'
      }
    }
  }
}

let paramsRepeat = {
  'size': 10000,
  'sort': {
    'sales_month': {
      'order': 'desc'
    }
  }
}


CONFIG.PARAMS = params
CONFIG.PARAMS_REPEAT = paramsRepeat
CONFIG.P_GROUP = pGroup
export default CONFIG

// 判断是否是本地环境
function isLocal() {
  return window.location.hostname === 'localhost'
}

// false代表repeat
function getParams(flag) {

}
