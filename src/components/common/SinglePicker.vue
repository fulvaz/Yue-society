<template lang="html">
<div class="container">
  <mt-popup
          ref="popup"
          class="popup"
          position="bottom"
          v-model="visible"
          popup-transition="popup-fade">
    <mt-picker ref="picker" :slots="slotPicker" @change="onChange"></mt-picker>
  </mt-popup>
  <mt-field :label="label" :placeholder="placeholder" :value="value" @click.native="handleClick" disabled></mt-field>
</div>
</template>

<script>
import { Picker, Field, Popup } from 'mint-ui'
import * as utils from '../../utils/utils.js'
export default {
  props: {
    label: String,
    placeholder: String,
    slotVals: Array,
    value: String
  },
  components: {
    'mt-field': Field,
    'mt-picker': Picker,
    'mt-popup': Popup
  },
  data () {
    return {
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
      this.$refs.picker.setSlotValues(0, arr)
    }
  },
  methods: {
    onChange (picker, values) {
      // 组件的一个小bug 以后再说
      this.$emit('input', values[0]) 
    },
    handleClick () {
      this.visible = true
      if (this.value !== undefined) this.$refs.setSlotValue(this.value)
    },
    open () {
      this.visible = true
    }
  }
}

</script>

<style lang="scss">
.popup {
  width: 100%;
}
</style>
