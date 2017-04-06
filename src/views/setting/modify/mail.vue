<template lang="html">
  <div class="mail">
    <el-form :label-position="'right'" label-width="100px">
      <el-form-item label="登录密码">
        <el-input v-model="formLabelAlign.psw"></el-input>
      </el-form-item>
      <el-form-item label="新绑定邮箱">
        <el-input v-model="formLabelAlign.mail"></el-input>
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
        mail: '',
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
