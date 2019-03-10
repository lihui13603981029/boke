// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './common/utils'
import Vuex from 'vuex'
import store from './store/store'
import i18n from './vueI18n/vueI18n'
import '../static/plugs/ueditor.config'
import '../static/plugs/ueditor.all'
import '../static/plugs/lang/zh-cn/zh-cn'
import '../static/plugs/ueditor.parse.min'


Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.isLogin=false;
Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  utils,
  components: { App },
  template: '<App/>'
})
