<template>
<div>
<loading :active.sync="isLoading" ></loading>
<div class="container mb-1">
<Slider/>
  <div class="row mt-5">
    <div class="col-md-3">
      <!-- 左側選單 (List group) -->
      <div class="list-group sticky-top">
        <a href="javascript:;" class="list-group-item list-group-item-action" v-for="item in categoryList" :key="item"  @click.prevent="category = item" :class="{'active': category == item}" data-toggle="list" >
          <i class="fa fa-gift" aria-hidden="true"></i> {{item}}</a>
      </div>
    </div>
    <div class="col-md-9">
      <!-- 主要商品列表 (Card) -->
      <div class="tab-content">
        <div class="tab-pane active" v-if="category == '全部商品'" >
          <Product :products="pageProduct"></Product>
          <Pagination :page="pagination" @goToPage="changePage"></Pagination>
        </div>
        <div class="tab-pane active" v-else>
          <Product :products="products.filter(item => item.category == category)"></Product>
        </div>
      </div>
    </div>
  </div>
</div>
  <Cart></Cart>
</div>
</template>

<script>
import Product from './pages/Product.vue'
import Pagination from './pages/Pagination.vue'
import Slider from './pages/slider.vue'
import Cart from './pages/Cart.vue'

export default {
  data () {
    return {
      category: '全部商品',
      pageProduct: [],
      products: [],
      pagination: [],
      isLoading: false,
      categoryList: []
    }
  },
  components: {
    Product,
    Pagination,
    Slider,
    Cart
  },
  created () {
    this.getProductAll()
    this.getPageProduct()
    // eslint-disable-next-line
    mixpanel.track('PageView')
  },
  methods: {
    getProductAll () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      // 取得產品分類
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          vm.categoryList = res.data.products.map((item) => item.category)
            .filter((item, index, arr) => {
              return arr.indexOf(item) === index
            })
          vm.categoryList.unshift('全部商品')
          vm.products = Object.assign([], res.data.products)
          vm.isLoading = false
        }
      })
    },
    getPageProduct (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      vm.isLoading = true
      // 取得每頁產品分類
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          vm.pageProduct = Object.assign([], res.data.products)
          vm.pagination = Object.assign([], res.data.pagination)
          vm.isLoading = false
        }
      })
    },
    changePage (data) {
      this.getPageProduct(data)
    }
  }
}
</script>
