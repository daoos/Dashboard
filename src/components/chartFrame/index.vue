<template lang="html">
  <div class="chartFrame">
    <div class="tabs">
      <div class="left">
        <span class="item active">信使数</span>
        <span class="item">医生数</span>
      </div>
      <div class="right">
        <span class="item active">周</span>
        <span class="item">月</span>
        <span class="item">季</span>
      </div>
    </div>
    <!-- <div class="mark-list">
      <div class="mark" v-for="color in markColor">
        <span class="line"></span>
        <span class="title">上周注册信使数</span>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      markColor: this.$store.state.colorArr
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style'

.chartFrame
  padding 25px 34px 10px
  .tabs
    display flex
    font-size 0
    .item
      display inline-block
      cursor pointer
      user-select none
      font-size 12px
      min-width 25px
      text-align center
      padding 4px 20px
      border 1px solid $subject-color
      +.item
        border-left none
      &.active
        background $subject-color
        color white
    .left, .right
      >.item:first-child
        border-bottom-left-radius 5px
        border-top-left-radius 5px
      >.item:last-child
        border-bottom-right-radius 5px
        border-top-right-radius 5px
    .right
      flex 1
      text-align right
  /*.mark-list
    font-size 11px
    padding 12px 0
    text-align right
    .mark
      display inline-block
      font-family STHeitiSC-Light
      padding-left 10px
      .line
        display inline-block
        height 1px
        width 20px
        background red
        vertical-align middle*/
</style>
