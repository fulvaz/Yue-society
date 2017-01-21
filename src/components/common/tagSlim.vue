<template lang="html">
    <!-- <router-link class="tag" :to="to"><span>{{text}}</span></router-link> -->
    <span class="tag" :to="to"><span>{{text}}</span></span>
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
  padding: 0px 1px;
  font-size: 12px;
  line-height: 14px;
  border-radius: 5px;
  // background-color: rgb(230, 230, 230);
  background-color: white;
  border: 1px solid rgb(230, 230, 230);
}
</style>
