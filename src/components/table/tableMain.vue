<template lang="html">
  <div class="bi-table">
    <el-table :data="tableData" border align="center" width="1500">
        <el-table-column prop="_source.current_date" label="日期" width="110" class-name="table-date-column" style="background:blue"></el-table-column>
        <el-table-column label="基本信息">
          <el-table-column prop="_source.product" label="SKU" width="120"></el-table-column>
          <el-table-column prop="_source.state_id_name" label="省份" width="120"></el-table-column>
          <el-table-column prop="_source.city_id_name" label="城市" width="120"></el-table-column>
          <el-table-column prop="_source.hospital" label="终端" width="150"></el-table-column>
        </el-table-column>
        <el-table-column label="用户信息">
          <el-table-column prop="_source.messenger" label="负责信使" width="120"></el-table-column>
          <el-table-column prop="_source.count_total" label="累计关注医生" width="150"></el-table-column>
          <el-table-column prop="_source.doc_count" label="关注医生" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="实际拜访数据">
          <el-table-column prop="_source.visit_count_sum" label="拜访次数" width="120"></el-table-column>
          <el-table-column prop="_source.read_material_sum" label="阅读次数" width="120"></el-table-column>
          <el-table-column prop="_source.doctor_evaluate_sum" label="反馈次数" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="实际销售数据">
          <el-table-column prop="_source.sales_count_sum" label="销售数量" width="120"></el-table-column>
          <el-table-column prop="_source.sales_amount_sum" label="销售额" width="120"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="data.length">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  watch: {
    data() {
      this._init()
    }
  },
  methods: {
    _init() {
      let count = 0
      let arr = []
      this.data.forEach((item, index) => {
        arr.push(item)
        count++
        if (count === this.pageSize || index === this.data.length - 1) {
          this.splitData.push(arr)
          arr = []
          count = 0
        }
      })
      this.tableData = this.splitData[0]
    },
    handleCurrentChange(val) {
      this.currentPage = val || 1;
      this.tableData = this.splitData[val - 1]
      console.log(`当前页: ${val}`)
    }
  },
  data() {
    return {
      splitData: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  }
}

</script>

<style lang="stylus">
$subject-color = #10A0F7
// 重写样式
.bi-table
  position relative
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
   .page-wrapper
      position absolute
      right 0
      padding-top 10px
</style>
