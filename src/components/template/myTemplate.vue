<template>
  <div class="my-template">
    <div class="tel-content clear">
      <div class="left-content">
        <div class="showImg">
          <img src="../../../static/slider/bg_1.png" alt="">
        </div>
        <div class="content-header">
          <ul>
            <li v-for="(menu,index) in menus" :key="index" :class="{active : menu.active}" @click="selectedModel(index,menu.sortId)">{{menu.sortName}}</li>
          </ul>
        </div>
        <transition-group name="list">
          <my-cell class="my-cell" v-for="(model ,index) in models" :userMode="model" @selectCell="gotoDetail(model)" @deleteArticle="deleteArticle(model.articleId)" :key="index"></my-cell>
        </transition-group>
        <ul class="operatorBar clear">
          <li @click="forwordPage">上一页</li>
          <li>第{{1}}页</li>
          <li @click="nextPage">下一页</li>
        </ul>
      </div>
      <div class="right-content">
        <transition name="slide-fade">
          <user-show v-if="$store.state.loginState"></user-show>
          <my-login v-else></my-login>
        </transition>

        <div class="currentLogin clear">
          <p>今日登陆用户</p>
            <ul class="userList">
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
              <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
            </ul>

        </div>
        <div class="currentLogin clear">
          <p>新用户注册</p>
          <ul class="userList">
            <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
            <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
            <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
            <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
            <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
            <li><img src="../../assets/cell/header.gif" alt=""><span>张三</span></li>
          </ul>
        </div>
        <div class="currentPay">
          <p>赞助本站</p>
          <div class="pay">
            <span @click="aliPay" :class="{active:showPay[0]}">支付宝</span>
            <span @click="wxPay"  :class="{active:showPay[1]}">微信</span>
            <span @click="qqPay" :class="{active:showPay[2]}">QQ</span>
          </div>
          <img :src="payUrl" alt="二维码" width="240">
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
  name: 'my-template',
  data () {
    return {
      models: [],
      menus: [],
      isLogin: false,
      currentPageCount: 1,
      modelAllCount: 0,
      pageNum: 5,
      sortId: '',
      payUrl: '../../assets/pay/ali.jpeg',
      showPay: [true, false, false]
    }
  },
  watch: {
    //  监听当前等级的路由是否有变化
    '$route' (to, from) {
      this.initData()
    }
  },
  props: {
    telModel: Object
  },

  created () {
    this.initData()
    console.log('template created')
  },
  destroyed () {
    console.log('template destroyed')
  },
  methods: {
    aliPay () {
      this.payUrl = '../assets/pay/ali.jpeg'
      for (var i = 0; i < this.showPay.length; i++) {
        this.showPay[i] = false
      }
      this.showPay[0] = true
    },
    wxPay () {
      this.payUrl = '../../static/pay/wx.jpeg'
      for (var i = 0; i < this.showPay.length; i++) {
        this.showPay[i] = false
      }
      this.showPay[1] = true
    },
    qqPay () {
      this.payUrl = '../../static/pay/qq.jpeg'
      for (var i = 0; i < this.showPay.length; i++) {
        this.showPay[i] = false
      }
      this.showPay[2] = true
    },
    initData () {
      this.models = []
      this.menus = []
      this.isLogin = false
      this.currentPageCount = 1
      this.modelAllCount = 0
      this.pageNum = 5
      this.sortId = ''

      var user = this.utils.getCookie('user')
      if (user != null) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }

      var _this = this
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
        _this.sortId = _this.menus[0].sortId
        _this.requestDataBySortId(_this.sortId, 0, _this.pageNum)
      })
    },
    forwordPage () {
      if (this.currentPageCount === 1) {
        alert('已经是第一页')
        return
      }
      var start = (this.currentPageCount - 2) * this.pageNum + 1
      this.questData(this.sortId, start, this.pageNum)
      this.currentPageCount --
    },
    nextPage () {
      var start = this.currentPageCount * this.pageNum
      if ((start + 1) > this.modelAllCount) {
        alert('最后一页')
        return
      }
      this.questData(1, start, this.pageNum)
      this.currentPageCount ++
    },
    //  选择对应的模块
    selectedModel (index, sortId) {
      for (var i = 0; i < this.menus.length; i++) {
        this.menus[i].active = false
      }
      this.menus[index].active = true
      this.sortId = sortId
      this.currentPageCount = 1
      this.requestDataBySortId(sortId)
    },
    //  进入详细页面
    gotoDetail (item) {
      this.$router.push({name: 'articleShow', query: {articleId: item.articleId}})
    },
    requestDataBySortId (sortId, startNum, pageNum) {
      var _this = this
      this.utils.post('article/select', {
        userId: 1,
        sortId: sortId,
        startNum: startNum,
        pageNum: pageNum
      }, function (response) {
        var dataArr = response.msg
        _this.models = []
        for (var i = 0; i < dataArr.length; i++) {
          var model = {
            articleId: dataArr[i].articleId,
            title: dataArr[i].articleTitle,
            text: dataArr[i].articleText,
            like: dataArr[i].articleLikeCount,
            watch: dataArr[i].articleViews,
            createdTime: new Date(parseInt(dataArr[i].articleDate)).toLocaleString().replace(/:\d{1,2}$/, ' ')
          }
          _this.models.push(model)
        }
      })
    },
    deleteArticle: function (articleId) {
      var _this = this
      this.utils.post('article/delete', {
        articleId: articleId
      }, function (response) {
        if (response.state === 'success') {
          _this.$emit('deleteArticle')
        }
      })
    }
  }

}
</script>

<style >
  @import "myTemplate.css";
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter{
    opacity: 0;
    transform: translateX(50px);
  }
  .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX( -50px);
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter{

  }
  .slide-fade-leave-to {
    transform: translate(30px);
    opacity: 0;
    width: 0;
    height: 0;
  }
</style>
