// 区域重复购进汇总
<template lang="html">
  <div class="page-businessRepeat">
    <v-header></v-header>
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
      </div>
      <div class="repeats">
        <div class="rep">
          <span>重复购进</span>
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="month">
          <span>个月购进</span>
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="export-wrapper" @click="exportData">
        <exportExcel ref="exportExcel"></exportExcel>
      </div>
    </div>
    <div class="table-wrapper">
      <v-table :data="tableData" ref="table"></v-table>
    </div>
  </div>
</template>

<script>
import tableRepeat from 'components/table/tableRepeat'
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import {
  bisRepeat
} from 'service/getData'

export default {
  components: {
    'v-table': tableRepeat,
    'v-header': header,
    exportExcel
  },
  created() {
    this._init()
  },
  data() {
    return {
      tableData: [],
      startDate: '2016-10-01',
      endDate: '2017-03-01',
      monthValue: '',
      conditions: [{
        name: 'SKU'
      }, {
        name: '省份'
      }, {
        name: '城市'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    _init() {
      bisRepeat().then((res) => {
        this.tableData = res.data.hits.hits
      })
    },
    exportData() {
      this.$refs.exportExcel.exportCsv(this.$refs.table, this.tableData, '区域重复购进汇总')
    }
  }
}

</script>

<style lang="stylus">
$gray-color = rgba(149, 149, 149, 0.8)
$subject-color = #10A0F7
.page-businessRepeat
  background #f6f6f6
  .filters
    position relative
    border-bottom 1px solid rgba(123,123,123,0.5)
    margin 20px 80px 0
    background white
    .conditions
      display inline-block
      height 71px
      line-height 71px
      padding-left 40px
      .title
        font-size 18px
        color $gray-color
      .item
        cursor pointer
        margin-left 50px
        font-size 18px
        &:nth-child(2)
          margin-left 35px
      .info
        font-size 14px
        color $gray-color
    .dot-line
      width calc(100% - 143px)
      border 1px dashed #E6E6E6
    .times
      display inline-block
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
          margin-left 55px
          font-size 18px
          color black
          &:first-child
            margin-left 69px
    .repeats
      display inline-block
      padding-left 50px
      .rep,.month
        display inline-block
        .el-select
          width 103px
          padding-left 9px
      .month
        padding-left 8px
    .export-wrapper
      position absolute
      top 48px
      right 28px
  .table-wrapper
    height calc(100% - 286px)
    text-align center
    padding 20px 80px 0
</style>
