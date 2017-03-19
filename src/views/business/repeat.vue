// 区域重复购进汇总
<template lang="html">
  <div class="page-businessRepeat">
    <v-header :options="conditions"></v-header>
    <div class="et-filters">
      <div class="conditions">
        <span class="title">过滤条件：</span>
        <div class="bi-checkbox-wrapper">
          <bi-checkbox-group :items="conditions.slice()" @check-change="checkChange"></bi-checkbox-group>
        </div>
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
      <div class="repeats">
        <div class="rep">
          <span>重复购进</span>
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="month">
          <span>个月购进</span>
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="export-wrapper" @click="exportData">
        <exportExcel ref="exportExcel"></exportExcel>
      </div>
    </div>
    <div class="table-wrapper">
      <data-tables :data='tableData'
      ref='table'
      :search-def='{props:searchProp}'
      :has-action-col="false"
      :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'>
        <el-table-column prop="sales_month" label="时间" class-name="table-date-column" style="background:blue"></el-table-column>
        <el-table-column prop="product" label="SKU"></el-table-column>
        <el-table-column prop="state_id_name" label="省份"></el-table-column>
        <el-table-column prop="city_id_name" label="城市"></el-table-column>
        <el-table-column prop="last_month_task_available_hospital" label="重复购进信使负责终端数"></el-table-column>
        <el-table-column prop="last_month_task_assign_hospital" label="重复购进信使可负责终端数"></el-table-column>
        <el-table-column prop="last_month_sales_hospital" label="重复购进终端数"></el-table-column>
      </data-tables>
    </div>
  </div>
</template>

<script>
import tableRepeat from 'components/table/tableRepeat'
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import BiCheckboxGroup from 'components/checkbox-group'
import {
  bisRepeat
} from 'service/getData'

export default {
  components: {
    'v-table': tableRepeat,
    'v-header': header,
    exportExcel,
    BiCheckboxGroup
  },
  created() {
    this.$root.$on('selectChange', v => {
      this.searchProp = v
      console.log(v);
    })
    this._init()
  },
  data() {
    return {
      tableData: [],
      startDate: '2016-10-01',
      endDate: '2017-03-01',
      monthValue: '',
      searchProp: '',
      conditions: [{
        name: 'SKU',
        code: 'product'
      }, {
        name: '省份',
        code: 'state_id_name'
      }, {
        name: '城市',
        code: 'city_id_name'
      }],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    checkChange(item) {
      console.log(item);
    },
    _init() {
      bisRepeat().then((res) => {
        let arr = res.data.hits.hits
        let tempArr = []
        let props = ['sales_month', 'product', 'state_id_name', 'city_id_name', 'last_month_task_available_hospital', 'last_month_task_assign_hospital', 'last_month_sales_hospital']
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
    exportData() {
      let table = this.$refs.table
      this.$refs.exportExcel.exportCsv(table, table.tableData, '区域重复购进汇总')
    }
  }
}

</script>

<style lang="stylus">
@import '../../style/variable'

.page-businessRepeat
  background #f6f6f6
</style>
