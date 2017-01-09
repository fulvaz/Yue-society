<template lang="html">
  <div class="container">
    <mt-radio
      title="请选择充值项"
      v-model="depositeVal"
      :options="radioOptions">
    </mt-radio>
    <mt-button class="submit" type="primary" @click="handlePay" :disabled="ifBtnDisable">充值</mt-button>
  </div>
</template>

<script>
// import * as api from '../../api/index.js'
// import utils from '../../utils/utils.js'
import { Button, Radio } from 'mint-ui'
export default {
  data () {
    return {
      depositeVal: '',
      radioOptions: [{
        label: '10 币',
        value: '10'
      }, {
        label: '20 币',
        value: '20'
      }, {
        label: '50 币',
        value: '50'
      }, {
        label: '100 币',
        value: '100'
      }]
    }
  },
  computed: {
    ifBtnDisable () {
      return this.depositeVal.length === 0
    }
  },
  components: {
    'mt-button': Button,
    'mt-radio': Radio
  },
  created () {
  },
  methods: {
    handlePay () {
      // let depositeVal = parseInt(this.depositeVal)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    background-color: white;
    box-sizing: border-box;
    padding: 18px;
  }

  .submit {
    width: 100%;
  }

</style>
