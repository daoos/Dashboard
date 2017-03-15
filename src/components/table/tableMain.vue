<template lang="html">
  <div class="sc-table">
    <el-table :data="tableData" align="center">
        <el-table-column label="分组" width="100" inline-template>
          <div class="group">
            富露施F300（2）
          </div>
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

</style>
