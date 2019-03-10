<template>
  <div class="myApp">
    <div class="tel-content clear">
      <div class="left-content">
        <div class="showImg">
          <img src="../../assets/slider/bg_1.png" alt="">
        </div>
        <div class="content-header">
          <ul>
            <li v-for="(menu,index) in menus" :key="index" :class="{active : menu.active}" @click="selectedModel(index,menu.sortId)">{{menu.sortName}}</li>
          </ul>
        </div>
        <my-cell class="my-cell" v-for="(model ,index) in models" :userMode="model" @selectCell="gotoDetail(model)" :key="index"></my-cell>
      </div>
      <div class="right-content">
        <user-show v-if="isLogin"></user-show>
        <my-login v-else></my-login>
        <div class="currentLogin">
          <p>今日登陆用户</p>
          <ul class="userList">
            <li></li>
          </ul>

        </div>
        <div class="currentLogin">
          <p>新用户注册</p>
          <ul class="userList">
            <li></li>
          </ul>
        </div>
        <div class="currentPay">
          <p>赞助本站</p>
          <div class="pay">
            <span>支付宝</span>
            <span>微信</span>
            <span>QQ</span>
          </div>
          <img src="../../assets/clothes/01.png" alt="二维码">
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import MyCell from '../cell/MyCell'
import MyLogin from '../loginBox/my-login'
import UserShow from '../userShow/UserShow'
export default {
  components: {
    UserShow,
    MyLogin,
    MyCell},
  name: 'MyApp',
  data () {
    return {
      models: [],
      menus: [],
      isLogin: false
    }
  },
  props: {
    telModel: Object
  },

  created () {
    var user = this.utils.getCookie('user')
    if (user != null) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
    var _this = this
    this.$root.$on('changeLogin', function (data) {
      _this.isLogin = data
    })
    var menuId = this.$route.query.id
    this.utils.post('/menus/sortByMenuId', {
      menuId: menuId
    }, function (response) {
      var data = response.msg
      for (var i = 0; i < data.length; i++) {
        var model = {
          sortName: data[i].sortName,
          sortId: data[i].sortId,
          active: false
        }
        _this.menus.push(model)
      }
      _this.menus[0].active = true
      _this.requestDataBySortId(_this, _this.menus[0].sortId)
    })
  },
  methods: {
    //  选择对应的模块
    selectedModel (index, sortId) {
      for (var i = 0; i < this.menus.length; i++) {
        this.menus[i].active = false
      }
      this.menus[index].active = true
      this.requestDataBySortId(this, sortId)
    },
    //  进入详细页面
    gotoDetail (item) {
      this.$router.push({name: 'articleShow', query: {articleId: item.articleId}})
    },
    requestDataBySortId (_this, sortId) {
      _this.utils.post('article/select', {
        userId: 1,
        sortId: sortId
      }, function (response) {
        var dataArr = response.msg
        _this.models = []
        for (var i = 0; i < dataArr.length; i++) {
          var model = {
            articleId: dataArr[i].articleId,
            title: dataArr[i].articleTitle,
            text: dataArr[i].articleText,
            like: dataArr[i].articleLikeCount,
            watch: dataArr[i].articleViews
          }
          _this.models.push(model)
        }
      })
    }
  }
}
</script>

<style >
  @import "myApp.css";
</style>
