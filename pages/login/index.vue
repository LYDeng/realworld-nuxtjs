<!--
 * @Date: 2021-09-10 14:45:45
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-10 17:04:33
 * @Description: 无
-->
<template>
<div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center"> {{ isLogin ? 'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <!-- <a href="">Have an account?</a> -->
          <nuxt-link to="/register" v-if = "isLogin">Need an account?</nuxt-link>
          <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
          <template
           v-for="(messages, field) in errors"
          >
            <li
             v-for="(message, index) in messages"
             :key="index"
            >{{ field }} {{ messages }}</li>
          </template>
         
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if = "!isLogin" class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password"  
            v-model="user.password" required minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import { login, register } from '@/api/user'
//仅在客户端加载 js-cookie 
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',// 在路由匹配组件渲染之前会先执行中间件处理 ，多个就是数组，单个就传字符串
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.path === '/login'
    }
  },
  // asyncData() {},
  data() {
    return {
      user: {
        username:'',
        email: '',
        password: '',
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit () {
      try {
        //提交表单请求登录
        const { data } = this.isLogin ? await login({
          user: this.user
        }):await register({
          user: this.user
        })
        //保存用户的登录状态
        this.$store.commit('setUser', data.user)
        console.log(data.user);
        //防止刷新页面数据丢失，需要把数据持久化
        Cookie.set('user', data.user)
        console.log(Cookie.get('user'));
        //跳转到首页
        this.$router.push('/')
      } catch (error) {
        this.errors = error.response.data.errors;
      }

    }
  }
};
</script> <style>
</style>