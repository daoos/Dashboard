import CONFIG from './service'
import store from '../../vuex'

let ENV = window.location.host.split('.')[1]
export default (path) => {
  let http = 'http://'
  switch (ENV) {
    case 'dev':
      return http + CONFIG.origin + path
    case 'test':
    case 'mirror':
      return http + CONFIG.origin + ENV + '-' + path
    case 'product':
      return http + 'pro' + CONFIG.origin + path
    case undefined: // localhost
      return store.state.isLocal ? CONFIG.origin + path : http + CONFIG.origin + path
    default: // dev
      return http + CONFIG.origin + path
  }
}
