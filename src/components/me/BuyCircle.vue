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
      this.price = data.price
      this.radioOptions = data.items.map(e => {
        return {
          label: e + ' 个月',
          value: '' + e
        }
      })
    }).catch(response => {
      console.error(response)
    })
  },
  methods: {
    handlePay () {
      let month = parseInt(this.depositeVal)
      let data = {
        uid: this.$store.state.MeState.uid,
        circieId: parseInt(this.$route.params.id),
        price: this.price * month,
        month
      }
      api.buyCircle(data).then(res => {
        // TODO 提示信息
      }).catch(res => {
        // TODO 提示信息
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
