<template>
<div class="text-center signbox">
<loading :active.sync="isLoading" ></loading>
<form class="form-signin" @submit.prevent="login">
  <router-link to="/" class="d-inline-block img">
    <img class="mb-4 img-fluid" src="../assets/images/logo.png" alt="" >
  </router-link>
  <div class="login-input  shadow">
    <h1 class="h5 mb-3 font-weight-light">會員登入</h1>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" v-model="data.username" class="form-control" placeholder="Email address">
  <label for="inputPassword" class="sr-only">Password</label>
  <input type="password" id="inputPassword" v-model="data.password" class="form-control" placeholder="Password">
  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
  </div>
</form>
</div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    login () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/signin`
      vm.isLoading = true
      this.axios.post(api, vm.data).then((res) => {
        console.log(res.data)
        vm.isLoading = false
        if (res.data.success) {
          console.log('signin')
          vm.$router.push('/')
        }
      })
    }
  },
  created () {
    this.login()
  }
}
</script>

<style lang="scss">

  .signbox {
    position:relative;
  min-height:100vh;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background:#fffcf2;
  .img{
    width:150px;
    margin: 5px auto;
  }
}
.login-input{
    padding: 35px 15px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 60px;
}
.form-signin {
  width: 100%;
    max-width: 400px;
    margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
