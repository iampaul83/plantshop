<template>
<div>
<div class="container main-contant mb-1">
  <div class="row mt-5">
    <div class="col-md-3">
      <!-- 左側選單 (List group) -->
      <div class="list-group sticky-top">
        <a class="list-group-item list-group-item-action active" data-toggle="list" href="#list-gold">
          <i class="fa fa-suitcase" aria-hidden="true"></i> 全部商品</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
          <i class="fa fa-gift" aria-hidden="true"></i> 植栽盆栽</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
          <i class="fa fa-gift" aria-hidden="true"></i> 擺飾花瓶</a>
        <a class="list-group-item list-group-item-action" data-toggle="list" href="#list-gift">
          <i class="fa fa-gift" aria-hidden="true"></i> 吊掛盆栽</a>
      </div>
    </div>
    <div class="col-md-9">
      <!-- 主要商品列表 (Card) -->
      <div class="tab-content">
        <div class="tab-pane active" id="list-gold">
              <Product></Product>
        </div>

        <div class="tab-pane" id="list-gift">
          <div class="row align-items-stretch">
            <!-- 禮品 -->
            <div class="col-md-4 mb-4">
              <div class="card border-0 box-shadow text-center h-100">
                <img class="card-img-top" src="https://images.unsplash.com/photo-1482173074468-5b323335debe?w=1350" alt="Card image cap">
                <div class="card-body">
                  <h4 class="card-title">超精緻禮物</h4>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                    is a little bit longer.</p>
                </div>
                <div class="card-footer border-top-0 bg-white">
                  <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                    <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- tab-content end -->
      <Pagination></Pagination>
    </div>
  </div>
</div>

  <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">刪除商品</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>是否確認刪除商品</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
          <button type="button" class="btn btn-outline-danger px-5">是</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Product from './pages/Product.vue'
import Pagination from './pages/Pagination.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Product,
    Pagination
  }
}
</script>
