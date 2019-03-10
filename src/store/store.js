import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../common/utils'
/*使用Vuex*/
Vue.use(Vuex)
/*配置全局数据*/
const state = {
  loginUser:null,
  loginState:false,
  admin:false

}
/*配置全局函数*/
const mutations = {
  setLoginUser (state,userInfo) {
    var user = JSON.parse(utils.getCookie("user"));
    if(user != null){//登录
      state.loginUser =  user;
      state.loginState = true;
      state.admin = state.loginUser.userName =="admin" ? true : false;

    }else{
      state.loginUser =  null;
      state.loginState = false;
      state.admin = false;
    }
    if(userInfo != undefined && userInfo != "out"){
      utils.setCookie("user",JSON.stringify(userInfo));
      state.loginUser =  userInfo;
      state.loginState = true;
      state.admin = state.loginUser.userName =="admin" ? true : false;

    }
    if(userInfo == "out"){
      utils.clearCookie("user");
      state.loginUser =  null;
      state.loginState = false;
      state.admin = false;
    }
  }
}
const getters = {
  getLoginUser (state) {
    console.log("getLoginUser  getters");
    return state.loginUser;
  },
  getLoginState(state){
    return state.loginState;
  }
}
const actions ={
  setLoginUser({commit}){
    console.log("set login");
    commit('setLoginUser');
  }
}

/*将store导出*/
export default new Vuex.Store({
  state:state,
  mutations:mutations,
  getters:getters,
  actions:actions
})
