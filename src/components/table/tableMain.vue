<template lang="html">
  <div class="sc-table">
    <el-table :data="curTableData" align="center" :border="border">
        <el-table-column label="分组" width="100">
          <template  scope="scope">
            <div class="group">{{scope.row.key}} ({{scope.row.doc_count}})</div>
          </template>
        </el-table-column>
        <el-table-column label="基本信息">
          <el-table-column label="SKU"></el-table-column>
          <el-table-column label="省份"></el-table-column>
          <el-table-column label="城市"></el-table-column>
          <el-table-column label="终端" min-width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="用户信息">
          <el-table-column label="负责信使"></el-table-column>
          <el-table-column label="累计关注医生"></el-table-column>
          <el-table-column label="关注医生"></el-table-column>
        </el-table-column>
        <el-table-column label="实际拜访数据">
          <el-table-column label="拜访次数"></el-table-column>
          <el-table-column label="阅读次数"></el-table-column>
          <el-table-column label="反馈次数"></el-table-column>
        </el-table-column>
        <el-table-column label="实际销售数据">
          <el-table-column label="销售数量"></el-table-column>
          <el-table-column label="销售额" inline-template>
            <i class="el-icon-arrow-right go-detail-icon"></i>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="page-wrapper">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  computed: {
    tableData() {
      return this.data.slice()
    },
    total() {
      return this.tableData.length
    },
    curTableData() {
      let from = this.pageSize * (this.currentPage - 1)
      let to = from + this.pageSize
      return this.tableData.slice(from, to)
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  },
  data() {
    return {
      splitData: [],
      currentPage: 1,
      pageSize: 10,
      border: false
    }
  }
}

</script>

<style lang="stylus">

</style>
