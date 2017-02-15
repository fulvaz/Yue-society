<template>
  <div class="slider-item" :style="{width: elWidth}">
    <slot></slot>
  </div>
</template>

<script>
   export default {
     props: {
     },
     data () {
       return {
         itemsNum: 0
       }
     },
     mounted () {
       this.itemsNum = this.$parent.$children.length - 1
     },
     computed: {
       elWidth () {
         return (100 / this.itemsNum) + '%'
       }
     }
   }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .slider-item {
        float: left;
        padding: 0 5px;
        border-right: 1px solid #E7E7E7;
        box-sizing: border-box;
    }
</style>
