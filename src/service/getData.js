import axios from 'axios'
let CONFIG = require('./config/config.js').default
let CONFIG_LOCAL = require('./config/local.js').default
let METHOD = 'post'
if (isLocal()) {
  METHOD = 'get';
  CONFIG = CONFIG_LOCAL
}
/**
 *  信使拜访数据汇总
 */

export const bisMain = () => axios[METHOD](CONFIG.business.main)

// 判断是否是本地环境
function isLocal() {
  return window.location.hostname === 'localhost'
}
