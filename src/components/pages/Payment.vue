<template>
<div class="container">
<loading :active.sync="isLoading" ></loading>
  <section class="row justify-content-center mb-4">
  <div class="col-md-8">
    <div class="step-wrap d-flex ">
      <div class="step step01 flex-fill">
        <span class="font-Montserrat  num">1</span>
        <div class="steptext ">
          輸入訂單資料
        </div>
      </div>
      <div class="step step02 flex-fill" :class="{'active': !order.is_paid}">
        <span class="font-Montserrat num">2</span>
        <div class="steptext ">
          金流付款
        </div>
      </div>
      <div class="step step03 flex-fill " :class="{'active': order.is_paid}">
        <span class="font-Montserrat num">3</span>
        <div class="steptext">
          完成
        </div>
      </div>
    </div>
  </div>
</section>
  <div class="row justify-content-center">
  <div class="col-md-8">
    <h2 class="payment-title mt-4 mb-3"><span class="icon"><i class="far fa-file-alt"></i></span> 購買資訊</h2>
    <table class="table table-sm table-striped shadow-sm">
      <thead class="bg-primary text-white">
      <tr>
        <th colspan="2" class="px-2">商品資訊</th>
        <th>數量</th>
        <th class="px-2 text-right">金額</th>
      </tr>
      </thead>
      <tbody>
        <tr  v-for="item in order.products" :key="item.id">
          <td class="align-middle px-2">
          <div class="cart-img mt-2"  :style="{backgroundImage : `url(${item.product.imageUrl})`}"></div>
          </td>
          <td class="align-middle  px-2">
          <div  class="cart-title"  >{{item.product.title}}</div>
          <small class="text-info" v-if="item.final_total !== item.total">已套用優惠券</small>
          </td>
          <td class="align-middle  px-2">
          <div class="cart-unit text-primary">{{item.qty}} / {{item.product.unit}}</div>
          </td>
          <td class="align-middle text-right text-success  px-2">
          <div :class="{'old-totalPrice': item.final_total !== item.total}">{{item.total | currency}}</div>
           <div class="text-info" v-if="item.final_total !== item.total">{{item.final_total | currency}}</div>
          </td>
        </tr>
      </tbody>

    </table>
    <div class=" d-flex justify-content-end align-items-baseline px-2 pt-2">
        <span class="pr-3">總計</span>
        <span v-if="order.total" class="h4 text-success">{{order.total | currency}}</span>
      </div>
    </div>
  <div class="col-md-8 ">
  <hr class="my-4">
    <h2 class="payment-title mb-3 mt-5"><span class="icon"><i class="far fa-paper-plane"></i></span>  個人資訊</h2>
    <table class="table table-striped shadow-sm">
    <thead>
      <tr class="bg-primary text-white">
      <th class="py-1" colspan="2">訂單資料</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-dark">姓名</td>
        <td v-if="order.user">{{order.user.name}}</td>
      </tr>
      <tr>
        <td  class="text-dark">電話</td>
        <td v-if="order.user">{{order.user.tel}}</td>
      </tr>
      <tr>
        <td  class="text-dark">Email</td>
        <td v-if="order.user">{{order.user.email}}</td>
      </tr>
      <tr>
        <td  class="text-dark">地址</td>
        <td v-if="order.user">{{order.user.address}}</td>
      </tr>
      <tr>
        <td  class="text-dark">付款狀態</td>
        <td v-if="order.user">
          <span v-if="!order.is_paid" class="text-danger font-weight-bold">尚未付款</span>
          <span v-else class="text-success font-weight-bold">已完成付款</span>
        </td>
      </tr>
    </tbody>
    </table>

    <button v-if="!order.is_paid"  @click="payOrder" class="float-right mb-4 btn btn-danger text-white ">確認付款</button>
    <router-link to="/" v-else   @click="payOrder" class="float-right mb-4 btn btn-primary text-white "><i class="fas fa-caret-left"></i> 繼續購物</router-link>
 </div>
  </div>
  <Alert></Alert>
  <div class="overlay"></div>
  </div>
</template>

<script>

import Alert from '../Alert.vue'

export default {
  components: {
    Alert
  },
  data () {
    return {
      isLoading: false,
      order: {}
    }
  },
  methods: {
    getOrder () {
      const vm = this
      vm.isLoading = true
      const id = vm.$route.params.order_id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
      this.axios.get(api).then((res) => {
        console.log(res.data)
        vm.isLoading = false
        if (res.data.success) {
          vm.order = res.data.order
        }
      })
    },
    payOrder () {
      const vm = this
      const id = vm.$route.params.order_id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`
      this.axios.post(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.getOrder()
          vm.$bus.$emit('messsage:push', res.data.message, 'success')
        }
      })
    }
  },
  created () {
    this.getOrder()
  }
}
</script>
