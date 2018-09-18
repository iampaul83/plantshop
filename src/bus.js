import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// Alert component
// 錯誤時提示資訊用
// 自定義名稱 'messsage:push'
// message: 傳入參數
// status: 樣式，預設值為 danger
// vm.$bus.$on('messsage:push', (message, status = 'danger') => {
// vm.updateMessage(message, status)
// })

// 點擊購物車按鈕,發送 regetCart ,促發購物車更新
// :regetCart="getCart"
// this.$bus.$emit('regetCart')
