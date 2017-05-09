// 区域终端购进汇总
<template lang="html">
  <div class="business-detail">
    <v-header :flag="showGroup" :options="options" :routerArr="routerArr" @breadClick="breadClick"></v-header>
    <div class="et-filters">
      <div class="conditions">
        <span class="title">分组筛选：</span>
        <div class="bi-checkbox-wrapper">
          <bi-checkbox-group :items="checkArr" @check-change="checkChange"></bi-checkbox-group>
        </div>
      </div>
      <div class="dot-line"></div>
      <div class="times">
        <span class="title">时段选择：</span>
        <div class="start">
          <span class="text">起始：</span>
          <el-date-picker
            type="date"
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
            type="date"
            ref='endDate'
            v-model="endDate"
            @change='timeChange'
            :clearable="false"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="time-wrapper">
          <span class="title">分析周期：</span>
          <bi-checkbox-group :showClose="false" :items="times_filter" @check-change="timeFilterClick"></bi-checkbox-group>
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
        <el-table-column prop="create_date" label="时间" class-name="table-date-column"></el-table-column>
        <el-table-column prop="source_state_name" label="省份"></el-table-column>
        <el-table-column prop="source_city_name" label="城市"></el-table-column>
        <el-table-column prop="source_name" label="信使"></el-table-column>
        <el-table-column prop="source_mobile" label="注册手机"></el-table-column>
        <el-table-column prop="state_str" label="状态"></el-table-column>
        <el-table-column prop="broker_id_name" label="经纪人"></el-table-column>
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
        <el-table-column label="省份"></el-table-column>
        <el-table-column label="城市"></el-table-column>
        <el-table-column label="信使"></el-table-column>
        <el-table-column label="注册手机"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="经纪人"></el-table-column>
      </data-tables>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header'
import exportExcel from 'components/export/export'
import BiCheckboxGroup from 'components/checkbox-group'
import {
  MesAttDetail,
  MesAttDetailByGroup
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
      this.timeflag = item.code
      this._queryByTime()
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
      let arr = this.options.slice().filter(r => r.code !== 'source_name')
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
      if (this.timeflag === 'day') {
        this._queryDetail()
      } else {
        this._queryGroup()
      }
    },
    _queryGroup() {
      this.loading = true
      this.showGroup = true
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      MesAttDetailByGroup({
        item: this.item,
        startTime: startTime,
        endTime: endTime,
        filterNameArr: this.filterNameArr,
        timeflag: this.timeflag === 'day' ? null : this.timeflag
      }).then(res => {
        let p = this.item.code === 'home' ? 'timeflag' : this.item.code
        this.loading = false
        this.groupData = res.data.aggregations[p].buckets
        if (this.timeflag && this.item.code === 'home') {
          this.groupData.forEach((d) => {
            if (this.timeflag === 'month') {
              d.key = d.key_as_string.substring(0, 7)
            } else {
              d.key = d.key_as_string.substring(0, 4)
            }
          })
        }
      })
    },
    _queryDetail() {
      this.loading = true
      this.showGroup = false
      let startTime = this.$refs.startDate.displayValue
      let endTime = this.$refs.endDate.displayValue
      MesAttDetail({
        item: this.item,
        startTime: startTime,
        endTime: endTime,
        filterNameArr: this.filterNameArr
      }).then((res) => {
        this.loading = false
        let arr = res.data.hits.hits
        let tempArr = []
        let props = ['create_date', 'source_state_name', 'source_city_name', 'source_name', 'source_mobile', 'state_str', 'broker_id_name']
        arr.forEach((t) => {
          let obj = {}
          props.forEach(k => {
            if (k === 'create_date') {
              obj[k] = t._source[k].split(' ')[0]
            } else {
              obj[k] = t._source[k] || '-'
            }
          })
          tempArr.push(obj)
        })
        this.tableData = tempArr
        this.store.push(this._getStoreObj())
      })
    },
    _getStoreObj() {
      return {
        checkArr: this._duplicateData(this.checkArr), // 防止闭包
        routerArr: this._duplicateData(this.routerArr),
        item: this._duplicateData(this.item),
        filterNameArr: this._duplicateData(this.filterNameArr),
        lastCode: this._duplicateData(this.lastCode),
        tableData: this._duplicateData(this.tableData)
      }
    },
    _duplicateData(data) {
      return JSON.parse(JSON.stringify(data))
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
      this.$refs.exportExcel.exportCsv(table, table.tableData, '信使关注详情')
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
        name: '信使',
        code: 'source_name'
      }, {
        name: '状态',
        code: 'state_str'
      }, {
        name: '省份',
        code: 'source_state_name'
      }, {
        name: '城市',
        code: 'source_city_name'
      }, {
        name: '经纪人',
        code: 'broker_id_name'
      }],
      times_filter: [{
        name: '日报',
        code: 'day',
        checked: true
      }, {
        name: '月报',
        code: 'month'
      }, {
        name: '年报',
        code: 'year'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
.business-detail
  background #f6f6f6
</style>
