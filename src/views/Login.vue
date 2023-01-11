<template>
    <div class="login-box">
        <div class="login-input-box center">
            <h1 class="t-center">金融信贷系统</h1>
            <div class="form-box">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                <el-form-item prop="account">
                    <el-input prefix-icon="el-icon-user-solid" type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-s-order" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from '@/api/user'
export default {
      mounted(){
        this.enterKeyFn = (e) => {
           if(e.key === 'Enter'){
            this.submitForm()
          }
        }
        window.addEventListener('keypress',this.enterKeyFn)
      },
      beforeDestroy(){
        window.removeEventListener("keypress",this.enterKeyFn)
      },
      data() {
        return {
          ruleForm: {
            account:"admin",
            password:"approve123456."
          },
          rules: {
            account: [
              { required:true,trigger: 'blur',message:"请填写账号" }
            ],
            password: [
              { required:true, trigger: 'blur',message:"请填写密码" }
            ]
          }
        };
    },
    methods: { 
       submitForm() {
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            let [err,res] = await login(this.ruleForm)
            if(err) return 
            this.$router.push(this.$route.query.redirect||'/')
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style scoped>
    .login-box{
      width: 100%;
      height: 100%;
      background: url(../assets/bg2.jpg);
      background-size: cover;
    }
    .login-input-box{
      width: 700px;
      height: 370px;
      background: #fff;
      padding: 40px 40px 12px 12px;
      /* 变化盒模型:  */
      box-sizing: border-box;
    }
   :deep(.el-button){
    width: 100%;
   }
</style>