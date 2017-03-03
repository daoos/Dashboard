<template lang="html">
  <div class="bi-export">
    <img src="./assets/excel.png" width="29" height="34">
    <div class="text">导出EXCEL</div>
  </div>
</template>

<script>
import CsvExport from '@/utils/CsvExport'

export default {
  methods: {
    exportCsv(tableEl, tableData, fileName) {
      let columns = this.getColumns(tableEl)
      const fields = columns.map(t => t.prop)
      const fieldNames = columns.map(t => t.label)
      CsvExport(tableData, fields, fieldNames, fileName)
    },
    /**
     * 针对多级分类表格，需循环遍历table获取columns
     */
    getColumns(tableEl, arr = []) {
      if (!tableEl.$children.length) {
        return
      }
      tableEl.$children.forEach((data) => {
        if (!data.$children.length && data.prop) {
          arr.push(data)
        } else {
          this.getColumns(data, arr)
        }
      })
      return arr
    }
  }
}

</script>

<style lang="stylus">
.bi-export
  cursor pointer
  font-family STHeitiSC-Medium
  font-size 14px
  text-align center
  color #0F9AEE
  &:active
    color rgba(15, 154, 238, 0.65)
  .text
    padding-top 11px
</style>
