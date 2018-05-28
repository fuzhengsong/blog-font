<template>
  <section class="user-register">
    <div class="register-box">
      <h1 class="box-header">用户注册</h1>
      <el-form>
        <el-row class="field">
          <el-col :span="8" class="">用户名：</el-col>
          <el-col :span="16">
            <el-input v-model.trim="username" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
        <el-row class="field">
          <el-col :span="8">密码：</el-col>
          <el-col :span="16">
            <el-input v-model.trim="password" placeholder="请输入密码"
                      type="password"></el-input>
          </el-col>
        </el-row>
        <el-row class="field">
          <el-col :span="8">重复密码：</el-col>
          <el-col :span="16">
            <el-input v-model.trim="againPassword"
                      placeholder="再次输入密码"
                      type="password"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div class="submit-button">
        <el-button type="primary" @click="doRegister">注册</el-button>
        <router-link :to="{name: 'user_login'}" class="to-register">去登录</router-link>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import {
    UserRegisterModel,
    UserGet
  } from '../../../model/index';
  export default {
    data() {
      return {
        username: '',
        password: '',
        againPassword: ''
      }
    },


    methods: {
      doRegister(){
        if(this.name === '' || this.password === '' || this.againPassword ===''){
          return this.$message.error('error');
        }
        if(this.password !== this.againPassword){
          return this.$message.error('密码不一致');
        }
        UserRegisterModel.execute({
          username: this.username,
          password: this.password
        }).then(response =>{
          this.$message.success('注册成功');
          this.$router.push({name: 'user_index'});
          this.resetData()
        });
      },

      resetData(){
        this.username = '';
        this.password = '';
        this.againPassword = '';
      }
    }

  }
</script>

<style scoped lang="less">
  @import '../userLogin/style.less';

  .register-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 350px;
    padding: 20px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    border: 1px solid @border-color;
  }
</style>
