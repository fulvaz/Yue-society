<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{label}}</label>
      <div class="input">
        <input type="text" name="" :value="value" @input="handleChange">
        <span class="append" v-if="valAppend.length != 0">{{valAppend}}</span>
      </div>
    </div>
      <span class="errMsg" v-if="nullErr">不能为空</span>
      <span class="errMsg" v-if="maxErr">不能超过{{maxLength}}个字符</span>
      <span class="errMsg" v-if="otherErr">输入无效</span>
  </div>
</template>

<script>
// import * as utils from '../../utils/utils.js'
export default {
  props: {
    type: {
      required: true
    },
    value: '',
    label: '',
    valAppend: '',
    regExp: {
      default: '.*'
    }
  },
  data () {
    return {
      nullErr: false,
      maxErr: false,
      otherErr: false
    }
  },
  methods: {
    handleChange (event) {
      this.$emit('input', event.target.value)
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
    padding: 12px 0;
    background-color: white;
    // height: 48px;
    .error {
      border: 1px solid red;
    }

    .errMsg {
      position: relative;
      left: 115px;
      color: red;
      font-size: 12px;
    }

  }

  .wrapper {
    display: flex;
    align-items: center;
    margin: 0 10px;
    height: 100%;

    .label {
      width: 105px;
    }

    .input {
      position: relative;
      flex: 1;
      input {
        width: 100%;
      }
      .append {
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 50px;
      }
    }
  }
</style>
