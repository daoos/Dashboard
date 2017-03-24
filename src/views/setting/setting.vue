<template lang="html">
  <div class="bi-setting">
    <v-header :showSearch="false" :menuArr="menuArr"></v-header>
    <div class="content">
      <div class="title">
        个人信息
      </div>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header'

export default {
  components: {
    'v-header': header
  },
  data() {
    return {
      menuArr: [{
        name: '个人信息'
      }, {
        name: '权限管理'
      }, {
        name: '图表显示'
      }]
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '../../style'

w(l,r)
  position absolute
  content ''
  top 4px
  height 16px
  width 4px
  left l
  right r
  background $subject-color

.bi-setting
  .content
    margin 70px 77px
    .title
      position relative
      display inline-block
      font-size 21px
      &::before
        w(-10px,auto)
      &::after
        w(auto,-10px)
</style>
