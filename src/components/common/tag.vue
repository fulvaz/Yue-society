<template lang="html">
  <span class="tag">{{text}}</span>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style lang="css">
.tag {
  display: inline-block;
  padding: 0px 12px;
  font-size: 12px;
  line-height: 28px;
  border-radius: 5px;
  background-color: rgb(230, 230, 230);
}
</style>
