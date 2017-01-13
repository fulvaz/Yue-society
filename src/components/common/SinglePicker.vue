<template lang="html">
<div class="container">
  <picker-popup
          ref="popup"
          class="popup"
          position="bottom"
          v-model="visible"
          popup-transition="popup-fade">
    <mt-picker ref="picker" :slots="slotPicker" @change="onChange"></mt-picker>
  </picker-popup>
  <fz-input :label="label" :placeholder="placeholder" :value="value" @click.native="handleClick" readonly :hasError="hasError" :errMsg="errMsg" ></fz-input>
</div>
</template>

<script>
import { Picker, Field, Popup } from 'mint-ui'
import InputField from './InputField'
import * as utils from '../../utils/utils.js'
export default {
  props: {
    label: String,
    placeholder: String,
    slotVals: Array,
    value: String,
    hasError: false,
    errMsg: ''
  },
  components: {
    'mt-field': Field,
    'fz-input': InputField,
    'mt-picker': Picker,
    'picker-popup': Popup
  },
  data () {
    return {
      firstRun: true, // 只能用这种方法来解决一个坑 [捂脸] setSlotValues也会触发change, 导致一初始化就将获得的数据改为错误值
      visible: false,
      slotPicker: []
    }
  },
  created () {
    this.slotPicker = utils.singlePickerHelper([]) // 需要给picker初始化一个值, 然后再改
  },
  watch: {
    slotVals () {
      // 通过picker的内部api设置values
      if (this.slotVals === undefined) return
      let arr = this.slotVals.map(e => e)
      this.$refs.picker.setSlotValues(0, arr) // 也会触发change
    }
  },
  methods: {
    onChange (picker, values) {
      // 组件的一个小bug 以后再说
      if (this.firstRun) {
        this.firstRun = false
        return
      }
      console.log('change! ' + values[0])
      this.$emit('input', values[0])
    },
    handleClick () {
      // 在选择框选中获取值
      if (this.value) this.$refs.picker.setSlotValue(0, this.value)
      else {
        this.$refs.picker.setSlotValue(0, this.slotVals[0])
      }
      this.visible = true
    },
    open () {
      this.visible = true
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../../assets/var.scss";
.container {
}

.popup {
  width: 100%;
}
</style>
