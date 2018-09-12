<template>
    <div>
    <loading :active.sync="isLoading" ></loading>
    order
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
