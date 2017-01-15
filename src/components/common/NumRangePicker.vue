<template lang="html">
<div class="container">
  <mt-popup
          ref="popup"
          class="popup"
          position="bottom"
          v-model="visible"
          popup-transition="popup-fade">
    <mt-picker ref="picker" :slots="picker" @change="onChange"></mt-picker>
  </mt-popup>

  <fz-field :label="label" :placeholder="placeholder" :value="value[0] + ' - ' + value[1]" @click.native="handleClick" readonly :valAppend="valAppend"></fz-field>
</div>
</template>

<script>
// 这个组件的坑在于, 必须必须使用picker内部的方法去修改values, 否则不会触发更新
import { Picker, Popup } from 'mint-ui'
import * as utils from '../../utils/utils.js'
import config from '../../config/setting.js'
import InputField from '../common/InputField'
export default {
  props: {
    label: String,
    placeholder: String,
    // picker: Array,
    valAppend: String,
    slotVal: {
      type: Array,
      default: []
    },
    value: Array
  },
  components: {
    'mt-picker': Picker,
    'mt-popup': Popup,
    'fz-field': InputField
  },
  computed: {
  },
  data () {
    return {
      picker: [],
      visible: false
    }
  },
  watch: {
    slotVal () {
      // 因为picker不是响应式的，只能这样更新
      this.updatePicker()
    }
  },
  created () {
    this.picker = utils.pickerHelper2(this.slotVal)
  },
  mount () {
    // this.updatePicker()
  },
  methods: {
    onChange (picker, values) {
      // 组件的一个小bug 没onchange的时候，所有数值都默认为undefined
      // 就是说，打开了picker，只改其中一个值，返回的结果是[undefined, 正常值]
      // 没时间重写了，将就用着吧
      if (!values[0]) values[0] = this.value[0] + ''

      // 如果左值大于右值，则重新设定右值
      // 如果不指定具体值，而是比较index，组件通用性会强得多, 但是要求数组必须是有序数组

      if (this.slotVal.indexOf(values[1]) < this.slotVal.indexOf(values[0])) picker.setSlotValue(1, values[0])

      // 如果values不能转换为数字，那么调用者就是期待返回的是字符串
      let start
      let end
      if (utils.strictParseInt(values[0])) start = utils.strictParseInt(values[0])
      else start = values[0]
      if (utils.strictParseInt(values[1])) end = utils.strictParseInt(values[1])
      else end = values[1]

      // debug
      if (config.dev) {
        console.log('picks')
        console.log(['index', this.slotVal.indexOf(values[0]), this.slotVal.indexOf(values[1])])
        console.log(['values', ...values])
        console.log(['start-end', start, end])
      }
      this.$emit('input', [start, end])
    },
    handleClick () {
      this.$refs.picker.setSlotValue(0, '' + this.value[0])
      this.$refs.picker.setSlotValue(1, '' + this.value[1])
      this.visible = true
    },
    open () {
      this.visible = true
    },
    updatePicker () {
      // 更新picker的值只能使用这个方法
      this.$refs.picker.setSlotValues(0, this.slotVal)
      this.$refs.picker.setSlotValues(1, this.slotVal)
    }
  }
}

</script>

<style lang="scss">
.popup {
  width: 100%;
}
</style>
