<template lang="html">
  <div class="container">
    <search-bar :value="query"></search-bar>
    <div class="result">
      <list v-for="module in Object.keys(result)" :title="module">
        <li v-for="subject in result[module]" class="subject">
          <router-link :to="'/' + module + '/' + subject.id">
            <list-item :logo="subject.logo" :content-title="subject.name" :content-subtitle="less(subject.introduction) || subject.location"></list-item>
          </router-link>
        </li>
      </list>
    </div>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import SearchBar from './SearchBar'
import List from '../common/List'
import ListItem from '../common/ListItem'
export default {
  components: {
    'search-bar': SearchBar,
    'list': List,
    'list-item': ListItem
  },
  data () {
    return {
      result: {},
      query: ''
    }
  },
  created () {
    this.query = this.$route.params.query
    api.search(this.$route.params.query).then(response => {
      // 我觉得这个页面不会有太多动态交互，直接传给result也不会有什么问题
      this.result = utils.response2Data(response)
      // mock server 会带id，不影响生产服务器
      if (this.result.id) delete this.result.id
    }).catch(response => {
      console.error(response)
    })
  },
  methods: {
    less (str) {
      if (!str) return str
      return str.slice(0, 50) + '...'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/index.scss';
  a {
    @include reseta(#000);
  }

  .subject {
    padding: $list-padding 0px;
    @include list-border;
  }
</style>
