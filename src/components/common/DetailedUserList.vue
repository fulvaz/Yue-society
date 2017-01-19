<template lang="html">
  <list class="recommend">
      <li v-for="item in users" class="recommend">
        <router-link :to="`/users/${item.id}`">
          <list-item-detailed
            :nickname="item.nickname"
            :avatar="item.avatar"
            :livingplace="item.livingplace"
            :weight="item.weight"
            :height="item.height"
            :age="item.age"
            :focused="item.focused"
            :photoNum="item.photoNum"
            :sex="item.sex"
            :intro="item.introduction"
            :me="me"
            >
          </list-item-detailed>
        </router-link>
      </li>
  </list>
</template>

<script>
// import * as api from '../../api/index.js'
// import * as utils from '../../utils/utils.js'
import List from './List'
import DetailedListItem from './DetailedUserListItem'
export default {
  data () {
    return {
    }
  },
  props: {
    users: Array,
    me: Object
  },
  computed: {
    // // 数据例子! 注意!!!!! 使用时依赖me接口的数据
    // uDisplay () {
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
  components: {
    'list': List,
    'list-item-detailed': DetailedListItem
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
  .recommend {
      @include list-border();
      padding: $list-padding 0;
      background-color: white;
      margin: 0px 0;
      box-shadow: 1px black;
  }
</style>
