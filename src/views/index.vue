<template lang="html">
  <div class="bi-business">
    <div class="side-menu">
      <el-col :span="8.5">
        <h5 class="title">医时</h5>
        <el-menu default-active="/data/business/main" class="el-menu-vertical-demo" theme="dark" :router="true">
          <el-menu-item index="/data/dailyData" v-if="$store.state.views.dashboard">Dashboard</el-menu-item>
          <el-menu-item index="/data/pageData" v-if="$store.state.views.pageData">页面数据</el-menu-item>
          <el-submenu index="3">
            <template slot="title">业务数据</template>
            <el-menu-item index="/data/business/main" v-if="$store.state.views.bisVisit">信使拜访数据汇总</el-menu-item>
            <el-menu-item index="/data/business/terminal" v-if="$store.state.views.bisTerminal">区域终端购进汇总</el-menu-item>
            <el-menu-item index="/data/business/repeat" v-if="$store.state.views.bisRepeat">区域重复购进汇总</el-menu-item>
            <el-menu-item index="/data/business/detail" v-if="$store.state.views.bisDetail">信使关注详情</el-menu-item>
            <el-menu-item index="/data/business/quesDetail" v-if="$store.state.views.bisQuesDetail">调查问卷统计详情</el-menu-item>
          </el-submenu>
          </el-submenu>
          <el-menu-item index="4" v-if="$store.state.views.financialData">财务数据</el-menu-item>
          <el-menu-item index="/data/setting" v-if="$store.state.views.setting">设置</el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <transition name="router-fade" mode="out-in">
      <router-view class="business-router-view"></router-view>
    </transition>
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
.bi-business
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
              position relative
              padding-right 25px
              text-align right
              font-size 14px
              min-height 50px
              line-height 50px
              /*padding-left 65px!important*/
              border none
              &:last-child
                border-bottom 1px solid $border-color
.business-router-view
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
