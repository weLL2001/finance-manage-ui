<template>
  <div id="app">
     <!-- <el-button type="primary" @click="test">主要按钮</el-button> -->
     <router-view/>
  </div>
</template>


<script>
  import reqInstance from '@/utils/request'
  import pretty from '@/utils/pretty'
  export default {
    methods:{
    /*   async test(){
      //  let res =  await axios.post("/user/login",{account:'admin',password:'approve123456.'})
          let [err,res] = await pretty(reqInstance.post("/user/login",{account:'admin',password:'approve123456.'}))
          console.log('err',err,'res',res)
      } */
    }
  }
</script>


<style scoped >
   #app{
    width: 100%;
    height: 100%;
   }
</style>
