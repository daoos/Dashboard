// 区域终端购进汇总
<template lang="html">
  <div class="data-pageData">
    <v-header :flag="showGroup"></v-header>
    <div class="et-filters">
      <div class="times">
        <span class="title">时段选择：</span>
        <div class="start">
          <span class="text">起始：</span>
          <el-date-picker
            type="month"
            ref='startDate'
            v-model="startDate"
            @change='timeChange'
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
         <div class="end">
          <span class="text">截止：</span>
          <el-date-picker
            type="month"
            ref='endDate'
            v-model="endDate"
            @change='timeChange'
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
        <el-table-column prop="sales_month" label="页面显示名" class-name="table-date-column"></el-table-column>
        <el-table-column prop="product" label="页面受访人数"></el-table-column>
        <el-table-column prop="state_id_name" label="页面受访次数（比率）"></el-table-column>
        <el-table-column prop="city_id_name" label="受仿时长占比"></el-table-column>
        <el-table-column prop="hospital_available_count" label="平均停留时长"></el-table-column>
        <el-table-column prop="hospital_assign_count" label="离开应用"></el-table-column>
        <el-table-column label="走向">
          <template  scope="scope">
            <div class="detail" @click="goDetail">查看</div>
          </template>
        </el-table-column>
      </data-tables>

      <data-tables
      v-show="showGroup"
      v-loading.body="loading&&showGroup"
      :data='groupData'
      :border="true"
      :stripe="false"
      ref="groupTable"
      :has-action-col="false"
      :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'
      :search-def='{props:searchProp}'>
        <el-table-column label="转向页面" width="250" prop="name"></el-table-column>
        <el-table-column label="比例">
          <template  scope="scope">
<div class="progressBar">
  <div class="pro-wrapper">
    <el-progress :percentage="scope.row.num" :show-text="false" :stroke-width="16"></el-progress>
  </div>
  <span class="num">{{scope.row.num}}%</span>
</div>
</template>
        </el-table-column>
      </data-tables>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import BiCheckboxGroup from 'components/checkbox-group'
import {
  bisTerminal,
  bisTerByGroup
} from 'service/getData'

const date = new Date()
export default {
  components: {
    'v-header': header,
    exportExcel,
    BiCheckboxGroup
  },
  created() {
    this.$root.$on('selectChange', v => {
      this.searchProp = v
    });
    // init
    this.$nextTick(() => {
      this._queryDetail()
    })
  },
  methods: {
    timeChange() {
      if (this.showGroup) {
        this._queryGroup()
      } else {
        this._queryDetail()
      }
    },
    goDetail() {
      this.showGroup = true
    },
    timeFilterClick(item) {
      let flag = false
        // 判断是否已经点击
      this.times_filter.forEach(t => {
        if (t.name === item.name && item.checked) {
          flag = true
        }
      })
      if (flag) {
        return
      }
      let arr = this.times_filter.slice()
      arr.forEach(t => {
        t.checked = false
        if (t.name === item.name) {
          t.checked = true
        }
      })
      this.times_filter = arr
      this._queryByTime(time)
    },
    // 过滤条件点击事件
    _queryByTime(time) {
      console.log(time);
    },
    _queryGroup() {
      this.loading = true
      this.showGroup = true
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      bisTerByGroup({
        item: this.item,
        startTime: startTime,
        endTime: endTime,
        filterNameArr: this.filterNameArr
      }).then(res => {
        this.loading = false
        this.groupData = res.data.aggregations[this.item.code].buckets
      })
    },
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
        this.tableData = [{}]
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
    },
    exportData() {
      let table = this.$refs.table
      this.$refs.exportExcel.exportCsv(table, table.tableData, '页面数据统计')
    }
  },
  data() {
    return {
      loading: true,
      tableData: [],
      startDate: this._getStartDate(),
      endDate: `${date.getFullYear()}-${(date.getMonth() + 1)}-01`,
      showGroup: false,
      searchProp: '',
      groupData: [{
        name: '离开应用',
        num: 27.1
      }, {
        name: 'page1',
        num: 18.8
      }],
      item: {
        code: 'home'
      },
      lastCode: '',
      filterNameArr: [] // 存储筛选详情的数组
    }
  }
}
</script>

<style lang="stylus">
@import '../../style'

.data-pageData
  background #f6f6f6
  .et-filters
    padding 20px
  .export-wrapper
    top 22px
  .detail
    cursor pointer
    color $subject-color
  .progressBar
    display flex
    line-height 16px
    .pro-wrapper
      flex 1
      .el-progress-bar__outer
         background none
         .el-progress-bar__inner
            background-color #0F9AEE
    .num
      display inline-block
      width 130px
      text-align center
</style>
