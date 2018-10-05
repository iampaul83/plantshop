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
          <i class="fa fa-gift" aria-hidden="true"></i> {{item}}
        </a>
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
          <Product :products="filteredProjects"></Product>
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
import _ from 'lodash'

export default {
  data () {
    return {
      category: '全部商品',
      pageProduct: [],
      products: [],
      pagination: [],
      isLoading: false,
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
  computed: {
    categoryList () {
      // Get categoryList
      const categoryList = _.chain(this.products)
        .groupBy((item) => item.category)
        .keys()
        .value()
      // Add 全部商品
      categoryList.unshift('全部商品')
      return categoryList;
    },
    filteredProjects () {
      return this.products.filter(item => item.category === this.category)
    }
  },
  methods: {
    getProductAll () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.isLoading = true
      // 取得產品分類
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.products = res.data.products
          this.isLoading = false
        }
      })
    },
    getPageProduct (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      this.isLoading = true
      // 取得每頁產品分類
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.pageProduct = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        }
      })
    },
    changePage (data) {
      this.getPageProduct(data)
    }
  }
}
</script>
