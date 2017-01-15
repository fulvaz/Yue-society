<template lang="html">
  <list class="recommend">
      <li v-for="item in uDisplay" class="recommend">
        <router-link :to="`/circles/${item.id}`">
          <list-item-detailed
            :name="item.name"
            :subtitle="item.subtitle"
            :logo="item.logo"
            :tags="item.tags"
            :intro="item.intro"
            :sex="item.sex"
            >
          </list-item-detailed>
        </router-link>
      </li>
  </list>
</template>

<script>
import * as api from '../api/index.js'
import * as utils from '../utils/utils.js'
import List from './common/List'
import DetailedListItem from './common/DetailedListItem'
export default {
  data () {
    return {
      users: [],
      me: {}
    }
  },
  created () {
    api.fetchUserRecommend().then(res => {
      this.users = res
    })
    api.fetchMeInfo().then(res => {
      this.me = utils.response2Data(res)
    })
  },
  computed: {
    uDisplay () {
      return this.users.map(e => {
        let tags = []
        if (e.age === this.me.age) tags.push('与我同年')
        if (parseInt(e.income.split('-')[0]) > 10) tags.push('高收入')
        if (e.school === this.me.school) tags.push('校友')
        if (e.house === '已购房') tags.push('有房')
        if (e.car === '有') tags.push('有车')
        if (e.birthplace === this.me.birthplace) tags.push('同乡')
        let obj = {
          id: e.uid,
          name: e.nickname,
          sex: e.sex,
          subtitle: `${e.livingplace} / ${e.height}厘米 / ${e.age}岁`,
          logo: e.avatar,
          intro: e.introduction,
          tags: tags
        }
        return obj
      })
    }
  },
  components: {
    'list': List,
    'list-item-detailed': DetailedListItem
  }
}
</script>

<style lang="scss">
</style>
