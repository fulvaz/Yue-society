<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{label}}</label>
      <div class="input">
        <textarea
          v-validate
          data-vv-rules="required"
          name="text"
          :value="value"
          @input="handleChange"
        >
        </textarea>
      </div>
    </div>
    <span class="errMsg" v-show="errors.has('text')" >{{errors.first('text')}}</span>
  </div>
</template>

<script>
// 依赖valid-state.js以检查状态
// import * as utils from '../../utils/utils.js'
export default {
  // updated () {
  //   this.$validator.setLocale('zh-CN')
  // },
  props: {
    value: '',
    label: '',
    regExp: {
      default: '.*'
    }
  },
  data () {
    return {
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
    // height: 48px;
    border-bottom: 1px solid #d5d5d5;
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
      flex: 1;
      & > * {
        width: 100%
      }


    }
  }
</style>
