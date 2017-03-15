// 区域终端购进汇总
<template lang="html">
  <div class="page-businessTerminal">
    <v-header></v-header>
    <div class="et-filters">
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
      <div class="export-wrapper" @click="exportData()">
        <exportExcel ref="exportExcel"></exportExcel>
      </div>
    </div>
    <div class="table-wrapper">
      <data-tables :data='tableData' :search-def='{show:false}' :has-action-col="false" :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'>
        <el-table-column prop="sales_month" label="时间" class-name="table-date-column" style="background:blue"></el-table-column>
        <el-table-column prop="product" label="产品"></el-table-column>
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
import tableTerminal from 'components/table/tableTerminal'
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import {
  bisTerminal
} from 'service/getData'

export default {
  components: {
    'v-table': tableTerminal,
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
      conditions: [{
        name: 'SKU'
      }, {
        name: '省份'
      }, {
        name: '城市'
      }]
    }
  },
  methods: {
    _init() {
      bisTerminal().then((res) => {
        let arr = res.data.hits.hits
        let tempArr = []
        arr.forEach((t) => {
          tempArr.push(t._source)
        })
        this.tableData = tempArr
      })
    },
    exportData() {
      this.$refs.exportExcel.exportCsv(this.$refs.table, this.tableData, '区域终端购进汇总')
    }
  }
}

</script>

<style lang="stylus">

.page-businessTerminal
  background #f6f6f6
</style>
