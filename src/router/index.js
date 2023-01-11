import Vue from 'vue'
import VueRouter from 'vue-router'
import {isLogin} from '@/utils/index'
import store from '@/store'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/featrue/404.vue'
import Privilege from '@/views/featrue/401.vue'
Vue.use(VueRouter)

const routes = [
  //前置路由配置
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  //按需引入
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {name:'notFound',path:'/404',component:NotFound},
  {name:'privilege',path:'/401',component:Privilege},
]

const router = new VueRouter({
  routes
})

function covertRole(id){
  switch(id) {
    case 1:return '审批专员';
    case 2: return '录入专员';
    case 3: return '管理员';
  }
}
import Axios from 'axios'
function loadAsyncRoutes(){
  return Axios.get('/menus.json')
}
function asyncRoutesHandler(routes) {
  return routes.map( route => {
    if (route.component === 'Layout') {
      route.component = HomeView
    } else {
      const filePath = route.component 
      route.component = () => import(`../views/${filePath}.vue`) 
    }
    if (route.children){
      route.children = asyncRoutesHandler(route.children)
    }
    return route 
  })
}
//加载路由
async function loadMenu(to,from,next){
  //异步请求
  let res = await loadAsyncRoutes()
  store.commit('user/setMenu',res.data)
  
  //加载菜单
  const asyncRoutes = asyncRoutesHandler(res.data)
  console.log(asyncRoutes)
  asyncRoutes.forEach(r => {
      //动态添加路由
      router.addRoute(r)
  });
  
  router.addRoute({
    path:'*',
    
  })


  //触发新的路由访问
  return next( {...to,replace:true} )
}
let whiteList = ['/login'] //白名单不需要登录就能访问的页面
router.beforeEach((to,from,next) => {
  // debugger
  //不next()就白屏
  if(whiteList.includes(to.path)) return next()
  let userData = isLogin()
  if(isLogin()){
    let roleName = covertRole(userData.type)
    console.log("未保存vuex的角色名",roleName)
    store.commit("user/changeUserInfo",{
      roleName
    }),
    store.commit('user/changeIsLogin',true)
    
    //是否加载过路由菜单
    if(store.getters['user/userMenu'].length>0){
        //已经加载过
        return next()
    }else{
      // 待加载
      return loadMenu(to,from,next)
    }
  }
  // alert('未登录不允许访问')
  // next('/login') //页面重定向
  // console.log(to.path,to.fullPath)
  let lastPath =  to.fullPath
  next({ name:'login' ,query:{redirect: lastPath} })
})
export default router
