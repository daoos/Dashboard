<template lang="html">
  <div class="bi-table">
    <el-table :data="data&&data.length?data:tableData" border align="center" width="1500">
        <el-table-column prop="date" label="日期" width="110" class-name="table-date-column" style="background:blue"></el-table-column>
        <el-table-column label="基本信息">
          <el-table-column prop="name" label="SKU" width="120"></el-table-column>
          <el-table-column prop="province" label="省份" width="120"></el-table-column>
          <el-table-column prop="city" label="城市" width="120"></el-table-column>
          <el-table-column prop="zip" label="终端" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="用户信息">
          <el-table-column prop="name" label="负责信使" width="120"></el-table-column>
          <el-table-column prop="province" label="累计关注医生" width="150"></el-table-column>
          <el-table-column prop="city" label="关注医生" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="实际拜访数据">
          <el-table-column prop="name" label="拜访次数" width="120"></el-table-column>
          <el-table-column prop="province" label="阅读次数" width="120"></el-table-column>
          <el-table-column prop="city" label="反馈次数" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="实际销售数据">
          <el-table-column prop="name" label="销售数量" width="120"></el-table-column>
          <el-table-column prop="province" label="销售额" width="120"></el-table-column>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    data: {
      type: Array,
      default: this.tableData
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this._init()
  },
  methods: {
    _init() {
      axios.get('static/data/tableData.json').then((res) => {
        this.tableData = res.data
      })
    }
  }
}

</script>

<style lang="stylus">
$subject-color = #10A0F7
// 重写样式
.bi-table
  .el-table
    border none
    background #f6f6f6
    font-family STHeitiSC-Medium
    &::before
      height 0
    table
      width 100%!important
    td,th
      text-align center
      height 62px
    th[colspan="4"],th[colspan="3"],th[colspan="2"]
      background white
      .cell
        font-size 21px
        background white
        color $subject-color
    th[colspan="1"]
      background #EFEFEF
      .cell
        font-size 18px
        color #959595
        background #EFEFEF
    th[rowspan="2"]
      background $subject-color
      .cell
        font-size 24px
        color white
        background $subject-color
    td
      font-size 18px
    .table-date-column
      .cell
        padding 0 4px
</style>
