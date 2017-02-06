<template lang="html">
  <div class="search-bar-wrapper">
    <input type="text" class="search-bar" v-model="query" @keyup.enter="handleSearch" placeholder="搜索">
    <fa-icon class="fa-icon" name="search" @click.native="handleSearch"></fa-icon>
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
    background-color: rgb(217, 217, 217);
  }

  .search-bar {
    padding: 4px 6px 4px 6px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;
  }

  .fa-icon {
    position: absolute;
    right: 15px;
    top: 10px;
    color: rgb(217, 217, 217);
    width: 25px;
    height: 25px;
    font-size: 2em;
  }
</style>
