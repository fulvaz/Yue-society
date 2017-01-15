<template lang="html">
    <router-link class="tag" :to="to"><span>{{text}}</span></router-link>
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
  padding: 0px 2px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
}
</style>
