<template>
    <div class="articleShow clear">
      <div class="articleLeft">
        <div class="showTitle">
          <img src="../../assets/cell/header.gif" alt="">
          <span>张三</span>
          <span>{{articleModel.date}}</span>
        </div>
        <p class="title">{{articleModel.title}}</p>
        <div class="articleContent" v-html="articleModel.content"></div>
      </div>
      <div class="articleRight">
        <transition name="slide-fade">
          <my-login v-if="!isLogin"></my-login>
        </transition>
        <transition name="slide-fade">
          <user-show v-if="isLogin"></user-show>
        </transition>
        <my-rank></my-rank>
      </div>
    </div>
</template>

<script>
import MyLogin from '../loginBox/my-login'
import RankCell from '../rankList/rankCell'
import MyRank from '../myRank/MyRank'
import UserShow from '../userShow/UserShow'

export default {
  components: {
    UserShow,
    MyRank,
    RankCell,
    MyLogin},
  name: 'article-show',
  data () {
    return {
      articleModel: {
        title: '',
        content: '',
        date: ''
      },
      articleId: '',
      isLogin: false
    }
  },
  created () {
  },
  mounted () {
    var user = this.utils.getCookie('user')
    this.isLogin = user != null
    console.log(user)
    var _this = this
    this.utils.post('/article/selectById', {
      articleId: this.$route.query.articleId
    }, function (response) {
      var data = response.msg
      _this.articleModel.title = data.articleTitle
      _this.articleModel.content = data.articleContent
      _this.articleModel.date = _this.utils.dateTemplateToDate(data.articleDate)
    })
  },
  methods: {
  }

}
</script>

<style >

  @import "articleShow.css";
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
