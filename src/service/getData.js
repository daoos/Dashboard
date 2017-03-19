import axios from 'axios'
import conf from './config/service'
import _getUrl from './config/func'
import store from '../vuex'

const CONFIG = conf
const USER_NAME = 'ethicall'
const PSW = 'o0lQc7l*48U$XnRd'
const AUTH_TOKEN = 'Basic ' + btoa(USER_NAME + ':' + PSW)
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

/**
 *  信使拜访数据汇总
 */
export const bisMain = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.main), getGroupParams(p))

/**
 *  信使拜访数据分组查询
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 */
export const bisMainByGroup = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.main), getGroupParams(Object.assign(p, {
  isGroup: true
})))


/**
 *  区域终端购进汇总
 */
export const bisTerminal = () => axios[CONFIG.method](_getUrl(CONFIG.business.terminal), CONFIG.PARAMS_REPEAT)

/**
 *  信使拜访数据分组查询
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 *  true 是否修改请求参数，将current_date变成sales_month
 */
export const bisTerByGroup = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.terminal), getGroupParams(Object.assign(p, {
  flag: true
})))

/**
 *  区域重复购进汇总
 */
export const bisRepeat = () => axios[CONFIG.method](_getUrl(CONFIG.business.repeat), CONFIG.PARAMS_REPEAT)

/**
 *  信使拜访数据分组查询
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 *  true 是否修改请求参数，将current_date变成sales_month
 */
export const bisRepByGroup = (filterCode, startTime, endTime) => axios[CONFIG.method](_getUrl(CONFIG.business.repeat), getGroupParams(filterCode, startTime, endTime, true))

/**
 * [getGroupParams description]
 * @param  {[type]} filterCode [description]
 * @param  {[type]} startTime  [description]
 * @param  {[type]} endTime    [description]
 * @param  {[type]} flag       [description]
 * @return {[type]}            [description]
 */
function getGroupParams(p) {
  let params = CONFIG.P_GROUP
  if (!p.isGroup) {
    params.size = 10000
  }
  let filterCode = p.routerArr.slice().pop().code
  if (p.flag) {
    params.sort = {
      'sales_month': 'desc'
    }
  }
  params.query.bool.filter.range.current_date = {
    'gte': p.startTime,
    'lte': p.endTime
  }
  if (filterCode !== 'home') {
    params.aggs = {
      [filterCode]: {
        'terms': {
          'size': 10000,
          'field': `${filterCode}.keyword`
        }
      }
    }
  }
  console.log(p.filterName);
  // 详细信息查询条件
  if (p.filterName) {
    params.query.bool.must.push({
      'term': {
        [`${filterCode}.keyword`]: p.filterName
      }
    })
  }

  // // 分组数据
  // if (p.routerArr.length > 1) {
  //   params.aggs[filterCode].aggs = {
  //     [filterCode]: {
  //       'terms': {
  //         'size': 10000,
  //         'field': `${store.state.filterItem}.keyword`
  //       }
  //     }
  //   }
  // }
  return params
}
