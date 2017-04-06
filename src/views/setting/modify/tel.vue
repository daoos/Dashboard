<template lang="html">
  <div class="tel">
    <el-form :label-position="'right'" label-width="100px">
      <el-form-item label="登录密码">
        <el-input v-model="formLabelAlign.psw"></el-input>
      </el-form-item>
      <el-form-item label="新绑定手机号">
        <el-input v-model="formLabelAlign.tel"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <span class="time" v-show="showTime" ref="time">60 S</span>
        <span class="time sendMsg" v-show="!showTime" @click="sendMsg()" ref="msg">发送</span>
        <el-input v-model="formLabelAlign.verifyCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">确定</el-button>
        <el-button @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
let interval
export default {
  data() {
    return {
      formLabelAlign: {
        username: '',
        psw: '',
        verifyCode: ''
      },
      showTime: false
    }
  },
  methods: {
    sendMsg() {
      this.showTime = true
      this.countDown()
        // 发送验证码
    },
    countDown() {
      let count = 60
      interval = setInterval(() => {
        count--
        this.$refs.time.innerHTML = count + ' S'
        if (!count) {
          clearInterval(interval)
          this.showTime = false
          this.$refs.msg.innerHTML = '重新发送'
        }
      }, 1000)
    },
    submitForm() {
      console.log('s')
    },
    goBack() {
      clearInterval(interval)
      this.$parent.resetModify()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../style'
.tel
  .time
    position: absolute
    font-size: 12px
    right: 10px
    line-height: 26px
    height: 26px
    margin-top: 5px
    padding 0 15px
    background: #e8e7e7
    color: #ababab
    border-radius: 6px
    text-align: center
    z-index: 99
  .sendMsg
    cursor pointer
    background $subject-color
    color white
    &:active
      opacity 0.6
</style>
