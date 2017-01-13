<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{label}}</label>
      <div class="input">
        <textarea name="introduction" :value="value" v-on:blur="handleChange" :class="{error: maxErr || nullErr || otherErr}"></textarea>
      </div>
    </div>
      <span class="errMsg" v-if="hasError">{{errMsg}}</span>
  </div>
</template>

<script>
// 依赖valid-state.js以检查状态
// import * as utils from '../../utils/utils.js'
export default {
  props: {
    // type: {
    //   required: true
    // },
    value: '',
    label: '',
    hasError: false,
    errMsg: '',
    // maxLength: {
    //   default: 10,
    //   required: true
    // },
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
    // validate (event) {
    //   if (this.value.length === 0) this.nullErr = true
    //   else this.nullErr = false
    //   if (this.value.length > this.maxLength) this.maxErr = true
    //   else this.maxErr = false
    //   if (this.regExp && (new RegExp(this.regExp)).test(this.value)) this.otherErr = false
    //   else this.otherErr = true
    //
    //   // 修改全局状态 这里就不要用vuex了, 不作死, 上次的代码已经没法维护了
    //   let ifErr = this.nullErr || this.maxErr
    //   if (ifErr) validState.nickname = false
    //   else validState.nickname = true
    // }
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
    background: white;
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
      flex: 1;
      & > * {
        width: 100%
      }


    }
  }
</style>
