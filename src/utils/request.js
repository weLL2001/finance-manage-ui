import axios from 'axios'
import { Notificatio,Loading } from 'element-ui'
import router from '@/router'
let reqInstance = axios.create({
    baseURL:"/api",
    //浏览器请求并发限制
    timeout: 5000
})
let service 
reqInstance.interceptors.request.use(function (config) {
    service  = Loading.service()
    let token = window.sessionStorage.getItem("token")
    if(token){
      config.headers['token'] = token
    }
    return config;
  }, function (err) {
    Notificatio.error(err.message)
    return Promise.reject(err);
  })

  reqInstance.interceptors.response.use(function (response) {
    service.close()
    let token = response?.data?.data?.token
    if(token){
      window.sessionStorage.setItem("token",token)
    }
    // code ===  20000 
    // else if code === 401 
    if (response?.data?.code === 20000) {}
      else if (response?.data?.code === 401 ) {
        router.replace({
          name:'privilege'
        })
      }
    // else if code === 603 token过期
    return response;
  }, function (err) {
    service.close()
    // 超出 2xx 范围的状态码都会触发该函数。
    Notificatio.error(err.message)
    return Promise.reject(err);
  })

  export default reqInstance

