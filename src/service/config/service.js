import store from '../../vuex'

let CONFIG_LOCAL = require('./local.js').default
  // 本地测试 此句代码需删除
let CONFIG = require('./config.js').default
if (store.state.isLocal) {
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
    // 'current_date': {
    //   'order': 'desc'
    // }
  },
  'query': {
    'bool': {
      'filter': {
        'range': {
          // 'current_date': {
          //   'gte': '2015-01-01',
          //   'lte': '2017-01-01'
          // }
        }
      },
      'must': [],
      'minimum_should_match': 0,
      'should': []
    }
  },
  'aggs': {
    'subscribe_doc_count': {
      'sum': {
        'field': 'doc_count'
      }
    },
    'subscribe_total_count': {
      'sum': {
        'field': 'total_count'
      }
    },
    'visit_count_sum': {
      'sum': {
        'field': 'visit_count_sum'
      }
    },
    'read_material_sum': {
      'sum': {
        'field': 'read_material_sum'
      }
    },
    'doctor_evaluate_sum': {
      'sum': {
        'field': 'doctor_evaluate_sum'
      }
    },
    'sales_count_sum': {
      'sum': {
        'field': 'sales_count_sum'
      }
    },
    'sales_amount_sum': {
      'sum': {
        'field': 'sales_amount_sum'
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
