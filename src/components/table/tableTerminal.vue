<template lang="html">
  <div class="bi-table-repeat">
    <el-table :data="data&&data.length?data:tableData" border align="center" width="1500">
      <el-table-column prop="date" label="时间" width="120" class-name="table-date-column" style="background:blue"></el-table-column>
      <el-table-column prop="name" label="产品" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="城市" width="120"></el-table-column>
      <el-table-column prop="zip" label="购进信使负责终端数" width="120"></el-table-column>
      <el-table-column prop="name" label="购进信使可负责终端数" width="120"></el-table-column>
      <el-table-column prop="province" label="购进终端数" width="120"></el-table-column>
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
.bi-table-repeat
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
      height 100px
    th[colspan="1"]
      background #EFEFEF
      .cell
        font-size 18px
        color #959595
        background #EFEFEF
    td
      font-size 18px
    .table-date-column
      .cell
        padding 0 4px
    th.table-date-column
      background $subject-color
      .cell
        color white
        background $subject-color
</style>
