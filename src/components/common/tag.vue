<template lang="html">
    <router-link :to="to" class="tag"><span>{{text}}</span></router-link>
</template>

<script>
export default {
  props: {
    text: String,
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  padding: 0px 6px;
  font-size: 12px;
  line-height: 28px;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
}
</style>
