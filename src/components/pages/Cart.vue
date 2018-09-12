<template>
    <div>
    <loading :active.sync="isLoading" ></loading>
    cart
    </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  }
}
</script>
