import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MyHome from '@/components/home/MyHome'
import myTemplate from '@/components/template/myTemplate'
import ArticleTemplate  from '@/components/articleTemplate/ArticleTemplate'
import ArticleShow from '@/components/articleShow/ArticleShow'
import MyApp from '@/components/app/MyApp'
import HomeComponent from '@/components/homecomponent/HomeComponent'
import MyRegist from '@/components/regist/MyRegist'
import Manager from '@/components/manager/Manager'

Vue.use(Router)
 const router = new Router({
  routes: [
    {
      path: '/hell',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name:'home',
      mate:{
        allowback:false
      },
      component: HomeComponent,
      children: [
        { path: '', name:'root',component: MyHome },
        { path: '/template',name:'html',component: myTemplate},
        { path: '/articleShow',name:'articleShow',component: ArticleShow},
        { path:'/aritcle', name:'aritcle', component: ArticleTemplate}
      ]
    },{
      path: '/app',
      name: 'app',
      component: MyApp
    },{
    path:'/register',
      name:'register',
      component: MyRegist
    },{
      path:'/manager',
      name:'manager',
      component:Manager
    }
  ]
})
router.beforeEach((to,from,next) => {
  console.log(to);

  next();
  console.log("*****");


})
export default router;
