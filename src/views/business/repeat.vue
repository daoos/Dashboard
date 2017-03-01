// 区域重复购进汇总
<template lang="html">
  <div class="page-repeat">
    <el-menu theme="dark" default-active="1" class="header-bar" mode="horizontal">
      <el-menu-item index="1">概览</el-menu-item>
      <el-menu-item index="2">分析</el-menu-item>
      <div class="search">
        <span class="text">搜索</span>
        <div class="input-wrapper">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>选择一</el-dropdown-item>
              <el-dropdown-item>选择二</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <input type="text">
          <i class="el-icon-search"></i>
        </div>
      </div>
    </el-menu>
    <div class="filters">
      <div class="conditions">
        <span class="title">过滤条件：</span>
        <span class="item" v-for="item in conditions">{{item.name}}</span>
        <span class="info">(医院、基层医疗机构、药店)</span>
      </div>
      <div class="dot-line"></div>
      <div class="times">
        <span class="title">时段选择：</span>
        <div class="start">
          <span class="text">起始：</span>
          <el-date-picker
            type="date"
            v-model="startDate"
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="end">
          <span class="text">截止：</span>
          <el-date-picker
            type="date"
            v-model="endDate"
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="time-wrapper">
          <span class="time" v-for="time in times_filter">{{time.name}}</span>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <v-table></v-table>
    </div>
  </div>
</template>

<script>
import table from 'components/table/table'

export default {
  components: {
    'v-table': table
  },
  data() {
    return {
      startDate: '2016-10-01',
      endDate: '2017-03-01',
      conditions: [{
        name: '信使'
      }, {
        name: 'SKU'
      }, {
        name: '省份'
      }, {
        name: '城市'
      }, {
        name: '终端'
      }],
      times_filter: [{
        name: '分析周期'
      }, {
        name: '日报'
      }, {
        name: '周报'
      }, {
        name: '年报'
      }]
    }
  }
}

</script>

<style lang="stylus">
$gray-color = rgba(149, 149, 149, 0.8)
$subject-color = #10A0F7
.page-repeat
  .header-bar
    padding-left 78px
    background $subject-color
    .el-menu-item
      height 96px
      padding 0
      margin 0 20px
      line-height 96px
      font-size 24px
      color rgba(255, 255, 255, 0.6)
      &.is-active
        color white
        border-bottom-color white
      &:hover
        border-bottom-color white
        background transparent!important
    .search
      position absolute
      right 77px
      font-size 24px
      line-height 96px
      color white
      .input-wrapper
        display inline
        height 40px
        width 400px
        padding 8px
        margin-left 10px
        background rgba(255,255,255,0.6)
        border-radius 8px
        .el-dropdown
          cursor pointer
        input
          background none
          border none
        .el-icon-search
          font-size 20px
  .filters
    border-bottom 1px solid rgba(123,123,123,0.5)
    .conditions
      height 71px
      line-height 71px
      padding-left 40px
      .title
        font-size 18px
        color $gray-color
      .item
        cursor pointer
        padding-left 50px
        font-size 18px
        &:nth-child(2)
          padding-left 35px
      .info
        font-size 14px
        color $gray-color
    .dot-line
      width 100%
      border 1px dashed #E6E6E6
    .times
      height 76px
      line-height 76px
      font-size 18px
      color $gray-color
      padding-left 40px
      .start , .end
        display inline-block
        .text
          color rgba(0, 0, 0, 0.69)
        .el-date-editor
          width 147px
          .el-icon-date
            color $subject-color
          input
            background rgba(245,245,245,0.60)
            border 1px solid #D3D3D3
            border-radius 8px
      .start
        padding-left 35px
      .end
        padding-left 57px
      .time-wrapper
        display inline-block
        .time
          cursor pointer
          padding-left 55px
          font-size 18px
          color black
          &:first-child
            padding-left 69px
  .table-wrapper
    text-align center
</style>
