<template>
  <div class="head clear">
    <a @click="gotoManager()"><img src="../../assets/icon/logo.png" alt=""></a>
    <ul >
      <transition-group name="fade">
        <li :class="{active:model.active}" v-for="(model ,index) in models"  v-bind:key="index" @click="selectedMode(index)">{{model.title}}</li>
      </transition-group>
    </ul>
    <div class="btn">
      <button style="background-color: red;" @click="register()">{{$t(type)}}</button>
      <button style="background-color: cornflowerblue;" @click="login()" v-if="!$store.state.loginState">{{$t("login")}}</button>
      <button style="background-color: cornflowerblue;" @click="loginOut()" v-else>{{$t("loginOut")}}</button>
      <button class="interBtn" @click="changeLange()">中/EN</button>
    </div>
  </div>
</template>
<style>
  @import url('./myHeader.css');
  .fade-enter-active, .fade-leave-active {
    transition: opacity 4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>

<script>
export default {
  name: 'my-header',
  data () {
    return {
      models: [],
      type: 'regist'
    }
  },
  created () {
    if (this.utils.getCookie('user')) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
    var _this = this
    this.$root.$on('changeLogin', function (data) {
      _this.isLogin = data
    })
    this.utils.get('menus/meunsSelect', function (response) {
      console.log(response)
      var data = response.msg
      for (var i = 0; i < data.length; i++) {
        var model = {
          id: data[i].menuId,
          title: data[i].menuName,
          active: false
        }
        _this.models.push(model)
      }
      var id = _this.$route.query.id
      if (id) {
        _this.models[id - 1].active = true
      } else {
        _this.models[0].active = true
      }
    })
  },
  mounted () {
  },
  methods: {
    //  点击菜单
    selectedMode (index) {
      if (this.models[index].id > 3) {
        alert('功能暂未开发')
        return
      }
      for (var i = 0; i < this.models.length; i++) {
        this.models[i].active = false
      }
      this.models[index].active = true
      this.$emit('selectModelChange', this.models[index].id)
    },
    //  登录
    login () {
    },
    //  注册
    register () {
      this.$router.push({name: 'register'})
    },
    //  退出登录
    loginOut () {
      this.$store.commit('setLoginUser', 'out')
    },
    changeLange () {
      if (this.$i18n.locale === 'zh-CN') {
        this.$i18n.locale = 'en-US'
      } else {
        this.$i18n.locale = 'zh-CN'
      }
    },
    //  进入管理页面
    gotoManager () {
      console.log(this.$store.state.loginUser)
      var user = this.$store.state.loginUser
      if (user.userName === 'admin') {
        this.$router.push({name: 'manager'})
      }
    }
  }
}
</script>
