// 区域终端购进汇总
<template lang="html">
  <div class="page-businessTerminal">
    <v-header :flag="showGroup" :options="options"></v-header>
    <div class="table-wrapper">
      <data-tables
      v-show="!showGroup"
      v-loading.body="loading&&!showGroup"
      ref='table'
      :border="true"
      :stripe="true"
      :data='tableData'
      :search-def='{props:searchProp}'
      :has-action-col="false"
      :pagination-def='{pageSize:20,pageSizes:[20,50,100]}'>
        <el-table-column prop="sales_month" label="时间" class-name="table-date-column"></el-table-column>
        <el-table-column prop="product" label="SKU"></el-table-column>
        <el-table-column prop="state_id_name" label="省份"></el-table-column>
        <el-table-column prop="city_id_name" label="城市"></el-table-column>
        <el-table-column prop="hospital_available_count" label="购进信使负责终端数"></el-table-column>
        <el-table-column prop="hospital_assign_count" label="购进信使可负责终端数"></el-table-column>
        <el-table-column prop="hospital_count" label="购进终端数"></el-table-column>
      </data-tables>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header'

const date = new Date()
export default {
  components: {
    'v-header': header
  },
  created() {
    // init
    this.$nextTick(() => {
      // this._queryDetail()
    })
  },
  methods: {
    _queryDetail() {
      this.loading = true
      this.showGroup = false
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      bisTerminal({
        item: this.item,
        startTime: startTime,
        endTime: endTime,
        filterNameArr: this.filterNameArr
      }).then((res) => {
        this.loading = false
        let arr = res.data.hits.hits
        let tempArr = []
        let props = ['sales_month', 'product', 'state_id_name', 'city_id_name', 'hospital_available_count', 'hospital_assign_count', 'hospital_count']
        arr.forEach((t) => {
          let obj = {}
          props.forEach(k => {
            obj[k] = t._source[k]
          })
          tempArr.push(obj)
        })
        this.tableData = tempArr
      })
    },
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
      loading: false,
      tableData: [],
      startDate: this._getStartDate(),
      endDate: `${date.getFullYear()}-${(date.getMonth() + 1)}-01`
    }
  }
}
</script>

<style lang="stylus" scoped>

.page-businessTerminal
  background #f6f6f6
</style>
