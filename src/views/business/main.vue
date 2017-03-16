// 区域重复购进汇总
<template lang="html">
  <div class="page-businessMain">
    <v-header :tableData="tableData" :options="options"></v-header>
    <div class="et-filters">
      <div class="conditions">
        <span class="title">过滤条件：</span>
        <div class="bi-checkbox-wrapper">
          <bi-checkbox-group :items="options.slice()" @check-change="checkChange"></bi-checkbox-group>
        </div>
        <span class="info">(医院、基层医疗机构、药店)</span>
      </div>
      <div class="dot-line"></div>
      <div class="times">
        <span class="title">时段选择：</span>
        <div class="start">
          <span class="text">起始：</span>
          <el-date-picker
            ref='startDate'
            @change='timeChange'
            type="date"
            v-model="startDate"
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="end">
          <span class="text">截止：</span>
          <el-date-picker
            ref='endDate'
            @change='timeChange'
            type="date"
            v-model="endDate"
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="time-wrapper">
          <bi-checkbox-group :items="times_filter" @check-change="timeChange"></bi-checkbox-group>
        </div>
      </div>
      <div class="export-wrapper" @click="exportData()">
        <exportExcel ref="exportExcel"></exportExcel>
      </div>
    </div>
    <div class="table-wrapper">
      <data-tables
      v-show="!showGroup"
      ref="table"
      :border="true"
      :stripe="true"
      :data='tableData'
      :has-action-col="false"
      :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'
      :search-def='{props:searchProp}'>
        <el-table-column prop="current_date" label="日期" width="100"></el-table-column>
        <el-table-column label="基本信息">
          <el-table-column prop="product" label="SKU" min-width="100"></el-table-column>
          <el-table-column prop="state_id_name" label="省份"></el-table-column>
          <el-table-column prop="city_id_name" label="城市"></el-table-column>
          <el-table-column prop="hospital" label="终端" min-width="140"></el-table-column>
        </el-table-column>
        <el-table-column label="用户信息">
          <el-table-column prop="messenger" label="负责信使"></el-table-column>
          <el-table-column prop="total_count" label="累计关注医生"></el-table-column>
          <el-table-column prop="doc_count" label="关注医生"></el-table-column>
        </el-table-column>
        <el-table-column label="实际拜访数据">
          <el-table-column prop="visit_count_sum" label="拜访次数"></el-table-column>
          <el-table-column prop="read_material_sum" label="阅读次数"></el-table-column>
          <el-table-column prop="doctor_evaluate_sum" label="反馈次数"></el-table-column>
        </el-table-column>
        <el-table-column label="实际销售数据">
          <el-table-column prop="sales_count_sum" label="销售数量"></el-table-column>
          <el-table-column prop="sales_amount_sum" label="销售额"></el-table-column>
        </el-table-column>
      </data-tables>

      <data-tables
      v-show="showGroup"
      @row-click='rowClick'
      :border="false"
      :stripe="false"
      :data='groupData'
      :has-action-col="false"
      :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'
      :search-def='{props:searchProp}'>
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
      </data-tables>
      <!-- <v-table :data="groupData" v-if="showGroup"></v-table> -->
    </div>
  </div>
</template>

<script>
import tableMain from 'components/table/tableMain'
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import BiCheckboxGroup from 'components/checkbox-group'
import {
  bisMain,
  bisMainByGroup
} from 'service/getData'

export default {
  components: {
    'v-table': tableMain,
    'v-header': header,
    exportExcel,
    BiCheckboxGroup
  },
  created() {
    this.$root.$on('selectChange', v => {
      this.searchProp = v
    })
    this._init()
  },
  methods: {
    rowClick(row) {
      console.log(row);
    },
    timeChange(item) {
      console.log(this.$refs.startDate.displayValue, this.$refs.endDate.displayValue);
    },
    checkChange(item) {
      console.log(item);
      if (!item) {
        this.showGroup = false
        return
      }
      this.showGroup = true
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      bisMainByGroup(item.code, startTime, endTime).then(res => {
        this.groupData = res.data.aggregations[item.code].buckets
      })
    },
    getProps() {
      let arr = []
      this.options.forEach(t => {
        arr.push(t.code)
      })
      return arr
    },
    exportData() {
      let table = this.$refs.table
      this.$refs.exportExcel.exportCsv(table, table.tableData, '信使拜访数据汇总')
    },
    _init() {
      bisMain().then((res) => {
        let arr = res.data.hits.hits
        let tempArr = []
        let props = ['current_date', 'product', 'state_id_name', 'city_id_name', 'hospital', 'messenger', 'total_count', 'doc_count', 'visit_count_sum', 'read_material_sum', 'doctor_evaluate_sum', 'sales_count_sum', 'sales_amount_sum']
        arr.forEach((t) => {
          let obj = {}
          props.forEach(k => {
            obj[k] = t._source[k]
          })
          tempArr.push(obj)
        })
        this.tableData = tempArr
      })
    }
  },
  data() {
    return {
      tableData: [],
      startDate: '2016-10-01',
      endDate: '2017-03-01',
      showGroup: false,
      searchProp: '',
      groupData: [],
      options: [{
        name: '信使',
        code: 'messenger'
      }, {
        name: 'SKU',
        code: 'product'
      }, {
        name: '省份',
        code: 'state_id_name'
      }, {
        name: '城市',
        code: 'city_id_name'
      }, {
        name: '终端',
        code: 'hospital'
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
  }
}

</script>

<style lang="stylus">

.page-businessMain
  position absolute
  background #f6f6f6

</style>
