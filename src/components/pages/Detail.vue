<template>
  <div class="container  detail-page mt-5">
<loading :active.sync="isLoading" ></loading>
    <div class="row">
      <div class="col-md-7">
      <div class="pd-wrapper">
      <div class="pd-img shadow">
        <img :src="product.imageUrl" class="w-100" alt="">
        <a href="javascript:;" @click.prevent="back" class="btn-back">BACK</a>
      </div>
      </div>
      </div>
      <div class="col-md-5 mb-5">
        <div class="sticky-top" style="top: 10px;">
        <small class="pd-category">{{product.category}}</small>
          <h1 class="pd-title mt-1"><span class=" py-4 d-inline-block">{{product.title}}</span>
          </h1>
           <div class="mt-4">
           <div class="pd-instruction mb-2 pb-2">
          <h2 class="pd-instruction-title">【產品說明】</h2>
          <p>{{product.content}}</p>
        </div>
        </div>
        <div class="d-flex align-items-center">
          <div  class="d-inline-flex flex-column">
            <div class="d-inline-flex my-3 align-items-baseline">
              <div class="h3 mb-0 text-success">
                {{product.price  | currency}}
              </div>
              <del class="text-muted pl-1">{{product.originPrice  | currency}}</del>
            </div>
            <Numcoount class="align-self-center" @buyAmount="buyAmount"></Numcoount>
          </div>
        <button type="button"  @click="addToCart(product.id)" @mouseover="alertAddcart(product.id)" :id="product.id"  data-toggle="tooltip" data-placement="top" title="已入購物車"  class="text-white align-self-top btn ml-auto btn-outline-info justify-content-center btn-sm btn-cart btn-cart-detail">
        <i v-if="status.getProductId == product.id" class="fas fa-spinner fa-spin"></i>
        <i v-else class="d-inline-block icon-cart">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 428 386">
          <path d="M397.1 74.7c-7-8.5-17.5-13.2-28.5-13.2H130.8c-6.8 0-13.3 1.9-18.9 5.4L99.8 24.4c-2-7-8.3-11.8-15.5-11.8H30.5c-6.7 0-12.2 5.4-12.2 12.2v1.3c0 6.7 5.4 12.2 12.2 12.2h46.2l23.6 83.4 32.5 115.1c-18.5 4.6-32.2 21.4-32.2 41.2 0 22.5 17.5 41 39.7 42.4-1.8 5.3-2.7 11.1-2.2 17.1 1.6 20.3 18.2 36.7 38.5 38.1 24.2 1.7 44.5-17.6 44.5-41.4 0-4.8-.8-9.4-2.3-13.7h48.6c-2 5.7-2.8 12-2.1 18.5 2.2 19.7 18.5 35.2 38.3 36.6 24.2 1.7 44.6-17.5 44.6-41.4 0-23.1-19.2-41.6-42.2-41.6H143.4c-7.9 0-14.6-6.2-15-14-.3-8.3 6.3-15.1 14.6-15.1h193.8c16.5 0 30.9-11.3 34.9-27.3L404 106.1c2.9-11.1.3-22.5-6.9-31.4zm-90.5 245.8c7.5 0 13.7 6.2 13.7 13.7 0 7.5-6.2 13.7-13.7 13.7-7.5 0-13.7-6.2-13.7-13.7.1-7.5 6.1-13.7 13.7-13.7zm-127.1 0c7.5 0 13.7 6.2 13.7 13.7 0 7.5-6.2 13.7-13.7 13.7-7.5 0-13.7-6.2-13.7-13.7 0-7.5 6.1-13.7 13.7-13.7zm-50.2-198.8l-6.2-22c-1-3.4.4-5.8 1.4-7 .9-1.2 3-3.2 6.4-3.2H157l7.1 32.3-34.8-.1zm7.8 27.8h33l6.6 29.9h-31.1l-8.5-29.9zm30.3 86.1c-3.6 0-6.8-2.4-7.8-5.9l-6.3-22.4h29.4l6.2 28.2-21.5.1zm69.7 0h-19.7l-6.2-28.2H237l.1 28.2zm0-56.2h-32l-6.6-29.9h38.6v29.9zm0-57.7h-44.6l-7.1-32.3h51.8v32.3zM287 235.6h-22v-28.2h28l-6 28.2zm11.9-56.2H265v-29.9h40.2l-6.3 29.9zM265 121.7V89.3h52.8l-6.8 32.3h-46zm79.8 107.8c-.9 3.6-4.1 6.2-7.8 6.2h-21.4l6-28.2h28.8l-5.6 22zm12.4-50.1h-29.8l6.3-29.9h31l-7.5 29.9zM377 99.3l-5.5 22.2h-32l6.8-32.3h22.9c3.4 0 5.4 1.9 6.3 3.1 1 1.3 2.4 3.8 1.5 7zm0 0"/>
        </svg>
        </i>
      </button>
        </div>
        </div>
      </div>
    </div>
      <Cart></Cart>
</div>
</template>

<script>
import $ from 'jquery'
import Numcoount from './Numcount.vue'
import Slider from './slider.vue'
import Cart from './Cart.vue'

export default {
  data () {
    return {
      product: {},
      isLoading: false,
      pdId: '',
      buyNum: 1,
      status: {
        getProductId: ''
      }
    }
  },
  created () {
    this.pdId = this.$route.params.product_id
    this.getProdust(this.pdId)
  },
  components: {
    Numcoount,
    Slider,
    Cart
  },
  methods: {
    getProdust (Id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${Id}`
      vm.isLoading = true
      this.axios.get(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.product = Object.assign({}, res.data.product)
          vm.isLoading = false
        }
      })
    },
    alertAddcart (id) {
      $(`#${id}`).tooltip({
        trigger: 'click'
      })
      setTimeout(function () {
        $(`#${id}`).tooltip('hide')
      }, 1200)
    },
    addToCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const data = {
        'product_id': id,
        'qty': vm.buyNum
      }
      vm.status.getProductId = id
      this.axios.post(api, { 'data': data }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          vm.status.getProductId = ''
          vm.alertAddcart(id)
        }
      })
      this.$bus.$emit('regetCart')
    },
    buyAmount (num) {
      this.buyNum = num
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
