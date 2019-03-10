<template>
  <ul class="login ">
    <li><i style="background-image: url('../../../static/icon/user.png')"></i><input type="text" v-model="user.name" placeholder="手机号/邮箱/用户名"></li>
    <li><i style="background-image: url('../../../static/icon/lock.png')"></i><input type="password" v-model="user.passWord" placeholder="输入密码"></li>
    <div><button class="loginBtn" @click="login">登录</button><i class="logo"></i><button class="registerBtn" @click="register">注册</button></div>
  </ul>
</template>

<script>
export default {
  name: 'my-login',
  data () {
    return {
      user: {
        name: '',
        password: ''
      }

    }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  methods: {
    login: function () {
      var userName = this.user.name.replace(/\s+/g, '')
      var passWord = this.user.passWord.replace(/\s+/g, '')
      if (userName === '') {
        alert('清输入用户名')
        return
      }
      if (passWord === '') {
        alert('请输入密码')
        return
      }
      var _this = this
      this.utils.post('/user/login', {
        userName: _this.user.name,
        userPassword: _this.user.passWord
      }, function (response) {
        _this.$store.commit('setLoginUser', response.msg)
      })
    },
    register: function () {
      alert('注册')
    }
  }
}
</script>

<style scoped>
  @import "myLogin.css";

</style>
