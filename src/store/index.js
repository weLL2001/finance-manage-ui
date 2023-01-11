import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

// webpack 实现的操作文件的api
// 自动导入vuex模块
let moduleFn = require.context('./modules',true,/\.js$/)
let reg = /\.\/(.*?)\.js$/
moduleFn.keys().forEach(filePath => {
  let moduleObj = moduleFn(filePath).default
  moduleObj.namespaced = true 
  const regRes = reg.exec(filePath)
  const moduleName = regRes && regRes[1]
  moduleName && store.registerModule(moduleName,moduleObj)
});

export default store 