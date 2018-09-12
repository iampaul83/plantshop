<template>
 <nav aria-label="Page navigation example">
 <ul class="pagination">
    <li class="page-item"  :class="{'disabled' : !page.has_pre}" >
      <a class="page-link" @click.prevent="prePage(page.current_page)" href="javascript:;" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item" :class="{'active': item === page.current_page}" v-for="item in page.total_pages" :key="item">
      <a class="page-link" href="javascript:;" @click.prevent="currentPage(item)">{{item}}</a>
    </li>
    <li class="page-item" :class="{'disabled' : !page.has_next}">
      <a class="page-link" href="javascript:;" @click.prevent="nextPage(page.current_page)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
  </nav>
</template>

<script>
export default{
  props: ['page'],
  methods: {
    currentPage (page) {
      const vm = this
      console.log('curPage')
      vm.$emit('goToPage', Number(page))
    },
    prePage (page) {
      const vm = this
      console.log('prePage')
      vm.page.current_page <= 1 ? this.$emit('goToPage', Number(1)) : this.$emit('goToPage', Number(vm.page.current_page - 1))
    },
    nextPage (page) {
      const vm = this
      console.log('nextPage')
      vm.page.current_page >= vm.page.total_pages ? this.$emit('goToPage', Number(vm.page.total_pages)) : this.$emit('goToPage', Number(vm.page.current_page + 1))
    }
  }
}
</script>
