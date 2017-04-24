import axios from 'axios'
import config from './config/service'
import _getUrl from './config/func'
import store from '../vuex'

const CONFIG = config


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
export const bisTerminal = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.terminal), getGroupParams(Object.assign(p, {
  flag: true
})))

/**
 *  信使拜访数据分组查询
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 *  true 是否修改请求参数，将current_date变成sales_month
 */
export const bisTerByGroup = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.terminal), getGroupParams(Object.assign(p, {
  isGroup: true,
  flag: true
})))

/**
 *  区域重复购进汇总
 */
export const bisRepeat = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.repeat), getGroupParams(Object.assign(p, {
  flag: true
})))

/**
 *  信使拜访数据分组查询
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 *  true 是否修改请求参数，将current_date变成sales_month
 */
export const bisRepByGroup = (p) => axios[CONFIG.method](_getUrl(CONFIG.business.repeat), getGroupParams(Object.assign(p, {
  isGroup: true,
  flag: true
})))


/**
 *  信使关注详情
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 *  true 是否修改请求参数，将current_date变成sales_month
 */
export const MesAttDetail = (p) => axios[CONFIG.method](_getUrl(CONFIG.att_detail), getGroupParams(Object.assign(p, {
  create_date_flag: true
})))

/**
 *  信使关注详情分组
 *  filterCode 分组字段，单选
 *  startTime、endTime 开始、结束时间
 *  true 是否修改请求参数，将current_date变成sales_month
 */
export const MesAttDetailByGroup = (p) => axios[CONFIG.method](_getUrl(CONFIG.att_detail), getGroupParams(Object.assign(p, {
  create_date_flag: true,
  isGroup: true
})))

/**
 * 登录
 * [loginHttp description]
 * @param  {[type]} p [description]
 * @return {[type]}   [description]
 */
export const loginHttp = (p) => axios.post(CONFIG.login, p)

/**
 * [getGroupParams description]
 * @param  {[type]} filterCode [description]
 * @param  {[type]} startTime  [description]
 * @param  {[type]} endTime    [description]
 * @param  {[type]} flag       [description]
 * @return {[type]}            [description]
 */
function getGroupParams(p) {
  let timeCode = 'current_date' // 根据flag来端盘筛选时间的字段
  let privinceCode = 'state_id_name'
  const params = deepCopy(CONFIG.P_GROUP)
  if (p.isGroup) {
    params.size = 0
  } else {
    params.size = 10000
  }
  let filterCode = p.item.code
  let timeflag = p.timeflag
  if (p.flag) {
    timeCode = 'sales_month'
  }
  // 信使关注详情
  if (p.create_date_flag) {
    timeCode = 'create_date'
    privinceCode = 'source_state_name'
  }
  params.sort = {
    [timeCode]: 'desc'
  }
  params.query.bool.filter.range[timeCode] = {
    'gte': p.startTime,
    'lte': p.endTime
  }
  if ((filterCode !== 'home' && p.isGroup) || timeflag) {
    // 按月查询
    if (filterCode !== 'home' && p.isGroup) {
      let groupAggs = Object.assign({}, params.aggs)
      params.aggs = {
        [filterCode]: {
          'terms': {
            'size': 10000,
            'field': `${filterCode}.keyword`
          },
          'aggs': groupAggs
        }
      }
      if (timeflag) {
        params.aggs[filterCode].aggs = {
          'timeflag': {
            'date_histogram': {
              'field': timeCode,
              'interval': timeflag
            }
          }
        }
      }
    } else {
      params.aggs = {
        'timeflag': {
          'date_histogram': {
            'field': timeCode,
            'interval': timeflag
          }
        }
      }
    }
  }
  // 限制显示城市
  params.query.bool.should = []
  if (!params.query.bool.should.length && store.state.province.length) {
    params.query.bool.minimum_should_match = 1
    store.state.province.forEach((c) => {
      params.query.bool.should.push({
        'term': {
          [`${privinceCode}.keyword`]: c
        }
      })
    })
  }

  // 详细信息查询条件
  let arr = p.filterNameArr
  params.query.bool.must = []
  p.filterNameArr = p.filterNameArr || []
  p.filterNameArr.forEach(r => {
    let filterCode = r.code
    params.query.bool.must.push({
      'term': {
        [`${filterCode}.keyword`]: r.name
      }
    })
  })

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

function deepCopy(source) {
  var result = {};
  for (var key in source) {
    result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
  }
  return result;
}
