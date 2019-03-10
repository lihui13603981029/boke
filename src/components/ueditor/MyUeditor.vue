<template>
<div>
  <script id="editor" type="text/plain"></script>
</div>
</template>

<script>
    export default {
        name: "my-ueditor",
      data(){
          return {
            ueditor:{}
          }
      },
      created(){

      },
      mounted(){
        var _this = this;
        this.editor =UE.getEditor('editor',this.config)//初始化UE

      },
      props:{

        config:{
          type: Object
        }
      },
      methods:{
        getUEContent() { // 获取内容方法
          this.ueditor.articleContent = this.editor.getContent();
          this.ueditor.articleText =  this.editor.getContentTxt();

          return this.ueditor;
        }

      },
      destroyed() {
        this.editor.destroy();
      }
    }

</script>

<style>
  @import "myUeditor.css";

</style>
