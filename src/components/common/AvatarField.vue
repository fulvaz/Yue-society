<template lang="html">
  <div class="avatar-uploader-container">
    <div class="wrapper">
      <label class="label" for="select">{{required ? label + ' *' : label}}</label>
      <div class="input">
        <div class="uploaded-img" v-show="avatar.length !== 0">
          <img-cover :img="avatar" @click="handleAvatarUpload"></img-cover>
        </div>
        <div class="uploaded-img" v-show="avatar.length === 0">
          <img-cover img="static/plus.png" @click="handleAvatarUpload"></img-cover>
        </div>
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
import ImgCover from '../common/ImageCover'
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
  components: {
    'img-cover': ImgCover
  },
  methods: {
    // 要求字段名为 avatar
    handleAvatarUpload () {
      this.openIndicator()
      api.wxAuth(['chooseImage', 'uploadImage']).then(res => {
        return api.wxChooseImage(1)
      }).then(res => {
        this._avatarTmp = res.localIds[0]
        return api.wxUploadImage(res.localIds[0])
      }).then(res => {
        // console.log(res)
        return api.uploadAvatarId({serverId: res.serverId})
      }).then(res => {
        this.closeIndicator()
        this.avatar = this._avatarTmp
        this.$emit('input', this.avatar) // vee-validate 验证需要input事件
      }).catch(res => {
        this.closeIndicator()
        this.handleAllFail(res)
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

  .avatar-uploader-container {
    width: 100%;
    padding: 12px 0;
    background-color: transparent;
    // background-color: white;
    // height: 48px;
    .error {
      // border: 1px solid red;
    }

    .errMsg {
      position: relative;
      top: 3px;
      left: $horizontal-margin + $input-label-width;
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
      color: $form-label-color;
      width: $input-label-width;
    }

    .input {
      position: relative;
      flex: 1;
      .upload-btn {
        font-size: $description-size;
      }

      .uploaded-img {
        // display: block;
        // background-color: $global-background-color;
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
