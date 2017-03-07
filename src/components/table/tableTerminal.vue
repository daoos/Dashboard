<template lang="html">
  <div class="bi-table-repeat">
    <el-table :data="data" border align="center" width="1500">
      <el-table-column prop="_source.sales_month" label="时间" width="120" class-name="table-date-column" style="background:blue"></el-table-column>
      <el-table-column prop="_source.product" label="产品" width="120"></el-table-column>
      <el-table-column prop="_source.state_id_name" label="省份" width="120"></el-table-column>
      <el-table-column prop="_source.city_id_name" label="城市" width="120"></el-table-column>
      <el-table-column prop="_source.hospital_available_count" label="购进信使负责终端数" width="120"></el-table-column>
      <el-table-column prop="_source.hospital_assign_count" label="购进信使可负责终端数" width="120"></el-table-column>
      <el-table-column prop="_source.hospital_count" label="购进终端数" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}

</script>

<style lang="stylus">
$subject-color = #10A0F7
// 重写样式
.bi-table-repeat
  .el-table
    border none
    background #f6f6f6
    font-family STHeitiSC-Medium
    &::before
      height 0
    table
      width 100%!important
    td,th
      text-align center
      height 100px
    th[colspan="1"]
      background #EFEFEF
      .cell
        font-size 18px
        color #959595
        background #EFEFEF
    td
      font-size 18px
    .table-date-column
      .cell
        padding 0 4px
    th.table-date-column
      background $subject-color
      .cell
        color white
        background $subject-color
</style>
