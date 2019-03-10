import axios from 'axios'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true
// Axios实现请求重试
axios.defaults.retry = 1 // 重试次数
axios.defaults.retryDelay = 1000 // 重试延时
axios.defaults.shouldRetry = (error) => true // 重试条件，默认只要是错误都需要重试
axios.defaults.baseURL = 'http://127.0.0.1:8080/admin'
// axios.defaults.baseURL = 'http://www.llzteam.com/admin'
axios.interceptors.request.use(function (config) {
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type': 'application/json; charset=utf-8'
  }
  return config
}, function (error) {
})
var utils = {
  setCookie: function (c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + escape(value) +
      ((expiredays == null) ? '' : ';path=/;expires=' + exdate.toGMTString())
    document.cookie = c_name + '=' + escape(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  },
  getCookie: function(cname) {
    var arr = document.cookie.match(new RegExp('(^| )' + cname + '=([^;]*)(;|$)'))
    if (arr != null) return unescape(arr[2]);
    return null
  },
  clearCookie: function (name) {
    this.setCookie(name, '', -1)
  },
  get: function (url, success) {
    axios.get(url).then(function(response) {
      if (typeof success === 'function') {
        success(response.data);
      }

    }).catch(function (error) {
      console.log("request error:" + error);
    })},
  post:function(url,option,success){

      axios.post(url,option).then(function(response){
        console.log("请求成功！");
        if(typeof success == 'function'){
            success(response.data);
        }

      }).catch(function(error){

        console.log("request error:" + error);
      })},
  dateTemplateToDate:function(timestamp){
    var date = new Date(timestamp);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
  }

}

export default utils;

