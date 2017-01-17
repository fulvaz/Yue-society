<template lang="html">
  <div class="container">
    <div class="wrapper">
      <label class="label" for="select">{{required ? label + ' *' : label}}</label>
      <div class="input">
        <!-- <input type="text" :value="value" @blur="handleChange" :class="{error: hasError}" :placeholder="placeholder" :disabled="disabled" :readonly="readonly"> -->
        <img v-show="avatar.length !== 0"  class="uploaded-img" :src="avatar" @click="handleAvatarUpload">
        <img v-show="avatar.length === 0" class="uploaded-img" src="static/plus.png" @click="handleAvatarUpload">
        <!-- <button type="button" name="button" class="upload-btn" @click="handleAvatarUpload">上传头像</button> -->
        <div class="append">
          <slot></slot>
        </div>
        <span v-show="valAppend.length !== 0" class="append">{{valAppend}}</span>
      </div>
    </div>
      <span class="errMsg" v-if="hasError">{{errMsg}}</span>
  </div>
</template>

<script>
// 依赖 vee-validate
// import * as utils from '../../utils/utils.js'
import * as api from '../../api/index.js'
export default {
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    hasError: false,
    errMsg: '',
    placeholder: '',
    disabled: {
      type: [Boolean, String],
      default: false
    },
    value: '',
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
      otherErr: false,
      avatar: '',
      _avatarTmp: ''
    }
  },
  methods: {
    // 要求字段名为 avatar
    handleAvatarUpload () {
      this.openIndicator()
      api.wxAuth(['chooseImage', 'uploadImage']).then(res => {
        this.closeIndicator()
        return api.wxChooseImage(1)
      }).then(res => {
        this._avatarTmp = res.localIds[0]
        return api.wxUploadImage(res.localIds[0])
      }).then(res => {
        this.openIndicator()
        return api.uploadAvatarId({serverId: res.serverId})
      }).then(res => {
        this.handleSuccess('UPLOAD_IMAGE_SUCCES')
        this.avatar = this._avatarTmp
        this.$emit('input', this.avatar) // vee-validate 验证需要input事件
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
  },
  created () {
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
    padding: 12px 0;
    background-color: white;
    // height: 48px;
    .error {
      // border: 1px solid red;
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
      .upload-btn {
        font-size: $description-size;
      }

      .uploaded-img {
        display: block;
        background-color: #eee;
        width: 100px;
        height: 100px;
      }

      .append {
        display: block;
        width: 100%;
        height: 20px;
        font-size: $description-size;
      }
    }
  }
</style>
