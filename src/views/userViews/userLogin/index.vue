<template>
	<section class="user-login">
    <div class="login-box">
      <h1 class="box-header">用户登录</h1>
      <el-form>
        <el-row class="field">
          <el-col :span="6">用户名：</el-col>
          <el-col :span="18">
            <el-input v-model.trim="username" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
        <el-row class="field">
          <el-col :span="6">密码：</el-col>
          <el-col :span="18">
            <el-input v-model.trim="password" placeholder="请输入用户名" type="password"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div class="submit-button">
        <el-button type="primary" @click="login()">登录</el-button>
        <router-link :to="{name: 'user_register'}" class="to-register">去注册</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
  @import 'style.less';
</style>

<script>
  import {
    UserLoginModel
  } from '../../../model/index';

  export default{
    data(){
      return {
        username: '',
        password: ''
      }
    },

    methods: {
      login(){
        if(this.username === '' ||　this.password === ''){
          this.$message.error('用户名和密码不能为空');
        }
        UserLoginModel.execute({
          username: this.username,
          password: this.password
        }).then(response =>{
          this.$message.success('登录成功');
          this.resetData();
          this.$router.push({name: 'user_index'});
        })
      },

      resetData(){
        this.username = '';
        this.password = '';
      }
    }
  }
</script>
