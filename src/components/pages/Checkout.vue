<template>
<div class="container main-contant ">
<loading :active.sync="isLoading" ></loading>
  <section class="row justify-content-center mb-4">
  <div class="col-md-8">
    <div class="step-wrap d-flex ">
      <div class="step step01 flex-fill  active">
        <span class="font-Montserrat  num">1</span>
        <div class="steptext">
          輸入訂單資料
        </div>
      </div>
      <div class="step step02 flex-fill ">
        <span class="font-Montserrat num">2</span>
        <div class="steptext">
          金流付款
        </div>
      </div>
      <div class="step step03 flex-fill ">
        <span class="font-Montserrat num">3</span>
        <div class="steptext">
          完成
        </div>
      </div>
    </div>
  </div>
</section>

<div class="row">
  <div class="col-lg-4 col-md-5 order-md-2 mb-4">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="check-title">購物清單</span>
      <span class="badge badge-secondary badge-pill text-white" style="fontSize: .95rem" v-if="cart.carts">{{cart.carts.length}}</span>
    </h4>
    <ul class="list-group mb-3 checkout-cart">
      <li v-for="item in cart.carts" :key="item.id" class="align-items-center list-group-item d-flex justify-content-between py-1 ">
        <div class="text-center">
          <a href="javascript:;" class="btn-del btn " @click.prevent="delCart(item.id)" >
            <i class="fas fa-spinner fa-spin" v-if="status.delitem == item.id"></i>
            <i class="far fa-trash-alt" v-else></i>
          </a>
        </div>
        <div>
        <div  class="cart-img mt-2 mx-1" :style="{backgroundImage : `url(${item.product.imageUrl})`}"></div>
        </div>
        <div class="ml-1 mr-auto">
          <div  class="cart-title">{{item.product.title}}</div>
          <div class="cart-unit">{{item.qty}} / {{item.product.unit}}</div>
          <small  v-if="cart.final_total !== cart.total" class="text-info">已套用優惠眷</small>
        </div>
        <div class=" text-right text-success">{{item.total | currency}}</div>
      </li>
      <li class="list-group-item mt-1  list-item-total  d-flex justify-content-between">
        <span>總額</span>
        <strong class="h5 mb-0 text-success" v-if="cart.final_total">{{cart.total | currency}}</strong>
      </li>
      <li class="list-group-item list-item-total d-flex justify-content-between" v-if="cart.final_total !== cart.total">
        <span class="text-info">折扣後</span>
        <strong class="h5 mb-0 text-info" >{{cart.final_total | currency}}</strong>
      </li>
    </ul>

    <form class="card p-2" @submit.prevent="checkcoupon">
      <div class="input-group">
        <input type="text" class="form-control" v-model="coupon.code" placeholder="請輸入優惠碼">
        <div class="input-group-append">
          <button type="submit" class="btn btn-secondary text-white">送 出</button>
        </div>
      </div>
    </form>
      <router-link to="/" class="btn btn-outline-primary btn-backShop mt-4 float-right"><i class="fas fa-caret-left"></i> 繼續購物</router-link>
  </div>
  <div class="col-lg-8 col-md-7 order-md-1">
    <h4 class="mb-3 check-title">訂單資訊</h4>
    <form class="checkout-form" @submit.prevent="submitOrder">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="name">姓名</label>
          <input type="text" class="form-control" v-model="data.user.name" :class="{'is-invalid': errors.has('name')}" v-validate="'required'" name="name" id="name" placeholder="" value="" >
          <small v-show="errors.has('name')" class="text-danger">請填入姓名</small>
        </div>
        <div class="col-md-6 mb-3">
          <label for="phone">電話</label>
          <input type="text" class="form-control" v-model="data.user.tel"  :class="{'is-invalid': errors.has('phone')}" v-validate="'required'"  name="phone" id="phone" placeholder="" value="" >
          <small v-show="errors.has('phone')" class="text-danger">請填入電話</small>
        </div>
      </div>

      <div class="mb-3">
        <label for="email">郵箱</label>
        <input  v-validate="'required|email'" v-model="data.user.email"  name="email" :class="{'is-invalid': errors.has('email')}"  type="email" class="form-control" id="email" placeholder="">
        <small class="text-danger">{{ errors.first('email') }}</small>
      </div>

      <div class="mb-3">
        <label for="address">收件地址</label>
        <input type="text" class="form-control" v-model="data.user.address"  :class="{'is-invalid': errors.has('address')}"    v-validate="'required'" name="address" id="address" placeholder="" >
        <small v-show="errors.has('address')" class="text-danger">請填入地址</small>
      </div>
      <div class="mb-3">
        <label for="memo">備註<small class="text-info">（選填）</small></label>
        <textarea  rows="5" v-model="data.message"   class="form-control"  name="memo" id="memo" placeholder="">
        </textarea>
      </div>
      <hr class="my-4">
      <button class="btn btn-primary btn-long btn-block"   type="submit">金流付款 <i class="fas fa-caret-right"></i></button>
    </form>
  </div>
</div>
    <Alert></Alert>
    <div class="overlay"></div>
</div>
</template>

<script>
import $ from 'jquery'
import Alert from '../Alert.vue'

export default {
  components: {
    Alert
  },
  data () {
    return {
      isLoading: false,
      cart: {
        carts: [],
        final_total: 0,
        total: 0
      },
      status: {
        delitem: ''
      },
      data: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon: {
        code: ''
      }
    }
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.axios.get(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.cart = res.data.data
          vm.isLoading = false
        }
      })
    },
    delCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.status.delitem = id
      this.axios.delete(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.getCart()
          vm.status.delitem = ''
        }
      })
    },
    checkcoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      this.axios.post(api, { 'data': vm.coupon }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.getCart()
        } else {
          vm.$bus.$emit('messsage:push', res.data.message)
        }
      })
    },
    submitOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      this.$validator.validate().then(result => {
        if (result) {
          this.axios.post(api, { 'data': vm.data }).then((res) => {
            console.log(res.data)
            if (res.data.success) {
              const orderId = `/payment/${res.data.orderId}`
              vm.$router.push(orderId)
            } else {
              vm.$bus.$emit('messsage:push', res.data.message)
            }
          })
        }
      })
    }
  },
  created () {
    this.getCart()
    $('body').removeClass('show')
  }
}
</script>
