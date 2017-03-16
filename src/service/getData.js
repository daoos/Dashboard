import axios from 'axios'
import conf from './config/service'
import _getUrl from './config/func'

const CONFIG = conf
const USER_NAME = 'ethicall'
const PSW = 'o0lQc7l*48U$XnRd'
const AUTH_TOKEN = 'Basic ' + btoa(USER_NAME + ':' + PSW)
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

/**
 *  信使拜访数据汇总
 */
export const bisMain = () => axios[CONFIG.method](_getUrl(CONFIG.business.main), CONFIG.PARAMS)

/**
 *  信使拜访数据分组查询
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 */
export const bisMainByGroup = (filterCode, startTime, endTime) => axios[CONFIG.method](_getUrl(CONFIG.business.main), getGroupParams(filterCode, startTime, endTime))


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
export const bisTerByGroup = (filterCode, startTime, endTime) => axios[CONFIG.method](_getUrl(CONFIG.business.terminal), getGroupParams(filterCode, startTime, endTime, true))

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


function getGroupParams(filterCode, startTime, endTime, flag) {
  let params = CONFIG.P_GROUP
  if (flag) {
    params.sort = {
      'sales_month': 'desc'
    }
  }
  params.query.bool.filter.range.current_date = {
    'gte': startTime,
    'lte': endTime
  }
  params.aggs = {
    [filterCode]: {
      'terms': {
        'size': 10000,
        'field': `${filterCode}.keyword`
      }
    }
  }
  return params
}
