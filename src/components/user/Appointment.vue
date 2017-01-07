<template lang="html">
  <div class="container">
    <single-picker
      label="约会类型"
      :slotVals="appSlotVal"
      v-model="appointmentType"
    ></single-picker>
    <single-picker
      label="红娘"
      :slotVals="redSlotVal"
      v-model="red"
    ></single-picker>
    <fz-textarea
      ref="ta"
      label="约会信息"
      class="req-msg"
      v-model="reqMsg"
    ></fz-textarea>
    <mt-button type="primary" class="submit-btn" @click="handleSubmit">提交</mt-button>
  </div>
</template>

<script>
// 约见请求页面
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import SinglePicker from '../common/SinglePicker'
import TextArea from './TextArea'
import { Button } from 'mint-ui'
export default {
  components: {
    'single-picker': SinglePicker,
    'mt-button': Button,
    'fz-textarea': TextArea
  },
  created () {
    api.getAppointmentPageInfo(this.$route.params.uid).then(response => {
      let data = utils.response2Data(response)
      this.appSlotVal = Object.values(data.category)
      this.redSlotVal = data.red.map(e => {
        return e.redName
      })
      this.red = data.red[0].redName || ''
      this.appointmentType = data.category[Object.keys(data.category)[0]]
    }).catch(response => {
      console.error(response)
    })
  },
  data () {
    return {
      reqMsg: '',
      appSlotVal: [],
      appointmentType: '',
      redSlotVal: [],
      red: ''
    }
  },
  methods: {
    handleSubmit () {
      // TODO 有问题的写法, 只能验证一个
      this.$refs.ta.$validator.validateAll().then(success => {
        console.log(this.$refs.ta)
        if (!success) {
          return
        }
        // send data
        let data = {}
        api.makeAppointment(data).then(res => {
          // TODO 提示信息
        }, res => {
          // TODO 提示信息
          console.error(res)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/var.scss";
  .submit-btn {
    margin-top: $section-margin;
    width: 100%;
  }
</style>
