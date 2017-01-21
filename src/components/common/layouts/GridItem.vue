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
    // margin-right: $horizontal-margin;
    // margin-bottom: $horizontal-margin;
    display: block;
    float: left;
    // width: calc(50% - 30px);

    &:nth-child(even) {
      margin-right: 0;
    }
  }
</style>
