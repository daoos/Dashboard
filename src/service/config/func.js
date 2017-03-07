import CONFIG from './service'
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
      return CONFIG.origin + path
    default:
      return http + CONFIG.origin + path
  }
}
