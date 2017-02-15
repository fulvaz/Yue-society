<template lang="html">
  <div class="post-min-container">
    <slot name="heading">
      <h2 v-if="title.length !== 0" class="title">{{title}}</h2>
    </slot>
    <router-link v-for="act in topic" :to="`/posts/${act.id}`" class="post">
      <post-cell :avatar="act.authorAvator" :title="act.title" :date="dateFormat(act.date)" :author="act.author"></post-cell>
    </router-link>
  </div>
</template>

<script>
import PostCell from './PostCellMin'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'post-cell': PostCell
  },
  props: {
    topic: Array,
    title: String
  },
  methods: {
    dateFormat (value) {
      return utils.date2MMDDHHMM(value)
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/index.scss";
.post-min-container {
  background: white;
}

.heading {
  color: white;
  background: $main-pink;
}

.post {
  padding: $list-padding 0;
  @include list-border;
}
</style>
