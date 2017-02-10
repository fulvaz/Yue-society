<template lang="html">
  <button v-show="show" type="button" name="button" class="btn-load-more" @click="handleClick">{{text}}</button>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: '点击加载更多'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/index.scss";
.btn-load-more {
  width: 100%;
  padding: 1em 0;
  font-size: $description-size;
  color: $description-color;
  background: white;
  appearance: none;
}
</style>
