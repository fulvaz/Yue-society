<template lang="html">
<div class="container">
  <mt-datetime-picker
    ref="picker"
    type="date"
    v-model="date"
    :startDate="new Date('1900-01-01')"
    :endDate="new Date('2000-01-01')"
    @confirm="handleConfirm"
    >
  </mt-datetime-picker>

  <mt-field :label="label" :placeholder="placeholder" @click.native="handleClick" :value="value" readonly></mt-field>
</div>
</template>

<script>
import {DatetimePicker, Field} from 'mint-ui'
import * as utils from '../../utils/utils.js'

export default {
  props: {
    label: String,
    placeholder: String,
    value: ''
  },
  components: {
    'mt-field': Field,
    'mt-datetime-picker': DatetimePicker
  },
  data () {
    return {
      date: ''
    }
  },
  methods: {
    handleClick () {
      this.$refs.picker.open()
    },
    handleConfirm () {
      let dateYMD = utils.Date2YMD(this.date)
      this.$emit('input', dateYMD)
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  border-bottom: 1px solid #d7d7d7;
}

.popup {
  width: 100%;
}
</style>
