<template lang="html">
  <div class="circle-search-container">
    <search-bar @search="handleSearch" v-model="query"></search-bar>
    <circle-list :circle="resultDisplay"></circle-list>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import circleList from '../common/DetailedCircleList'
import searchBar from '../common/SearchBar'
export default {
  components: {
    'search-bar': searchBar,
    'circle-list': circleList
  },
  data () {
    return {
      result: [],
      query: ''
    }
  },
  computed: {
    resultDisplay () {
      return this.result.map(e => {
        let tags = e.tags
        if (e.ifHot && tags.indexOf('热门圈子') === -1) tags.push('热门圈子')
        let obj = {
          id: e.id,
          name: e.name,
          subtitle: `${e.location} / ${e.category}`,
          logo: e.logo,
          intro: e.introduction,
          tags: tags
        }
        return obj
      })
    }
  },
  methods: {
    handleSearch (query) {
      this.openIndicator()
      api.searchCircles({query}).then(res => {
        this.closeIndicator()
        let data = utils.response2Data(res)
        console.log(data)
        this.result = data
        if (data.length === 0) {
          this.toast(this.$text.SEARCH_EMPTY)
        }
      }).catch(e => {
        this.handleFailWithCode(e.status, e.statusText)
      })
    }
  }
}
</script>

<style lang="css">
</style>
