<template>
    <div>
    <loading :active.sync="isLoading" ></loading>
    coupon
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
