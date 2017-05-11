<template lang="html">
  <div class="router-dashboard">
    <el-menu :default-active="'/data/dashboard/ring'" class="header-bar" mode="horizontal" :router="true">
      <el-menu-item index="/data/dashboard/ring">环比</el-menu-item>
      <el-menu-item index="/data/dashboard/area">区域对比</el-menu-item>
      <el-menu-item index="/data/dashboard/duty">任务概况</el-menu-item>
    </el-menu>
    <router-view class="dashboard-router-view"></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '../../style'

.router-dashboard
  .header-bar
    padding-left 38px
    background $subject-color
    .breadcrumb
      display inline
      float left
      .el-breadcrumb
        line-height 70px
        font-size 18px
        .el-breadcrumb__item
          .el-breadcrumb__item__inner
            color rgba(255,255,255,0.6)
          &:last-child
            .el-breadcrumb__item__inner
              color white
    .el-menu-item
      height 70px
      padding 0
      margin 0 20px
      line-height 70px
      font-size 18px
      color rgba(255, 255, 255, 0.6)
      &.is-active
        color white
        border-bottom-color white
      &:hover
        border-bottom-color white
        background transparent!important
 .dashboard-router-view
    min-height calc(100% - 70px)
    background #f6f6f6
</style>
