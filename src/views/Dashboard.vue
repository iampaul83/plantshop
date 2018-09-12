<template>
<div>
  <loading :active.sync="isLoading" ></loading>
  <div>
  <AdminNavBar></AdminNavBar>
      <Sidebar/>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <router-view/>
      </main>
  </div>
</div>
</template>

<script>
import Sidebar from '../components/admin/Sidebar.vue'
import AdminNavBar from '../components/admin/AdminNavbar.vue'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Sidebar,
    AdminNavBar
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/dashboard';
</style>
