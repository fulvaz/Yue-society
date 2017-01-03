<template lang="html">
  <section class="details">
    <fz-list title="">
      <li v-for="(value, key) in info">
        <div class="wrapper">
          <span class="key">{{key}}</span>
          <span class="value">{{value}}</span>
        </div>
      </li>
    </fz-list>
  </section>
</template>

<script>
import List from './List'
export default {
  components: {
    'fz-list': List
  },
  props: {
    info: Object
  }
}
</script>
<style lang="scss" scoped>
li {
  display: flex;
  list-style: none;
  .key {
    display: inline-block;
    width: 100px;
    font-size: 13px;
    line-height: 33px;
  }
  .value {
    display: inline-block;
    font-size: 13px;
    line-height: 33px;
  }
}
</style>
