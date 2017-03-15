<template lang="html">
  <div class="bi-checkbox-group">
    <span class="bi-checkbox" v-for="item in checkArr" :class="{'checked':item.checked}" @click="checkItem(item,true)">
      {{item.name}}<i class="el-icon-circle-cross" v-show="item.checked" @click.stop="checkItem(item)"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    items: Array
  },
  data() {
    return {
      checkArr: this.items
    }
  },
  methods: {
    checkItem(item, flag) {
      let arr = this.checkArr.slice()
      arr.forEach(i => {
        i.checked = false
        if (i.name === item.name) {
          i.checked = flag || false
        }
      });
      this.checkArr = arr
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '../../../style/variable'

.bi-checkbox-group
  display inline-block
  .bi-checkbox
    display inline-block
    padding 6px 10px
    border-radius 15px
    font-size 16px
    cursor pointer
    margin-left 15px
    line-height 20px
    &.checked
      background $subject-color
      color white
      .el-icon-circle-cross
        position relative
        left 4px
        z-index 9
</style>
