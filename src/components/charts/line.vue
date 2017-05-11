<template lang="html">
  <div class="chart-line">
    <chartFrame></chartFrame>
    <div class="main" ref="main"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import chartFrame from '../chartFrame'
import {
  line1
} from './config'

export default {
  components: {
    chartFrame
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.$refs.main);
    this.myChart.setOption(line1);
    this._init()
  },
  methods: {
    _init() {
      // this.legendArr = this.myChart.getOption().series
      // this.legendArr.forEach((data) => {
      //   data.selected = true;
      // })
      // this.$root.charts.push(this.myChart)
      // window.addEventListener('resize', function() {
      //   this.myChart.resize()
      // }.bind(this))
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart-line
  background white
  .main
    height 350px
    width 100%
</style>
