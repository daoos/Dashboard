<template lang="html">
  <div class="bi-login">
    <div class="header">
      <span class="logo"><i></i></span>
    </div>
    <div class="content">
      <div class="login-wrapper">
        <div class="title-wrapper">
          <v-title :title="title"></v-title>
        </div>
        <div class="form-wrapper">
          <el-form :label-position="'right'" label-width="80px" v-show="loginflag">
            <el-form-item label="用户名">
              <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formLabelAlign.psw"></el-input>
            </el-form-item>
            <el-form-item class="rememberMe">
              <el-checkbox label="记住我的信息" name="type"></el-checkbox>
            </el-form-item>
            <el-form-item class="buttons">
              <el-button type="primary" @click="login" :size="'large'">登录</el-button>
              <el-button @click="forgetPsw" type="text">忘记密码</el-button>
            </el-form-item>
          </el-form>
          <forgetPsw v-if="viewflag.forgetPsw"></forgetPsw>
        </div>
        <success v-if="viewflag.success"></success>
      </div>
    </div>
  </div>
</template>

<script>
import title from 'components/title'
import forgetPsw from './forgetPsw'
import success from './success'

export default {
  components: {
    'v-title': title,
    forgetPsw,
    success
  },
  computed: {
    loginflag() {
      for (let x in this.viewflag) {
        if (this.viewflag[x]) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    login() {
      this.$router.push({
        path: 'business/main'
      })
    },
    showLogin() {
      this.title = '登录'
      for (let x in this.viewflag) {
        this.viewflag[x] = false
      }
    },
    forgetPsw() {
      this.viewflag.forgetPsw = true
      this.title = '忘记密码'
    }
  },
  data() {
    return {
      title: '登录',
      viewflag: {
        forgetPsw: false,
        success: false
      },
      formLabelAlign: {
        username: '',
        psw: ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../style'
.bi-login
  .header
    height 70px
    background $subject-color
  .content
    padding-top 20%
    text-align center
    .login-wrapper
      position relative
      display inline-block
      width 500px
      background white
      text-align left
      border-radius 8px
      border 1px solid #DFDFDF
      .title-wrapper
        text-align left
        margin 0 30px
        padding 25px 0 25px 20px
        border-bottom 1px solid $border
      .form-wrapper
        padding 30px 30px 20px 40px
        .el-form
          padding-right 50px
      .rememberMe
        margin -15px 0 10px 0
</style>
