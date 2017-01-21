<template lang="html">
  <div v-show="show" class="post-editor-container">
    <header>
      <span class="title">{{title}}</span>
      <button class="send-btn btn" @click="confirm">{{confirmBtnText}}</button>
      <button class="close-btn btn" @click="cancel">关闭</button>
    </header>
    <section class="editor">
      <slot></slot>
    </section>
    <!-- <section class="functions">
    </section> -->
  </div>
</template>

<script>
let that
export default {
  components: {
  },
  props: {
    title: String,
    confirmBtnText: String
  },
  data () {
    return {
      show: false,
      content: '',
      type: ''
    }
  },
  created () {
    that = this // 给全局函数使用
  },
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('canceled')
      this.close()
    },
    close () {
      this.show = false
    },
    open () {
      this.show = true
    }
  },

  // global methods
  open () {
    that.show = true
  },
  close () {
    that.show = false
  }
}
</script>


<style lang="scss" scoped>
  @import '../../../assets/index.scss';
  .post-editor-container {
    z-index: 1000;
    position: fixed;
    box-sizing: border-box;
    background-color: white;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  header {
    border-bottom: 1px solid #F2F2F2;

    @include clearfix()
    .title {
      z-index: -1;
      position: absolute;
      display: block;
      padding: 14px 0;
      width: 100%;
      height: 17px;
      line-height: 17px;
      font-size: 17px;
      text-align: center;
    }

    .send-btn {
      float: left;
    }

    .close-btn {
      float: right;
    }

    .btn {
      padding: 14px 18px;
      color: #42bd56;
      line-height: 17px;
      font-size: 17px;
      border: none;
      background-color: transparent;
    }
  }

  .editor {
    // padding: 0px 18px;
    font-size: 17px;
    .title {
      width: 100%;
      line-height: 45px;
      border-bottom: 1px solid #F2F2F2;
      &::-webkit-input-placeholder {
        font-size: 17px;
        font-weight: 500;
        color: #C1C1C1;
      }
    }
    .content {
        padding: 15px 0;
        width: 100%;
        height: 200px;
        font-size: 17px;
        &::-webkit-input-placeholder {
          font-size: 17px;
          color: #C1C1C1;
        }
    }
  }

  .functions {
      height: 45px;
      border-bottom: 1px solid #F2F2F2;
      border-top: 1px solid #F2F2F2;

      .type {
        border: $list-border;
      }
  }

  .errMsg {
    @include errMsg;
  }
</style>
