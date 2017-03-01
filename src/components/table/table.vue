<template lang="html">
  <el-table :data="data&&data.length?data:tableData" border style="width: 100%" align="center">
      <el-table-column prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column label="基本信息" align="center">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
      </el-table-column>
      <el-table-column label="用户信息">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
      </el-table-column>
      <el-table-column label="实际拜访数据">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
      </el-table-column>
      <el-table-column label="实际销售数据">
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
          <el-table-column prop="province" label="省份" width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
      </el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    data: {
      type: Array,
      default: this.tableData
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this._init()
  },
  methods: {
    _init() {
      axios.get('static/data/tableData.json').then((res) => {
        this.tableData = res.data
      })
    }
  }
}

</script>

<style lang="stylus">
</style>
