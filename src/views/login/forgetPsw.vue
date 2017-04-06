<template lang="html">
  <div class="forgetPsw">
    <span class="info">输入你的邮件地址，新密码链接会通过邮件发送给你，你可以通过链接重置密码</span>
    <el-form :label-position="'right'" label-width="80px">
      <el-form-item label="邮件">
        <el-input v-model="mail"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="submitForm" :size="'large'">发送给我</el-button>
        <el-button @click="goBack" type="text">取消</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      mail: ''
    }
  },
  methods: {
    goBack() {
      this.$parent.showLogin()
    }
  }
}
</script>

<style lang="stylus" scoped>
.info
  display inline-block
  font-size 14px
  margin-bottom 20px
  line-height 20px
  margin-top -10px
  color #090909
  opacity 0.8
.el-form
  padding-right 60px
</style>
