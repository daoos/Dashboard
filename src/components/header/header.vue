<template lang="html">
  <div class="bi-header">
    <el-menu theme="dark" :default-active="'0'" class="header-bar" mode="horizontal">
      <div v-show="!showRouter">
        <el-menu-item v-for="(menu,i) in menuArr" :index="i+''" :key="i">{{menu.name}}</el-menu-item>
      </div>
      <div class="breadcrumb" v-if="showRouter">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="(item,index) in routerArr" :key="item.code">
            <span @click.stop.prevent="breadClick(item,index)">{{item.name}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search" v-if="showSearch">
        <span class="text">搜索</span>
        <div class="input-wrapper">
          <el-select v-model="selectValue" clearable placeholder="请选择" @change="selectChange(selectValue)">
            <el-option
              v-for="item in options"
              :label="item.name"
              :value="item.code"
              :key="item.code">
            </el-option>
          </el-select>
          <input type="text" v-model="searchInput" v-on:input="onInput(searchInput)">
          <i class="el-icon-search"></i>
        </div>
      </div>
      <span class="logout" @click="logout()">注销</span>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default () {
        return []
      }
    },
    routerArr: {
      type: Array,
      default () {
        return []
      }
    },
    flag: Boolean, // 判断对分组表格还是详情表格进行数据筛选
    showSearch: {
      type: Boolean,
      default () {
        return true
      }
    },
    menuArr: {
      type: Array,
      default () {
        return [{
          name: '概览'
        }, {
          name: '分析'
        }]
      }
    }
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
    logout() {
      this.$store.state.loginflag = false
      this.$router.push({
        path: '/login'
      })
    },
    breadClick(item, index) {
      let len = this.routerArr.length
      if (len - 1 === index) {
        return
      }
      let i = this.routerArr.length - index - 1
      this.$emit('breadClick', item, i)
    },
    selectChange(val) {
      this.$root.$emit('selectChange', val)
    },
    onInput(val) {
      let table = 'table'
      if (this.flag) {
        table = 'groupTable'
      }
      this.$set(this.$parent.$refs[table], 'searchKey', this.searchInput)
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
      font-size 18px
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
    .logout
      position absolute
      right 20px
      cursor pointer
      line-height 70px
      color white
      &:active
        opacity 0.8
</style>
