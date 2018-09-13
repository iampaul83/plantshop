<template>
  <div class="pt-4">
  <loading :active.sync="isLoading" ></loading>
  <button type="button" class="btn btn-primary " @click="openModal(true)">
  新增產品
  </button>
    <table  class="table table-sm mt-3">
      <thead>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="120">是否啟用</th>
      <th width="180">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td>{{item.originPrice | currency}}</td>
          <td>{{item.price | currency}}</td>
          <td>
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary" @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger" @click="delectProduct(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  <Pagination :page="pagination" @goToPage="getProducts"></Pagination>
    <!-- Modal -->
<div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input @keyup.enter="uploadFile" type="text" class="form-control" id="image" v-model.lazy="tempProduct.imageUrl"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-spinner fa-spin"  v-if="loadspin"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
            </div>
            <img v-if="tempProduct.imageUrl" :src="tempProduct.imageUrl"
              class="img-fluid" alt="tempProduct.imageUrl">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" v-model="tempProduct.title" id="title"
                placeholder="請輸入標題">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                  placeholder="請輸入分類">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit "
                  placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price" v-model.number="tempProduct.originPrice"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price" v-model.number="tempProduct.price "
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                placeholder="請輸入產品描述"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"
                placeholder="請輸入產品說明內容"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" true-value="1" false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '../pages/Pagination.vue'

export default{
  data () {
    return {
      loadspin: false,
      isLoading: true,
      products: [],
      isNew: false,
      pagination: {},
      tempProduct: {
        imageUrl: '',
        title: '',
        is_enabled: 0,
        category: '',
        unit: '',
        originPrice: '',
        price: '',
        description: '',
        content: ''
      }
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      this.axios.get(api).then((res) => {
        vm.products = res.data.products
        vm.pagination = res.data.pagination
        vm.isLoading = false
      })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        // 這裡要注意,item會有by referance性質,所以用淺複製 Object.assign({},item)
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      $('#productModal').modal('show')
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.axios[httpMethod](api, { 'data': vm.tempProduct }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('新增失敗')
        }
      })
    },
    delectProduct (item) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${item.id}`
      this.axios.delete(api).then((res) => {
        $('#productModal').modal('hide')
        this.getProducts()
      })
    },
    uploadFile () {
      const vm = this
      const uploadedFile = this.$refs.files.files[0]
      const formData = new FormData()
      vm.loadspin = true
      formData.append('file-to-upload', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          console.log('upload')
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl)
          vm.loadspin = false
        } else {
          this.$bus.$emit('message:push', res.data.message, 'danger')
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
