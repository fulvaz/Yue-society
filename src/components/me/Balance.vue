<template lang="html">
  <div class="container">
    <ul>
      <li class="price">10元</li>
      <li class="price">20元</li>
      <li class="price">50元</li>
      <li class="price">100元</li>
      <li class="other-price"><input type="text"></li>
    </ul>
    <button type="button" name="button" @click="handlePay"></button>
  </div>
</template>

<script>
// import weixin from '../../assets/jweixin-1.0.0.js'
import api from '../../api/index.js'
// import utils from '../../utils/utils.js'
export default {
  created () {
  },
  methods: {
    handlePay () {
    }
  }
}
</script>

<style lang="css">
</style>
