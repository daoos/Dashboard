<template lang="html">
  <div class="user">
    <el-form :label-position="'right'" label-width="80px">
      <el-form-item label="登录密码">
        <el-input v-model="formLabelAlign.psw"></el-input>
      </el-form-item>
      <el-form-item label="新用户名">
        <el-input v-model="formLabelAlign.username" placeholder="中英文均可，最长14个英文或7个汉字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">确定</el-button>
        <el-button @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: {
        username: '',
        psw: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log('s');
    },
    goBack() {
      this.$parent.resetModify()
    }
  }
}
</script>

<style lang="stylus">
</style>
