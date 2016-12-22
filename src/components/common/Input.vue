<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{label}}</label>
      <div class="input">
      </div>
    </div>
  </div>
</template>

<script>
import { strictParseInt } from '../../utils/utils.js'
export default {
  props: {
    value: '',
    label: ''
  },
  data () {
  },
  methods: {
    handleChange (event) {
      this.$emit('input', strictParseInt(event.target.value))
    }
  }
}
</script>

<style lang="scss" scoped>
  // 重置移动设备默认样式
  .select {
    -webkit-appearance: none;
    border: none;
  }

  .container {
    width: 100%;
    height: 48px;
  }

  .wrapper {
    display: flex;
    align-items: center;
    margin: 0 10px;
    height: 100%;
    border-bottom: 1px solid #e4e4e4;

    .label {
      width: 105px;
    }

    .input {
      flex: 1;
      & > * {
        width: 100%
      }
    }
  }
</style>
