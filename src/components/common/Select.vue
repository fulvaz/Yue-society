<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{label}}</label>
      <select class="select" name="select" @change="handleChange">
        <option v-for="(text, key) in options" :value="key">
          {{text}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { strictParseInt } from '../../utils/utils.js'
export default {
  props: {
    value: '',
    label: '',
    options: Object
  },
  data () {
    return {
      t: 1
    }
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
    border-bottom: 1px solid #f7f7f7;
    box-sizing: border-box; // 边界会被盖住, 天杀的w3c

    .label {
      width: 105px;
    }
    .select {
      flex: 1;
      background-color: white;
    }
  }
</style>
