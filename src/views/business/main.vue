// 区域重复购进汇总
<template lang="html">
  <div class="page-businessMain">
    <v-header :tableData="tableData"></v-header>
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
        <div class="time-wrapper">
          <span class="time" v-for="time in times_filter">{{time.name}}</span>
        </div>
      </div>
      <div class="export-wrapper" @click="exportData()">
        <exportExcel ref="exportExcel"></exportExcel>
      </div>
    </div>
    <div class="table-wrapper">
      <data-tables :data='tableData' :search-def='{show:false}' :has-action-col="false" :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'>
        <el-table-column prop="_source.current_date" label="日期" width="100" class-name="table-date-column" style="background:blue"></el-table-column>
        <el-table-column label="基本信息">
          <el-table-column prop="_source.product" label="SKU" min-width="100"></el-table-column>
          <el-table-column prop="_source.state_id_name" label="省份"></el-table-column>
          <el-table-column prop="_source.city_id_name" label="城市"></el-table-column>
          <el-table-column prop="_source.hospital" label="终端" min-width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="用户信息">
          <el-table-column prop="_source.messenger" label="负责信使"></el-table-column>
          <el-table-column prop="_source.total_count" label="累计关注医生"></el-table-column>
          <el-table-column prop="_source.doc_count" label="关注医生"></el-table-column>
        </el-table-column>
        <el-table-column label="实际拜访数据">
          <el-table-column prop="_source.visit_count_sum" label="拜访次数"></el-table-column>
          <el-table-column prop="_source.read_material_sum" label="阅读次数"></el-table-column>
          <el-table-column prop="_source.doctor_evaluate_sum" label="反馈次数"></el-table-column>
        </el-table-column>
        <el-table-column label="实际销售数据">
          <el-table-column prop="_source.sales_count_sum" label="销售数量"></el-table-column>
          <el-table-column prop="_source.sales_amount_sum" label="销售额"></el-table-column>
        </el-table-column>
      </data-tables>
    </div>
  </div>
</template>

<script>
import tableMain from 'components/table/tableMain'
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import vuex from 'vuex'
import {
  bisMain
} from 'service/getData'

export default {
  components: {
    'v-table': tableMain,
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
  },
  methods: {
    exportData() {
      this.$refs.exportExcel.exportCsv(this.$refs.table, this.tableData, '信使拜访数据汇总')
    },
    _init() {
      bisMain().then((res) => {
        this.tableData = res.data.hits.hits
      })
    }
  }
}

</script>

<style lang="stylus">
@import '../../style'

.page-businessMain
  position absolute
  background #f6f6f6

</style>
