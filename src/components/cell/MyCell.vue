<template>
    <div class="myCell clear" >
      <!--头部-->
      <div class="cell-header">
        {{userMode.title}}
      </div>
      <div class="cell-text" @click="clickContent">{{userMode.text}}</div>
      <div class="cell-footer">
        <div class="imgName">
          <img src="../../assets/cell/header.gif" alt="">
          <span id="name" class="name">李辉</span>
          <span id="like" @click="likeContent"><i style="background-image: url('../../../static/icon/like.png');height: 15px;width: 15px;margin-top: 17px;"></i>&nbsp;<span>{{userMode.like}}</span></span>
          <span id="watch" @click="watchContent"><i style="background-image: url('../../../static/icon/watched.png');"></i>&nbsp;<span>{{userMode.watch}}</span></span>
        </div>
        <div class="spanList">
          <span id="date">{{userMode.createdTime}}</span>
          <span id="pc">电脑端</span>
          <span v-if="$store.state.admin" @click="deleteArticle(userMode.articleId)">删除</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'my-cell',
  data () {
    return {
      admin: false
    }
  },
  props: {
    userMode: Object
  },
  created () {
  },
  methods: {
    clickContent: function () {
      this.$emit('selectCell')
    },
    likeContent: function () {
      alert('')
    },
    watchContent: function () {

    },
    deleteArticle: function (articleId) {
      var _this = this
      this.utils.post('article/delete', {
        articleId: articleId
      }, function (response) {
        if (response.state === 'succes') {
          _this.$emit('deleteArticle')
        }
      })
    }
  }
}
</script>

<style >
  @import "myCell.css";

</style>
