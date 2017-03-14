<template>
<div id="app">
  <div class="side-menu">
    <el-col :span="8.5">
      <h5 class="title">标题</h5>
      <el-menu default-active="/business/main" class="el-menu-vertical-demo" theme="dark" :router="true">
        <el-menu-item index="/1">Dashboard</el-menu-item>
        <el-menu-item index="2">页面数据</el-menu-item>
        <el-submenu index="3">
          <template slot="title">业务数据

</template>
          <el-menu-item index="/business/main">信使拜访数据汇总</el-menu-item>
          <el-menu-item index="/business/terminal">区域终端购进汇总</el-menu-item>
          <el-menu-item index="/business/repeat">区域重复购进汇总</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4">财务数据</el-menu-item>
        <el-menu-item index="5">设置</el-menu-item>
      </el-menu>
    </el-col>
  </div>
  <keep-alive>
    <transition name="router-fade" mode="out-in">
  		<router-view class="router-view"></router-view>
    </transition>
  </keep-alive>
</div>

</template>

<script>
export default {}

</script>

<style lang="stylus">
$border-color = rgba(255,255,255,0.1)
$bg-color = #332E2E
$side-menu-width = 200px
$content-width = calc(100% - 200px)
.side-menu
  .title
    font-size 26px
    height 96px
    line-height 96px
    color rgb(193, 218, 134)
    border-bottom 1px solid $border-color
  .el-col
    position fixed
    top 0
    bottom 0
    left 0
    width $side-menu-width
    color #888888
    background $bg-color
    text-align center
    .el-menu
      background $bg-color
      .el-menu-item
        height auto
        min-height 96px
        line-height 96px
        font-size 18px
        border-bottom 1px solid $border-color
        &:first-child
          font-size 24px
      .el-submenu
        .el-submenu__title
          height auto
          min-height 96px
          line-height 96px
          font-size 18px
          border-bottom 1px solid $border-color
        .el-menu
          background $bg-color
          .el-menu-item
            font-size 14px
            min-height 50px
            line-height 50px
            padding-left 65px!important
            border none
            &:last-child
              border-bottom 1px solid $border-color
.router-view
  position absolute
  left $side-menu-width
  width $content-width
  height 100%
.router-fade-enter-active, .router-fade-leave-active {
  	transition: all .2s
}
.router-fade-enter, .router-fade-leave-active {
    opacity 0
}
</style>
