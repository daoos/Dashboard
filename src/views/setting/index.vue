<template lang="html">
  <div class="bi-setting">
    <v-header :showSearch="false" :menuArr="menuArr"></v-header>
    <div class="content">
      <div class="title"><v-title :title="title"></v-title></div>
      <div class="form" v-show="showInfo">
        <el-row :gutter="30" class="info">
          <el-col :span="6">用户</el-col>
          <el-col :span="10">Simon</el-col>
          <el-col :span="6">
            <span class="modify" @click.stop.prevent="goModifyView('修改用户名','user')">修改</span>
          </el-col>
        </el-row>
        <el-row :gutter="30" class="info">
          <el-col :span="6">绑定邮箱</el-col>
          <el-col :span="10">zhangr@ethicall.cn</el-col>
          <el-col :span="6">
            <span class="modify" @click.stop.prevent="goModifyView('修改绑定邮箱','mail')">修改</span>
          </el-col>
        </el-row>
        <el-row :gutter="30" class="info">
          <el-col :span="6">绑定手机号</el-col>
          <el-col :span="10">18512345678</el-col>
          <el-col :span="6">
            <span class="modify" @click.stop.prevent="goModifyView('修改绑定手机号','tel')">修改</span>
          </el-col>
        </el-row>
        <el-row :gutter="30" class="info">
          <el-col :span="6">登录密码</el-col>
          <el-col :span="10">*******</el-col>
          <el-col :span="6">
            <span class="modify" @click.stop.prevent="goModifyView('修改登录密码','psw')">修改</span>
          </el-col>
        </el-row>
      </div>
      <div class="modify-wrapper">
        <user v-if="modifyflag.user"></user>
        <tel v-if="modifyflag.tel"></tel>
        <mail v-if="modifyflag.mail"></mail>
        <psw v-if="modifyflag.psw"></psw>
      </div>
    </div>
  </div>
</template>

<script>
import header from 'components/header/header'
import title from 'components/title'
import user from './modify/user'
import tel from './modify/tel'
import mail from './modify/mail'
import psw from './modify/psw'

export default {
  components: {
    'v-header': header,
    'v-title': title,
    user,
    tel,
    mail,
    psw
  },
  computed: {
    showInfo() {
      for (let x in this.modifyflag) {
        if (this.modifyflag[x]) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    goModifyView(name, type) {
      this.title = name
      this.modifyflag[type] = true
    },
    resetModify() {
      for (let x in this.modifyflag) {
        this.modifyflag[x] = false
      }
      this.title = '个人信息'
    }
  },
  data() {
    return {
      title: '个人信息',
      modifyflag: {
        user: false,
        tel: false,
        mail: false,
        psw: false
      },
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

.bi-setting
  .content
    margin 70px 77px
    .title
      margin-bottom 30px
    .form
      width 700px
      .info
        margin-left -20px
        font-size 16px
        padding-top 40px
        .modify
          color $subject-color
          cursor pointer
     .modify-wrapper
       width 400px
       margin 40px 0 0 0
</style>
