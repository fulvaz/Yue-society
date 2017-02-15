<template lang="html">
  <div class="circle-search-container">
    <div class="search-bar">
      <search-bar class="bar" @search="handleSearch" v-model="query"></search-bar>
      <!-- <el-button class="btn-filter" type="primary">筛选</el-button> -->
    </div>
    <user-list :users="users" :me="me"></user-list>
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
    this.me = this.$store.state.MeState
  },
  computed: {
    // resultDisplay () {
    //   return this.users.map(e => {
    //     let tags = []
    //     if (e.age && e.age === this.me.age) tags.push('与我同年')
    //     if (e.income && parseInt(e.income.split('-')[0]) > 10) tags.push('高收入')
    //     if (e.school && e.school === this.me.school) tags.push('校友')
    //     if (e.house && e.house === '已购房') tags.push('有房')
    //     if (e.car === '有') tags.push('有车')
    //     if (e.birthplace === this.me.birthplace) tags.push('同乡')
    //     let obj = {
    //       id: e.uid,
    //       name: e.nickname,
    //       sex: e.sex,
    //       subtitle: `${e.livingplace} / ${e.height}厘米 / ${e.age}岁`,
    //       logo: e.avatar,
    //       intro: e.introduction || '',
    //       tags: tags
    //     }
    //     return obj
    //   })
    // }
  },
  methods: {
    handleSearch (query) {
      let data = {query}
      this.openIndicator()
      api.searchUsers(data).then(res => {
        this.closeIndicator()
        let remoteData = utils.response2Data(res)
        if (remoteData.length === 0) {
          this.toast(this.$text.SEARCH_EMPTY)
        }
        this.users = remoteData
      }).catch(e => {
        this.handleAllFail(e)
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/index.scss";
  .circle-search-container {
    background-color: $global-background-color;
  }

  .search-bar {
    display: flex;
    .bar {
      flex: 1;
    }
    .btn-filter {
      // flex-basis: 20px;
      float: right;
    }
  }


</style>
