<template lang="html">
  <div class="bi-checkbox-group">
    <span
    class="bi-checkbox"
    v-for="item in checkArr"
    :class="{'checked':item.checked,'disabled':item.disabled}"
    @click="checkItem(item,true)">
      {{item.name}}<i class="el-icon-circle-cross" v-show="item.checked" @click.stop="checkItem(item,false)"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    checkRouter: Array
  },
  data() {
    return {
      lastCode: '',
      flag: true,
      item: {},
      store: this.$store.state
    }
  },
  computed: {
    checkArr() {
      let arr = this.items.slice()
        // let item = this.store.filterItems.slice().pop()
      arr.forEach(i => {
        i.checked = false
        i.disabled = false
        if (i.code && i.code === this.item.code) {
          i.checked = this.flag && true
        }
        let checkRouter = this.checkRouter || []
        if (checkRouter.length) {
          checkRouter.forEach(r => {
            if (r.code === i.code) {
              i.checked = false
              i.disabled = true
            }
          })
        }
      });
      return arr
    }
  },
  methods: {
    checkItem(item, flag) {
      this.flag = flag
      this.item = item
      if (item.disabled || this.lastCode === item.code && flag) {
        return
      }
      // 存储到vuex
      let filters = this.store.filterItems
      if (!filters.length) {
        filters.push(item)
      } else {
        filters[filters.length - 1] = item
      }
      this.lastCode = item.code
      if (!flag) {
        item = false
        this.lastCode = ''
      }
      this.$emit('check-change', item, this.checkArr)
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
    &.disabled
      color $gray-color
    &.checked
      background $subject-color
      color white
      .el-icon-circle-cross
        position relative
        left 4px
        z-index 9
</style>
