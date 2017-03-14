<template lang="html">
  <div class="bi-table-repeat bi-table">
    <el-table :data="tableData" border align="center" width="1500">
      <el-table-column prop="_source.sales_month" label="时间" width="120" class-name="table-date-column" style="background:blue"></el-table-column>
      <el-table-column prop="_source.product" label="产品" width="120"></el-table-column>
      <el-table-column prop="_source.state_id_name" label="省份" width="120"></el-table-column>
      <el-table-column prop="_source.city_id_name" label="城市" width="120"></el-table-column>
      <el-table-column prop="_source.hospital_available_count" label="购进信使负责终端数" width="120"></el-table-column>
      <el-table-column prop="_source.hospital_assign_count" label="购进信使可负责终端数" width="120"></el-table-column>
      <el-table-column prop="_source.hospital_count" label="购进终端数" width="120"></el-table-column>
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
@import '../../style/variable'
// 重写样式
.bi-table-repeat
  .el-table
    th.table-date-column
      background $th-color
      .cell
        color #959595
        background $th-color
</style>
