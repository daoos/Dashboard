<template lang="html">
  <div class="bi-success">
    <div class="props">
      <div class="icon">
        <i class="el-icon-check"></i>
      </div>
      <div class="text">成&nbsp;&nbsp;功</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '../../style'

.bi-success
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  background white
  text-align center
  border-radius 8px
  z-index 9
  .props
    display inline-block
    padding-top 100px
    .icon
      width 80px
      height 80px
      background $subject-color
      border-radius 50%
      i
        color white
        font-size 34px
        line-height 80px
    .text
      font-size 18px
      padding-top 20px
</style>
