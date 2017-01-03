<template lang="html">
  <div class="container">
    <button type="button" name="button" @click="handlePay"></button>
  </div>
</template>

<script>
// import weixin from '../../assets/jweixin-1.0.0.js'
import api from '../../api/index.js'
// import utils from '../../utils/utils.js'
export default {
  created () {
    api.getWXConfig().then(response => {
      // let config = utils.response2Data(response)
      // weixin.config(config)
    })
  },
  methods: {
    handlePay () {
    }
  }
}
</script>

<style lang="css">
</style>
