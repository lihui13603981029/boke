<template>
  <div id="home" class="homeComponent" ref="home">
    <my-header v-on:selectModelChange="chanceModel" @userLogin="clickLogin()" @userRegister="clickRegister()"></my-header>
    <transition name="slide-left">
      <router-view />
    </transition>
    <my-foot></my-foot>
    <div class="writer" @click="writerticle()"></div>
    <div class="potion">
      <div class="clothes" @click="changeClothes"></div>
      <div class="top" v-bind:class="{isActive:topShow,isHidden: !topShow}" @click="toTop"></div>
    </div>

    <transition name="fade">
      <my-clothes v-if="isClothes"  @close="closedClothes"></my-clothes>
    </transition>
  </div>
</template>

<script>
import MyFoot from '../foot/MyFoot'
import MyHeader from '../head/MyHeader'
import MyClothes from '../clothes/myClothes'
import MyRegist from '../regist/MyRegist'
export default {
  components: {
    MyRegist,
    MyClothes,
    MyHeader,
    MyFoot},
  name: 'HomeComponent',
  data () {
    return {
      topShow: false,
      loginShow: false,
      isClothes: false
    }
  },
  created () {
  },
  mounted () {
    this.page = this.$refs.home
    this.page.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    this.page.removeListener('scroll', this.handleScroll)
  },
  methods: {
    closedClothes () {
      this.isClothes = false
    },
    //  屏幕滚动
    handleScroll () {
      this.scrollTop = this.page.scrollTop || this.page.pageYOffset
      this.topShow = this.scrollTop > 200
    },
    //  切换主题
    changeClothes () {
      this.isClothes = true
    },
    //  回到顶部
    toTop () {
      var timer = null
      var _that = this
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn () {
        _that.scrollTop -= 50
        if (_that.scrollTop > 50) {
          _that.$refs.home.scrollTop = _that.scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          _that.$refs.home.scrollTop = 0
          cancelAnimationFrame(timer)
        }
      })
    },
    //  切换模块
    chanceModel (id) {
      var modelId = parseInt(id)
      if (modelId === 1) {
        this.$router.push({name: 'root', params: {id: modelId}})
      } else if (modelId === 2) {
        this.$router.push({name: 'html', query: {id: modelId}})
      } else if (modelId === 3) {
        this.$router.push({name: 'html', query: {id: modelId}})
      }
    },
    //  点击注册
    clickRegister () {
      this.$router.push('register')
    },
    //  点击登录
    clickLogin () {
    },
    writerticle () {
      var user = this.utils.getCookie('user')
      if (user == null) {
        alert('请登录')
        return
      }
      this.$router.push({name: 'aritcle'})
    }
  }
}
</script>
<style scoped>
  @import "homeCpmonent.css";
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
