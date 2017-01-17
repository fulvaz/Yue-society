<template lang="html">
  <list class="recommend">
      <li v-for="item in circle" class="recommend">
        <router-link :to="`/circles/${item.id}`">
          <list-item-detailed
            :name="item.name"
            :subtitle="item.subtitle"
            :logo="item.logo"
            :tags="item.tags"
            :intro="item.intro"
            >
          </list-item-detailed>
        </router-link>
      </li>
  </list>
</template>

<script>
// 输入数据参考
// myCDisplay () {
//   return this.myCircles.map(e => {
//     let tags = e.tags
//     let obj = {
//       id: e.id,
//       name: e.name,
//       subtitle: `${e.location} / ${e.category}`,
//       logo: e.logo,
//       intro: e.introduction,
//       tags: tags
//     }
//     return obj
//   })
// }

import List from './List'
import DetailedListItem from './DetailedListItem'
export default {
  components: {
    list: List,
    'list-item-detailed': DetailedListItem
  },
  props: {
    circle: Array
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
.recommend {
    @include list-border();
    padding: $list-padding 0 ;
    background-color: white;
    margin: 0px 0;
    box-shadow: 1px black;
}
</style>
