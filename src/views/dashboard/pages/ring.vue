// 区域终端购进汇总
<template lang="html">
  <div class="page-ring">
    <div class="et-filters">
      <div class="times">
        <span class="title">时段选择：</span>
        <div class="start">
          <span class="text">起始：</span>
          <el-date-picker
            type="date"
            ref='startDate'
            v-model="startDate"
            @change='timeChange'
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
         <div class="end">
          <span class="text">截止：</span>
          <el-date-picker
            type="date"
            ref='endDate'
            v-model="endDate"
            @change='timeChange'
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="list">
        <el-row :gutter="20" :type="'flex'">
          <el-col v-for="(item,index) in list" :key="index">
            <div class="item">
              <div class="title">关注信使数</div>
              <div class="num">2000</div>
              <div class="status">
                <span class="symbol">+</span>
                <span class="num">20</span>
                <span><i class="fa fa-long-arrow-up" aria-hidden="true"></i></span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="charts">
        <div class="line_one">
          <v-line></v-line>
        </div>
        <div class="line_two">
          <v-line></v-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import line from 'components/charts/line'
import '../mock'
import {
  getDbRing
} from 'service/getData'

const date = new Date()
export default {
  components: {
    'v-line': line
  },
  created() {
    getDbRing().then((res) => {
      // console.log(res.data);
    })
  },
  methods: {
    timeChange() {},
    _getStartDate() {
      let split = 3 // 查询跨度三个月
      let year = date.getFullYear()
      let month = date.getMonth() + 1 - split
      if (month <= 0) {
        month += 12
        year--
      }
      return `${year}-${month}-01`
    }
  },
  data() {
    return {
      startDate: this._getStartDate(),
      endDate: `${date.getFullYear()}-${(date.getMonth() + 1)}-01`,
      list: new Array(7)
    }
  }
}
</script>

<style lang="stylus" scoped>

.page-ring
  .et-filters
    padding 10px
  .export-wrapper
    top 22px
  .content
    padding 20px 50px
    .list
      .item
        padding 8px
        background white
        .title
          font-family STHeitiSC-Medium
          font-size 16px
          color #959595
        .num
          font-family Helvetica-Light
          font-size 25px
          color #0F9AEE
          padding 14px 0
        .status
          text-align right
          font-size 14px
          .num
            font-family Helvetica
            font-size 14px
            color black
            padding 0 5px
          i
            color #D0021B
    .charts
      .line_one
        padding 20px 0
</style>
