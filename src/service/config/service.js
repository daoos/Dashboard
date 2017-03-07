let CONFIG_LOCAL = require('./local.js').default
  // 本地测试 此句代码需删除
let CONFIG = require('./config.js').default
if (isLocal()) {
  CONFIG = CONFIG_LOCAL
}
export default CONFIG

// 判断是否是本地环境
function isLocal() {
  return window.location.hostname === 'localhost'
}
