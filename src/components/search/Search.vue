<template lang="html">
  <div class="circle-search-container">
    <search-bar @search="handleSearch" v-model="query"></search-bar>
    <user-list :users="resultDisplay"></user-list>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import UserList from '../common/DetailedUserList'
import searchBar from '../common/SearchBar'
export default {
  components: {
    'search-bar': searchBar,
    'user-list': UserList
  },
  data () {
    return {
      users: [],
      query: '',
      me: ''
    }
  },
  created () {
    api.fetchMeInfo().then(res => {
      this.me = utils.response2Data(res)
    })
  },
  computed: {
    resultDisplay () {
      return this.users.map(e => {
        let tags = []
        if (e.age && e.age === this.me.age) tags.push('与我同年')
        if (e.income && parseInt(e.income.split('-')[0]) > 10) tags.push('高收入')
        if (e.school && e.school === this.me.school) tags.push('校友')
        if (e.house && e.house === '已购房') tags.push('有房')
        if (e.car === '有') tags.push('有车')
        if (e.birthplace === this.me.birthplace) tags.push('同乡')
        let obj = {
          id: e.uid,
          name: e.nickname,
          sex: e.sex,
          subtitle: `${e.livingplace} / ${e.height}厘米 / ${e.age}岁`,
          logo: e.avatar,
          intro: e.introduction || '',
          tags: tags
        }
        return obj
      })
    }
  },
  methods: {
    handleSearch (query) {
      let data = {query}
      this.openIndicator()
      api.searchUsers(data).then(res => {
        this.closeIndicator()
        this.users = utils.response2Data(res)
      }).catch(e => {
        this.handleFailWithCode(e.status, e.statusText)
      })
    }
  }
}
</script>

<style lang="css">
</style>
