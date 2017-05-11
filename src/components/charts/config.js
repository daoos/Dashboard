import store from '../../vuex'

const line = {
  title: {
    show: false
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: [{
      name: '邮件营销'
    }, '联盟广告', '视频广告', '直接访问'],
    right: 30
  },
  toolbox: {
    show: false
  },
  color: store.state.colorArr,
  calculable: true,
  grid: {
    top: 'top',
    left: '0',
    right: '0',
    bottom: '35'
  },
  xAxis: [{
    name: '产品',
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    boundaryGap: false,
    nameTextStyle: {
      color: 'black'
    },
    axisLabel: {
      showMinLabel: false,
      showMaxLabel: false,
      textStyle: {
        color: 'black'
      }
    },
    data: ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7']
  }],
  yAxis: [{
    axisLine: {
      show: false
    },
    boundaryGap: false,
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    offset: -75,
    axisLabel: {
      showMinLabel: false,
      showMaxLabel: false,
      margin: 0,
      textStyle: {
        color: 'black',
        fontSize: 14
      }
    },
    type: 'value'
  }],
  series: [{
    name: '邮件营销',
    type: 'line',
    stack: '总量',
    symbolSize: 10,
    data: [120, 132, 101, 134, 90, 230, 210]
  }, {
    name: '联盟广告',
    type: 'line',
    stack: '总量',
    symbolSize: 10,
    data: [220, 182, 191, 234, 290, 330, 310]
  }, {
    name: '视频广告',
    type: 'line',
    stack: '总量',
    symbolSize: 10,
    data: [150, 232, 201, 154, 190, 330, 410]
  }, {
    name: '直接访问',
    type: 'line',
    stack: '总量',
    symbolSize: 10,
    data: [320, 332, 301, 334, 390, 330, 320]
  }]
}

export const line1 = line
