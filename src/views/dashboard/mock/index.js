import Mock from 'mockjs'
import config from 'service/config/config.js'

Mock.mock(config.dashboard.ring, {
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL',
    'regexp3': /\d{5,10}/
  }]
})
