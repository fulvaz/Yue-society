<template lang="html">
  <div class="radio-container">
    <div class="wrapper">
      <label class="label" for="select">{{label}}</label>
      <div class="input">
        <el-radio-group v-model="selectVal" @change="handleChange">
          <el-radio v-for="option in options" :label="option.value">{{option.text}}</el-radio>
        </el-radio-group>
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
    options: {
      type: Array,
      default: function () {
        return []
      }
    }, // {value: '', text: ''}
    value: String,
    label: '',
    valAppend: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectVal: ''
    }
  },
  created () {
    this.selectVal = this.value
  },
  methods: {
    handleChange (event) {
      this.$emit('input', this.selectVal)
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

  .radio-container {
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
      color: $form-label-color;
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
