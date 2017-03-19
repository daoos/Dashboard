<template lang="html">
  <div class="bi-header">
    <el-menu theme="dark" default-active="1" class="header-bar" mode="horizontal">
      <div v-if="!showRouter">
        <el-menu-item index="1">概览</el-menu-item>
        <el-menu-item index="2">分析</el-menu-item>
      </div>
      <div class="breadcrumb" v-if="showRouter">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="(item,index) in routerArr">
            <span @click.stop.prevent="breadClick(index)">{{item.name}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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
export default {
  props: {
    tableData: Array,
    options: Array,
    routerArr: Array
  },
  data() {
    return {
      searchInput: '',
      selectValue: '',
      clickItem: ''
    }
  },
  computed: {
    showRouter() {
      return this.routerArr.length > 1
    }
  },
  methods: {
    breadClick(index) {
      // let index = this.routerArr.length
      // store.routœerArr.forEach((d, i) => {
      //   if (d.name === item.name) {
      //     index = i + 1
      //     if (index === 1) {
      //       this.$store.state.filterItem = ''
      //     }
      //     return
      //   }
      // })
      // this.routerArr = this.routerArr.slice(0, index)
      let i = this.routerArr.length - index - 1
      this.$emit('breadClick', i)
    },
    selectChange(val) {
      this.$root.$emit('selectChange', val)
    },
    onInput(val) {
      this.$set(this.$parent.$refs.table, 'searchKey', this.searchInput)
    }
  }
}

</script>

<style lang="stylus">
@import '../../style'
.bi-header
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
      float right
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
