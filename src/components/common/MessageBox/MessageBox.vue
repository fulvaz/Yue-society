<template>
  <div class="mint-msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="mint-msgbox" id="mint-msgbox" v-show="value">
        <div id="mint-msgbox-content" v-if="message !== ''">
          <!-- <div class="mint-msgbox-message" v-html="message"></div> -->
          <div class="mint-msgbox-input" id="mint-msgbox-input" v-show="showInput">
            <!-- <div class="mint-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div> -->
            <textarea id="input" cols="30" rows="10" v-model="inputValue" ref="input" placeholder="输入回复"></textarea>
          </div>
        </div>
        <div class="mint-msgbox-btns">
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  #mint-msgbox-content {
    margin: 18px 12px 0 12px;
  }

  #mint-msgbox {
    border-radius: 15px;
  }

  #input {
    width: 100%;
    resize: none;
    outline: none;
  }

  #mint-msgbox-input {
    padding: 0;
  }

  @component-namespace mint {
    @component msgbox {
      /*position: fixed;*/
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      background-color: #fff;
      width: 85%;
      border-radius: 10px;
      font-size: 16px;
      -webkit-user-select: none;
      overflow: hidden;
      backface-visibility: hidden;
      transition: .2s;

      @descendent header {
        padding: 15px 0 0;
      }

      @descendent content {
        padding: 0px 20px 15px;
        border-bottom: 5px solid #ddd;
        min-height: 36px;
        position: relative;
      }

      @descendent input {
        padding-top: 15px;
        & input {
          border: 1px solid #dedede;
          border-radius: 5px;
          padding: 4px 5px;
          width: 100%;
          appearance: none;
          outline: none;
        }
        & input.invalid {
          border-color: #ff4949;
          &:focus {
            border-color: #ff4949;
          }
        }
      }

      @descendent errormsg {
        color: red;
        font-size: 12px;
        min-height: 18px;
        margin-top: 2px;
      }

      @descendent title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }

      @descendent message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
      }

      @descendent btns {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 40px;
        line-height: 40px;
      }

      @descendent btn {
        line-height: 35px;
        display: block;
        background-color: #fff;
        flex: 1;
        margin: 0;
        border: 0;

        &:focus {
          outline: none;
        }

        &:active {
          background-color: #fff;
        }
      }

      @descendent cancel {
        width: 50%;
        border-right: 1px solid #ddd;
        &:active {
          color: #000;
        }
      }

      @descendent confirm {
        color: #26a2ff;
        width: 50%;
        &:active {
         color: #26a2ff;
        }
      }
    }
  }

  .msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }

</style>
<style src="vue-popup/lib/popup.css"></style>

<script type="text/babel">
  let CONFIRM_TEXT = '回复'
  let CANCEL_TEXT = '取消'

  import Popup from 'vue-popup'

  export default {
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      confirmButtonClasses () {
        let classes = 'mint-msgbox-btn mint-msgbox-confirm ' + this.confirmButtonClass
        if (this.confirmButtonHighlight) {
          classes += ' mint-msgbox-confirm-highlight'
        }
        return classes
      },
      cancelButtonClasses () {
        let classes = 'mint-msgbox-btn mint-msgbox-cancel ' + this.cancelButtonClass
        if (this.cancelButtonHighlight) {
          classes += ' mint-msgbox-cancel-highlight'
        }
        return classes
      }
    },

    methods: {
      doClose () {
        this.value = false
        this._closing = true

        this.onClose && this.onClose()

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow
            document.body.style.paddingRight = this.bodyPaddingRight
          }
          this.bodyOverflow = null
          this.bodyPaddingRight = null
        }, 200)
        this.opened = false

        if (!this.transition) {
          this.doAfterClose()
        }
      },

      handleAction (action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return
        }
        var callback = this.callback
        this.value = false
        callback(action)
      },

      validate () {
        if (this.$type === 'prompt') {
          if (this.inputValue && this.inputValue.length === 0) return false
          else return true
        }

        //   var inputPattern = this.inputPattern
        //   if (inputPattern && !inputPattern.test(this.inputValue || '')) {
        //     this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
        //     this.$refs.input.classList.add('invalid')
        //     return false
        //   }
        //   var inputValidator = this.inputValidator
        //   if (typeof inputValidator === 'function') {
        //     var validateResult = inputValidator(this.inputValue)
        //     if (validateResult === false) {
        //       this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!'
        //       this.$refs.input.classList.add('invalid')
        //       return false
        //     }
        //     if (typeof validateResult === 'string') {
        //       this.editorErrorMessage = validateResult
        //       return false
        //     }
        //   }
        // }
        // this.editorErrorMessage = ''
        // this.$refs.input.classList.remove('invalid')
        // return true
      },

      handleInputType (val) {
        if (val === 'range' || !this.$refs.input) return
        this.$refs.input.type = val
      }
    },

    watch: {
      inputValue () {
        if (this.$type === 'prompt') {
          this.ifInputValid = this.validate()
        }
      },

      inputType (val) {
        this.handleInputType(val)
      }
    },

    data () {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      }
    }
  }
</script>
