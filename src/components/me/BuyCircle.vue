<template lang="html">
  <div class="container">
    <mt-radio
      title="请选择圈子发言包月时长"
      v-model="depositeVal"
      :options="radioOptions">
    </mt-radio>
    <mt-button class="submit" type="primary" @click="handlePay" :disabled="ifBtnDisable">购买</mt-button>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import { Button, Radio } from 'mint-ui'
export default {
  data () {
    return {
      price: 100,
      depositeVal: '',
      radioOptions: [{
        label: '1个月',
        value: '1'
      }, {
        label: '3个月',
        value: '3'
      }, {
        label: '6个月',
        value: '6'
      }, {
        label: '12个月',
        value: '12'
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
    api.getBuyCirclePage().then(response => {
      let data = utils.response2Data(response)
      this.radioOptions = data.map(e => {
        return {
          label: e.month + ' 个月' + '   ' + e.price + '元',
          value: e.id + ''
        }
      })
    }).catch(response => {
      console.error(response)
    })
  },
  methods: {
    handlePay () {
      let data = {
        uid: this.$store.state.MeState.uid,
        circleId: parseInt(this.$route.params.id),
        serviceId: parseInt(this.depositeVal)
      }
      this.openIndicator()
      api.buyCircle(data).then(res => {
        this.handleSuccess('PAY_SUCCESS')
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    box-sizing: border-box;
    padding: 18px;
  }

  .submit {
    width: 100%;
  }

</style>
