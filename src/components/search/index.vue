<template lang="html">
  <div class="container">
    <search-bar></search-bar>
    <list v-for="module in Object.keys(tags)" :title="module" class="tag-module">
      <list-tags :tags="tags[module]"></list-tags>
    </list>
  </div>
</template>

<script>
import SearchBar from './SearchBar'
import ListTags from '../common/ListTags'
import List from '../common/List'
import * as api from '../../api/index.js'
export default {
  data () {
    return {
      tags: {}
    }
  },
  components: {
    'search-bar': SearchBar,
    'list-tags': ListTags,
    'list': List
  },
  created () {
    api.fetchSearchTags().then(response => {
      this.tags = response
    }).catch(response => {
      console.error(response)
    })
  }
}
</script>

<style lang="scss" scoped>
  .tag-module {
    padding-bottom: 15px;
  }
</style>
