<template>
    <div>
    <loading :active.sync="isLoading" ></loading>
    items
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
