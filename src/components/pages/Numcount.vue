<template>
<div class="btn-group countBtn-group d-inline-flex" role="group">
  <button type="button" class="btn px-3" @click="minus"><i class="fas fa-minus"></i></button>
  <input type="text" class="btn" v-model.number="count" @keyup="emitNum">
  <button type="button" class="btn px-3" @click="plus"><i class="fas fa-plus"></i></button>
</div>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    }
  },
  methods: {
    minus () {
      this.count > 1 ? this.count -= 1 : this.count = 1
      this.emitNum()
    },
    plus () {
      this.count += 1
      this.emitNum()
    },
    emitNum () {
      this.$emit('buyAmount', this.count)
    }
  }
}
</script>
