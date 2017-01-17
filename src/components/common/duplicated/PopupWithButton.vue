<template lang="html">
  <div v-show="show" class="post-editor-container">
    <header>
      <span class="title">{{title}}</span>
      <button class="send-btn btn"></button>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="editor">
      <slot></slot>
    </section>
  </div>
</template>

<script>
let that
export default {
  components: {
  },
  props: {
    title: String
  },
  data () {
    return {
      show: false,
      title: ''
    }
  },
  created () {
    that = this // 给全局函数使用
  },
  methods: {
    close () {
      this.show = false
    }
  },
  open () {
    that.show = true
  },
  close () {
    that.show = false
  }
}
</script>


<style lang="scss" scoped>
  @import '../../assets/index.scss';
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

  .errMsg {
    @include errMsg;
  }
</style>
