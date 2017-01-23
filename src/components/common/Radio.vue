<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{required ? label + ' *' : label}}</label>
      <div class="input">
        <el-radio-group v-model="value" @change="handleChange">
          <el-radio v-for="option in options" :label="option.value">{{option.text}}</el-radio>
        </el-radio-group>
        <div class="append">
          <slot></slot>
        </div>
        <span v-show="valAppend.length !== 0" class="append-text">{{valAppend}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// 依赖 vee-validate
// import * as utils from '../../utils/utils.js'
export default {
  props: {
    options: Array, // {value: '', textl: ''}
    value: String,
    label: '',
    valAppend: {
      type: String,
      default: ''
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
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  // 重置移动设备默认样式
  .select {
    -webkit-appearance: none;
    border: none;
  }

  .container {
    width: 100%;
    padding: 10px 0;
    background-color: white;
    font-size: $description-size;
    // height: 48px;
    .error {
      // border: 1px solid red;
    }

    .errMsg {
      position: relative;
      top: 3px;
      left: 122px;
      color: red;
      font-size: 12px;
    }

  }

  .wrapper {
    display: flex;
    align-items: center;
    margin: 0 $horizontal-margin;
    height: 100%;

    .label {
      font-size: $description-size;
      width: 105px;
    }

    .input {
      position: relative;
      flex: 1;
      display: flex;
      input {
        width: 100%;
        &::-webkit-input-placeholder {
          font-size: $description-size;
        }
      }

      .append {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 15px;
        font-size: $description-size;
      }

      .append-text {
        flex-basis: 30px;
      }
    }
  }
</style>
