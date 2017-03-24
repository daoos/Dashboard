// 区域终端购进汇总
<template lang="html">
  <div class="page-businessTerminal">
    <v-header :flag="showGroup" :options="options" :routerArr="routerArr" @breadClick="breadClick"></v-header>
    <div class="et-filters">
      <div class="conditions">
        <span class="title">过滤条件：</span>
        <div class="bi-checkbox-wrapper">
          <bi-checkbox-group :items="checkArr" @check-change="checkChange"></bi-checkbox-group>
        </div>
        <span class="info">(医院、基层医疗机构、药店)</span>
      </div>
      <div class="dot-line"></div>
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
      :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'>
        <el-table-column prop="sales_month" label="时间" class-name="table-date-column"></el-table-column>
        <el-table-column prop="product" label="SKU"></el-table-column>
        <el-table-column prop="state_id_name" label="省份"></el-table-column>
        <el-table-column prop="city_id_name" label="城市"></el-table-column>
        <el-table-column prop="hospital_available_count" label="购进信使负责终端数"></el-table-column>
        <el-table-column prop="hospital_assign_count" label="购进信使可负责终端数"></el-table-column>
        <el-table-column prop="hospital_count" label="购进终端数"></el-table-column>
      </data-tables>

      <data-tables
      v-show="showGroup"
      v-loading.body="loading&&showGroup"
      @row-click='rowClick'
      :border="false"
      :stripe="false"
      :data='groupData'
      ref="groupTable"
      :has-action-col="false"
      :pagination-def='{pageSize:10,pageSizes:[10,20,50]}'
      :search-def='{props:searchProp}'>
        <el-table-column label="分组" width="100">
          <template  scope="scope">
            <div class="group">{{scope.row.key}} ({{scope.row.doc_count}})</div>
          </template>
        </el-table-column>
        <el-table-column label="SKU"></el-table-column>
        <el-table-column label="省份"></el-table-column>
        <el-table-column label="城市"></el-table-column>
        <el-table-column label="购进信使负责终端数"></el-table-column>
        <el-table-column label="购进信使可负责终端数"></el-table-column>
        <el-table-column label="购进终端数"></el-table-column>
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
      this._setCheckArr()
    })
  },
  methods: {
    breadClick(item, index) {
      let data = {}
      this.store.forEach((s, i) => {
        if (s.item.code === item.code) {
          data = s
          index = i || 1
          return
        }
      })
      this.store = this.store.slice(0, index)
      this._setHistory(data)
    },
    rowClick(row) {
      this.filterNameArr.push({
        code: this.item.code,
        name: row.key
      })
      this.showGroup = false
      this._setRouterArr()
      this._setCheckArr()
      this._queryDetail()
    },
    timeChange() {
      if (this.showGroup) {
        this._queryGroup()
      } else {
        this._queryDetail()
      }
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
    checkChange(item, flag) {
      this.item = item
      this.flag = flag
      if (item.disabled || this.lastCode === item.code && flag) {
        return
      }
      this.lastCode = item.code
      if (!flag) {
        this._cancelClick()
        return
      }
      this._queryGroup()
      this._setCheckArr()
    },
    _cancelClick() {
      this.flag = false
      this.lastCode = ''
      this._setCheckArr()
      this.showGroup = false
    },
    _setCheckArr() {
      let arr = this.options.slice()
      arr.forEach(i => {
        i.checked = false
        i.disabled = false
        if (i.code && i.code === this.item.code) {
          i.checked = this.flag && true
        }
        this.routerArr.forEach(r => {
          if (r.code === i.code) {
            i.checked = false
            i.disabled = true
          }
        })
      });
      this.checkArr = arr
    },
    _setRouterArr(item) {
      let len1 = this.routerArr.length - 1
      let len2 = this.checkArr.filter(f => f.disabled || f.checked).length
      this.checkArr.forEach(c => {
        if (len1 < len2) {
          if (c.checked || c.disabled) {
            if (!this.routerArr.filter(f => f.code === c.code).length) {
              this.routerArr.push(c)
            }
          }
        } else if (len1 > len2) {
          while (this.routerArr.length - 1 !== len2) {
            this.routerArr.pop()
          }
        } else {
          if (this.item) {
            let arr = this.routerArr.slice()
            arr[len1] = this.item
            this.routerArr = arr
          }
        }
      })
    },
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
        this.tableData = tempArr
        this.store.push(this._getStoreObj())
      })
    },
    _getStoreObj() {
      return {
        checkArr: JSON.parse(JSON.stringify(this.checkArr)), // 防止闭包
        routerArr: JSON.parse(JSON.stringify(this.routerArr)),
        item: JSON.parse(JSON.stringify(this.item)),
        filterNameArr: JSON.parse(JSON.stringify(this.filterNameArr)),
        lastCode: JSON.parse(JSON.stringify(this.lastCode)),
        tableData: JSON.parse(JSON.stringify(this.tableData))
      }
    },
    _setHistory(data) {
      this.loading = false
      this.showGroup = false
      this.item = data.item
      this.checkArr = data.checkArr.slice()
      this.routerArr = data.routerArr.slice()
      this.filterNameArr = data.filterNameArr.slice()
      this.lastCode = data.lastCode
      this.tableData = data.tableData
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
      this.$refs.exportExcel.exportCsv(table, table.tableData, '区域终端购进汇总')
    }
  },
  data() {
    return {
      loading: true,
      store: [],
      tableData: [],
      startDate: this._getStartDate(),
      endDate: `${date.getFullYear()}-${(date.getMonth() + 1)}-01`,
      showGroup: false,
      searchProp: '',
      groupData: [],
      item: {
        code: 'home'
      },
      lastCode: '',
      checkArr: [],
      routerArr: [{
        name: '业务数据',
        code: 'home'
      }],
      filterNameArr: [], // 存储筛选详情的数组
      options: [{
        name: 'SKU',
        code: 'product'
      }, {
        name: '省份',
        code: 'state_id_name'
      }, {
        name: '城市',
        code: 'city_id_name'
      }]
    }
  }
}

</script>

<style lang="stylus">

.page-businessTerminal
  background #f6f6f6
</style>
