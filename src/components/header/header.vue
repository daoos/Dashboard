<template lang="html">
  <div class="bi-header">
    <el-menu theme="dark" default-active="1" class="header-bar" mode="horizontal">
      <el-menu-item index="1">概览</el-menu-item>
      <el-menu-item index="2">分析</el-menu-item>
      <div class="search">
        <span class="text">搜索</span>
        <div class="input-wrapper">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>选择一</el-dropdown-item>
              <el-dropdown-item>选择二</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <input type="text">
          <i class="el-icon-search"></i>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {}

</script>

<style lang="stylus">
$subject-color = #10A0F7
.bi-header
  .header-bar
    padding-left 78px
    background $subject-color
    .el-menu-item
      height 96px
      padding 0
      margin 0 20px
      line-height 96px
      font-size 24px
      color rgba(255, 255, 255, 0.6)
      &.is-active
        color white
        border-bottom-color white
      &:hover
        border-bottom-color white
        background transparent!important
    .search
      position absolute
      right 77px
      font-family STHeitiSC-Medium
      font-size 24px
      line-height 96px
      color white
      .input-wrapper
        display inline
        height 40px
        width 400px
        padding 7px
        margin-left 10px
        background rgba(255,255,255,0.6)
        border-radius 8px
        .el-dropdown
          cursor pointer
        input
          background none
          border none
        .el-icon-search
          font-size 20px
          width 20px
          height 20px
          margin-right 6px
          color $subject-color
</style>
