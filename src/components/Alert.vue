<template>
<div class="message-alert">
  <div class="alert"
    :class="'alert-' + item.status"
    v-for="(item, i) in messages" :key="i">
    {{ item.message }}
    <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      document.querySelector('body').classList.add('show')
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
      document.querySelector('body').classList.remove('show')
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
        document.querySelector('body').classList.remove('show')
      }, 2500)
    }
  },
  created () {
    const vm = this
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 danger
    vm.$bus.$on('messsage:push', (message, status = 'danger') => {
      vm.updateMessage(message, status)
    })
    // vm.$bus.$emit('message:push')
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  width: 100%;
  max-width: 450px;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11000;
}
</style>
