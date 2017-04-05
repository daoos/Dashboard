<template lang="html">
  <div class="psw">
    <el-form :label-position="'right'" label-width="100px">
      <el-form-item label="登录密码">
        <el-input v-model="formLabelAlign.psw"></el-input>
      </el-form-item>
      <el-form-item label="新登录密码">
        <el-input v-model="formLabelAlign.newPsw" placeholder="6-12位字符，支持数字、大小写字母、标点符号，不支持空格"></el-input>
      </el-form-item>
      <el-form-item label="新密码确认">
        <el-input v-model="formLabelAlign.confirmPsw"></el-input>
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
        newPsw: '',
        psw: '',
        confirmPsw: ''
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
.psw
  width 450px
  .el-input__inner::-webkit-input-placeholder
    font-size 10px
  .el-input__inner::-moz-placeholder
    font-size 10px
</style>
