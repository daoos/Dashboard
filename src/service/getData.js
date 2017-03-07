import axios from 'axios'
import CONFIG from './config/service'
import _getUrl from './config/func'
/**
 *  信使拜访数据汇总
 */
export const bisMain = () => axios[CONFIG.method](_getUrl(CONFIG.business.main))

/**
 *  区域终端购进汇总
 */
export const bisTerminal = () => axios[CONFIG.method](_getUrl(CONFIG.business.terminal))

/**
 *  区域重复购进汇总
 */
export const bisRepeat = () => axios[CONFIG.method](_getUrl(CONFIG.business.repeat))
