<template>
    <div id="registe" class="my-regist">
      <form action="">
        <div class="title">欢迎注册</div>
        <ul>
          <li><label>邮箱</label><input type="email" placeholder="请输入邮箱" v-model="user.userEmail"></li>
          <li><label>电话</label><input type="number" placeholder="请输入电话号码" v-model="user.phoneNumber"></li>
          <li><label>电话</label><input  class="checkNum" type="number" placeholder="请输入验证码" v-model="user.phoneNumber"><button>获取验证码</button></li>
          <li><label>密码</label><input type="text" placeholder="请输入密码" v-model="user.passWord"></li>
          <li><label>确认密码</label><input type="text" placeholder="请确认密码" v-model="conformPassWord"></li>
          <li class="registBtn">
            <div class="back" @click="backLogin">返回登录</div>
            <div class="regist" @click="registe">注册</div>
          </li>
        </ul>
      </form>

    </div>
</template>

<script>
export default {
  name: 'my-regist',
  data () {
    return {
      isShow: false,
      conformPassWord: '',
      user: {
        userName: '',
        userEmail: '',
        phoneNumber: '',
        passWord: ''
      }

    }
  },
  created () {

  },
  methods: {
    // 返回登录
    backLogin () {
    },
    // 注册
    registe () {
      this.$router.push({name: 'home'})
      if (this.user.userName === '') {
        alert('用户名不能为空')
        return
      }
      if (this.user.passWord === '') {
        alert('密码不能为空')
        return
      }
      if (this.user.passWord !== this.conformPassWord) {
        alert('密码不一致')
        return
      }
      if (this.user.userEmail === '') {

        alert('邮箱不能为空')
      }

      var that = this;
      this.utils.post('user/regist', {
        userName: that.user.userName,
        userPassword: that.user.passWord,
        userEmail: that.user.userEmail
      }, function (response) {
        console.log(response)
        that.$emit('hiddenView', false)
      })
    }
  }
}
</script>

<style >
  @import "myRegist.css";
</style>
