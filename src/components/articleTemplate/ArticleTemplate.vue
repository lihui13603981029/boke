<template>
    <div class="article-content">
      <div class="info">
        <p>标题</p>
        <input type="text" placeholder="请输入标题" v-model="editorEntity.articleTitle"/>
      </div>

      <div class="ue-content">
        <p>内容（百度Euditor编辑器）</p>
        <my-ueditor :config=config ref="ue"></my-ueditor>
      </div>
      <div class="category ">
        <p class="categoryTitle">文章类别</p>
        <ul class="clear">
          <li v-for="(mode, index) in sorts" :key="index"><label><input v-bind:checked="mode.checked" @click="selected(mode)" type="checkbox">&nbsp;&nbsp;{{mode.sortName}}</label>
          </li>
        </ul>
        <div class="userOperator">
          <button @click="upload()">提交</button><button @click="cancle()">取消</button>
        </div>
      </div>
    </div>
</template>

<script>
import MyUeditor from '../ueditor/MyUeditor'
export default {
  components: {MyUeditor},
  name: 'article-template',
  data () {
    return {
      defaultMsg: '这里是UE测试',
      config: {
        initialFrameWidth: 1000,
        initialFrameHeight: 550
      },
      editorEntity: {
        userId: 1,
        articleText: '',
        articleTitle: '',
        articleContent: '',
        articleViews: 0,
        commentCount: 0,
        likeCount: 0
      },
      sorts: []
    }
  },
  created () {
    var _this = this
    this.utils.get('/menus/allSorts', function (response) {
      var data = response.msg
      for (var i = 0; i < data.length; i++) {
        var mode = {
          sortId: data[i].sortId,
          sortName: data[i].sortName,
          checked: false
        }
        _this.sorts.push(mode)
      }
    })
  },
  methods: {
    selected (mode) {
      for (var i = 0; i < this.sorts.length; i++) {
        this.sorts[i].checked = false
      }
      mode.checked = true
      this.currentModel = mode
    },
    upload () {
      if (this.currentModel == null && this.currentModel === undefined) {
        alert('请选择类型')
        return
      }
      if (this.editorEntity.articleTitle.length === '') {
        alert('标题不能为空')
        return
      }
      var mode = this.$refs.ue.getUEContent()
      this.editorEntity.articleText = mode.articleText
      this.editorEntity.articleContent = mode.articleContent
      this.editorEntity.sortId = this.currentModel.sortId
      this.utils.post('article/add', this.editorEntity, function (response) {
        location.reload()
      })
    },
    cancle () {
    }
  }
}
</script>

<style >
  @import "articleTemplate.css";

</style>
