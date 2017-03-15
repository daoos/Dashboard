<template lang="html">
  <div class="bi-header">
    <el-menu theme="dark" default-active="1" class="header-bar" mode="horizontal">
      <el-menu-item index="1">概览</el-menu-item>
      <el-menu-item index="2">分析</el-menu-item>
      <div class="search">
        <span class="text">搜索</span>
        <div class="input-wrapper">
          <el-select v-model="selectValue" clearable placeholder="请选择" @change="selectChange(selectValue)">
            <el-option
              v-for="item in options"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <input type="text" v-model="searchInput" v-on:input="onInput(searchInput)">
          <i class="el-icon-search"></i>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    tableData: Array,
    options: Array
  },
  data() {
    return {
      searchInput: '',
      selectValue: ''
    }
  },
  methods: {
    selectChange(val) {
      this.$root.$emit('selectChange', val)
    },
    onInput(val) {
      window.x = this.$parent.$refs.table
      Vue.set(this.$parent.$refs.table, 'searchKey', this.searchInput)
    }
  }
}

</script>

<style lang="stylus">
@import '../../style/'

.bi-header
  .header-bar
    padding-left 38px
    background $subject-color
    .el-menu-item
      height 70px
      padding 0
      margin 0 20px
      line-height 70px
      font-size 21px
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
      font-size 21px
      line-height 70px
      color white
      .text
        font-size 18px
      .input-wrapper
        display inline
        height 30px
        width 400px
        padding 5px
        margin-left 10px
        background rgba(255,255,255,0.6)
        border-radius 8px
        .el-select
          cursor pointer
          width 80px
          font-size 16px
          .el-input__icon
            color #868686
            margin-top -2px
            z-index 999
          input::-webkit-input-placeholder
            font-size 15px
            color $gray-color
        input
          position relative
          top -3px
          font-size 16px
          width 180px
          height 18px
          background none
          border none
          appearance none
          outline 0
        .el-icon-search
          font-size 18px
          width 18px
          height 18px
          margin-right 6px
          color $subject-color
</style>
