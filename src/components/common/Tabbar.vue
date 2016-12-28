<template>
    <div class="tab">
      <slot></slot>
    </div>
</template>

<script>
    export default {
      created () {
      }
    }
</script>

<style scoped lang="scss">
  .tab {
    display: flex;
    justify-content: space-around;
    padding: 5px;
    height: 53px;
    width: 100%;
    box-sizing: border-box;
    background-color: #F7F7FA;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #C0BFC4;
  }
</style>
