<template lang="html">
  <div class="container">
    <div class="search-bar-wrapper">
      <input type="text" class="search-bar" v-model="query" @keyup.enter="handleSearch" placeholder="搜索">
    </div>
    <p>{{test}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      test: ''
    }
  },
  components: {
  },
  methods: {
    handleSearch () {
      this.test = this.query
    }
  }
}
</script>

<style lang="scss">
  .search-bar-wrapper {
    height: 44px;
    box-sizing: border-box;
    padding: 8px 10px 8px 10px;
    background-color: rgb(217, 217, 217);
  }

  .search-bar {
    padding: 4px 6px 4px 6px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: none;
  }
</style>
