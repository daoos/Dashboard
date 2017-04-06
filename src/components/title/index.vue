<template lang="html">
  <div class="bi-title">{{title}}</div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style'
w(l,r)
  position absolute
  content ''
  top 4px
  height 14px
  width 4px
  left l
  right r
  background $subject-color

.bi-title
  position relative
  display inline-block
  font-size 21px
  &::before
    w(-16px,auto)
  &::after
    w(auto,-16px)
</style>
