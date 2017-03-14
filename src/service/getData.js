import axios from 'axios'
import CONFIG from './config/service'
import _getUrl from './config/func'

const USER_NAME = 'ethicall'
const PSW = 'o0lQc7l*48U$XnRd'
const AUTH_TOKEN = 'Basic ' + btoa(USER_NAME + ':' + PSW)
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

/**
 *  信使拜访数据汇总
 */
export const bisMain = () => axios[CONFIG.method](_getUrl(CONFIG.business.main), CONFIG.PARAMS)

/**
 *  区域终端购进汇总
 */
export const bisTerminal = () => axios[CONFIG.method](_getUrl(CONFIG.business.terminal), CONFIG.PARAMS_REPEAT)

/**
 *  区域重复购进汇总
 */
export const bisRepeat = () => axios[CONFIG.method](_getUrl(CONFIG.business.repeat), CONFIG.PARAMS_REPEAT)
