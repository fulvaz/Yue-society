<template lang="html">
  <div class="search-bar-wrapper">
    <input type="text" class="search-bar" v-model="query" @keyup.enter="handleSearch" placeholder="搜索">
    <span class="icon-search">
      <fa-icon class="fa-icon" name="search"></fa-icon>
    </span>
  </div>
</template>

<script>
import 'vue-awesome/icons/search'
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: ''
    }
  },
  components: {
  },
  methods: {
    handleSearch () {
      this.$emit('search', this.query)
    }
  },
  created () {
    this.query = this.value
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .search-bar-wrapper {
    position: relative;
    height: 44px;
    box-sizing: border-box;
    padding: 8px 10px 8px 10px;
    background-color: $global-background-color;
  }

  .search-bar {
    padding: 4px 6px 4px 6px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
  }

  .icon-search {
    position: absolute;
    right: 0;
    color: $global-background-color;
  }

  .fa-icon {
    width: 25px;
    height: 25px;
    font-size: 2em;
  }
</style>
