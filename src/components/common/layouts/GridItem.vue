<template lang="html">
    <div class="grid-item-wrapper">
      <slot></slot>
    </div>
</template>

<script>
export default {
  created () {
    // console.log(this.$parent.$data)
  }
}
</script>

<style lang="scss">
  @import "../../../assets/index.scss";
  .grid-item-wrapper {
    // 默认是一行3个, 可以自己定制
    display: block;
    float: left;
    width: 33%;

    &:nth-child(even) {
      margin-right: 0;
    }
  }
</style>
