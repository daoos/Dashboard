// 区域重复购进汇总
<template lang="html">
  <div class="page-businessMain">
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
          <span class="title">分析周期：</span>
          <bi-checkbox-group :items="times_filter"></bi-checkbox-group>
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
      ref="groupTable"
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

const date = new Date()
export default {
  components: {
    'v-table': tableMain,
    'v-header': header,
    exportExcel,
    BiCheckboxGroup
  },
  created() {
    window.x = this
    this.$root.$on('selectChange', v => {
      this.searchProp = v
    });
    // init
    this.$nextTick(() => {
      this._queryDetail()
      this._setCheckArr()
        // this._setHistory()
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
    timeChange(item) {
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
      this._queryGroup(item)
      this._setCheckArr()
    },
    exportData() {
      let table = this.$refs.table
      this.$refs.exportExcel.exportCsv(table, table.tableData, '信使拜访数据汇总')
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
      this.showGroup = true
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      bisMainByGroup({
        item: this.item,
        startTime: startTime,
        endTime: endTime,
        filterNameArr: this.filterNameArr
      }).then(res => {
        this.groupData = res.data.aggregations[this.item.code].buckets
      })
    },
    _queryDetail() {
      this.showGroup = false
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      bisMain({
        item: this.item,
        startTime: startTime,
        endTime: endTime,
        filterNameArr: this.filterNameArr
      }).then((res) => {
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
      // let data = this.store.pop()
      this.item = data.item
      this.checkArr = data.checkArr.slice()
      this.routerArr = data.routerArr.slice()
      this.filterNameArr = data.filterNameArr.slice()
      this.lastCode = data.lastCode
      this.tableData = data.tableData
      this.showGroup = false
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
