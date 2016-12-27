<template lang="html">
  <div class="container">
    <div class="result">
      <list :title="'Tag: ' + query">
        <li v-for="subject in result" class="subject">
          <router-link :to="'/circles/' + subject.id">
            <list-item :logo="subject.logo" :content-title="subject.name" :content-subtitle="less(subject.introduction) || subject.location || subject.memberNum + '人'"></list-item>
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
      result: [],
      query: ''
    }
  },
  created () {
    this.query = this.$route.params.tag
    api.fetchCircleByTag(this.$route.params.tag).then(response => {
      // 我觉得这个页面不会有太多动态交互，直接传给result也不会有什么问题
      this.result = utils.response2Data(response)
      // mock server 会带id，不影响生产服务器
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
  @import '../../assets/util.scss';
  a {
    @include reseta(#000);
  }

  .subject {
    padding: 10px 0px;
    border-bottom: 1px solid rgb(242, 242, 242);

  }
</style>
