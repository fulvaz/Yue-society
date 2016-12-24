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

  <mt-field :label="label" :placeholder="placeholder" :value="value[0] + ' - ' + value[1]" @click.native="handleClick" disabled></mt-field>
</div>
</template>

<script>
import { Picker, Field, Popup } from 'mint-ui'
import * as utils from '../../utils/utils.js'
export default {
  props: {
    label: String,
    placeholder: String,
    picker: Array,
    slotVal: Object,
    value: Array
  },
  components: {
    'mt-field': Field,
    'mt-picker': Picker,
    'mt-popup': Popup
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onChange (picker, values) {
      // 组件的一个小bug 以后再说
      if (values[0]) picker.setSlotValues(1, this.slotVal[values[0]])
      else values[0] = picker.slots[0].values[0]
      console.log(values)
      this.$emit('input', [utils.strictParseInt(values[0]), utils.strictParseInt(values[1])])
    },
    handleClick () {
      this.$refs.picker.setSlotValue(0, this.value[0] + '')
      this.$refs.picker.setSlotValue(1, this.value[1] + '')

      // this.$refs.picker.setSlotValue(0, '19')
      // this.$refs.picker.setSlotValue(1, '17')
      this.visible = true
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
