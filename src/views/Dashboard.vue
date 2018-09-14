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
import Alert from '../components/Alert.vue'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Sidebar,
    AdminNavBar,
    Alert
  }
}
</script>
