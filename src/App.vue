<template>
  <div id="app" class="app" ref="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{

    }
  },
  created(){
    //刷新的时候，初始化store
    console.log("app init");
    this.$store.commit("setLoginUser");

  },
  mounted(){

  },
  destroyed(){

  }
}
</script>

<style>
  @import "../static/css/common.css";

  //全局动画
  .slide-left-enter-active {
    transition: all .5s ease;
  }
  .slide-left-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-left-enter{
    transform: translateX(-30px);
    opacity: 0;
  }
  .slide-left-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-30px);
    opacity: 0;
  }

  .fade-enter-active,.fade-leave-active {
    transition: all .2s ease;
  }
</style>
