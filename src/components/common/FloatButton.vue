<template lang="html">
    <div class="btn-fixed">
      <slot></slot>
    </div>
</template>

<script>
// 搜索内的悬浮按钮, 直接用
export default {
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .btn-fixed {
    z-index: 1;
    position: fixed;
    bottom: calc(1em + 53px);
    right: 1em;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $douban-green;
    overflow: hidden;

    .disabled {
      color: #aaa;
      border: 1px solid #aaa;
    }

    button {
      width: 100%;
      height: 100%;
      color: white;
    }
  }
</style>
