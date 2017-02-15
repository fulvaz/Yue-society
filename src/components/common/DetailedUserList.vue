<template lang="html">
  <ul class="list">
      <li v-for="item in users" class="user-cell">
        <router-link :to="`/users/${item.uid}`">
          <list-user-detailed
            :uid="item.uid"
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
            :income="item.income"
            :school="item.school"
            :house="item.house"
            :me="me"
            :car="item.car"
            :birthplace="item.birthplace"
            >
          </list-user-detailed>
        </router-link>
      </li>
  </ul>
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
    'list-user-detailed': DetailedListItem
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
  .list {
    // background-color: red;
  }
  .user-cell {
      padding: $list-padding $horizontal-margin;
      background-color: white;
      margin: 0 0;
      margin-bottom: 5px;
      border-top: 1px solid $list-border-color;
      border-bottom: 1px solid $list-border-color;
  }
</style>
