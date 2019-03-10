<template>
  <div class="home">
    <my-slider></my-slider>
    <div class="content clear">
      <div class="leftContent">

          <transition-group name="list">
            <my-cell v-for="(item,index) in cellModes" :userMode="item" class="content-cell" :key="index"  @selectCell="gotoDetail(item)" @deleteArticle="deleteArticle(item.articleId)"></my-cell>
          </transition-group>

          <ul class="operatorBar clear">
            <li @click="forwordPage">上一页</li>
            <li>第{{currentPageCount}}页</li>
            <li @click="nextPage">下一页</li>
          </ul>
      </div>
      <div class="rightContent">

        <transition name="slide-fade">
          <user-show v-if="$store.state.loginState"></user-show>
        </transition >
        <transition name="slide-fade">
          <my-login v-if="!$store.state.loginState"></my-login>
        </transition>
        <transition name="list">
          <my-rank></my-rank>
        </transition>
      </div>
    </div>
  </div>

</template>

<script>

import MySlider from '../slider/MySlider'
import MyCell from '../cell/MyCell'
import RankCell from '../rankList/rankCell'
import MyLogin from '../loginBox/my-login'
import MyRank from '../myRank/MyRank'
import UserShow from '../userShow/UserShow'
export default {
  components: {
    UserShow,
    MyRank,
    MyLogin,
    RankCell,
    MyCell,
    MySlider
  },
  name: 'MyHome',
  data () {
    return {
      cellModes: [],
      isLogin: false,
      currentPageCount: 1,
      modelAllCount: 0,
      pageNum: 5
    }
  },
  created () {
    console.log('myhome created')
    var user = this.utils.getCookie('user')
    if (user != null) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
    this.questData(1, 0, this.pageNum)
  },
  destroyed () {
    console.log('myhome destroyed')
  },
  methods: {
    //  进入文章展示页面
    gotoDetail (item) {
      this.$router.push({name: 'articleShow', query: {articleId: item.articleId}})
    },
    forwordPage () {
      if (this.currentPageCount === 1) {
        alert('已经是第一页')
        return
      }
      var start = (this.currentPageCount - 2) * this.pageNum + 1
      this.questData(1, start, this.pageNum)
      this.currentPageCount--
    },
    nextPage () {
      var start = this.currentPageCount * this.pageNum
      if ((start + 1) > this.modelAllCount) {
        return
      }
      this.questData(1, start, this.pageNum)
      this.currentPageCount++
    },
    questData (userId, start, page) {
      var _this = this
      _this.cellModes = []
      this.utils.post('article/select', {
        userId: userId,
        startNum: start,
        pageNum: page
      }, function (response) {
        console.log(response)
        var dataArr = response.msg
        for (var i = 0; i < dataArr.length; i++) {
          var mode = {
            articleId: dataArr[i].articleId,
            title: dataArr[i].articleTitle,
            text: dataArr[i].articleText,
            like: dataArr[i].articleLikeCount,
            watch: dataArr[i].articleViews,
            createdTime: new Date(parseInt(dataArr[i].articleDate)).toLocaleString().replace(/:\d{1,2}$/, ' ')
          }
          _this.cellModes.push(mode)
          _this.modelAllCount = response.length
        }
      })
    },
    //  删除当前的博文
    deleteArticle (articleId) {
      console.log(articleId)
      this.cellModes = this.cellModes.filter(function (currentValue, index) {
        return currentValue.articleId !== articleId
      })
      console.log(this.cellModes)
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next()
  }
}
</script>

<style>
  @import "myHome.css";
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(50px);
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
