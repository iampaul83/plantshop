<template>
<nav class=" navbar fixed-top bg-primary flex-md-nowrap p-0 shadow">
  <router-link to="/" class="text-white h3 pt-2 col-sm-3 col-md-2 mr-0" href="javascript:;">WATZAI</router-link>
  <ul class="navbar-nav px-3">
  <li class="nav-item text-nowrap">
    <a class="nav-link text-white" href="javascript:;" @click.prevent="signout">登出</a>
  </li>
  </ul>
</nav>
</template>

<script>
export default{
  methods: {
    signout () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      this.axios.post(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}
</script>
