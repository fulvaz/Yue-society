<template lang="html">
  <div class="container">
    <section class="info">
      <img class="avator" :src="authorAvator" :alt="author">
      <span class="author">{{author}}</span>
      <span class="date">{{dateYMDHMM}}</span>
    </section>
    <section class="content">
      <p>{{content}}</p>
    </section>
  </div>
</template>

<script>
import * as utils from '../../utils/utils.js'
export default {
  props: {
    id: Number,
    postId: Number,
    author: String,
    authorAvator: String,
    date: String,
    content: String
  },
  computed: {
    dateYMDHMM () {
      return utils.date2YMDHMM(this.date)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 0;
  }

  .info {
    .avator {
      float: left;
      margin-right: 10px;
      width: 36px;
      height: 36px;
      border-radius: 100%;
    }
    .author {
      display: block;
      font-size: 15px;
      color: #111;
    }
    .date {
      margin-top: 6px;
      display: block;
      font-size: 12px;
      color: #aaa;
    }
  }
  .content {
    margin: 16px 0 16px 46px;
    font-size: 15px;
    line-height: 1.46;
    color: #494949;
  }
</style>
