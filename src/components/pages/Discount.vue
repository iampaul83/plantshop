<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
      <h1 class="text-center mt-4 discount-title pb-3 "><span class="icon"><i class="fas fa-ticket-alt"></i> </span> 優惠活動</h1>
      <div class="activity-wrapper d-flex p-4 my-4">
        <div class="activity-img"><img src="../../assets/images/alert.svg" alt=""></div>
        <div class="activity-content d-flex justify-content-center flex-column">
          <h2 class="text-center text-danger py-2">開幕慶優惠 !!</h2>
          <div class="text-center font-weight-normal h5">輸入以下代碼，即可獲得全館7折優惠
          </div>
          <div class="code-num">0070</div>
        </div>
       <div class="shineBg"></div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
