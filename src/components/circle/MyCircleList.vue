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
              <mt-button size="small" type="default" class="quit-circle-button" @click.prevent="quitCircle(item.id)">退出圈子</mt-button>
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

import { Button } from 'mint-ui'
import List from '../common/List'
import DetailedListItem from '../common/DetailedListItem'
import * as api from '../../api/index.js'
export default {
  components: {
    list: List,
    'list-item-detailed': DetailedListItem,
    'mt-button': Button
  },
  props: {
    circle: Array
  },
  methods: {
    quitCircle (id) {
      this.openIndicator()
      let data = {
        uid: this.$store.state.MeState.uid,
        circleId: id,
        date: (new Date()).toString()
      }
      api.quitCircle(data).then(res => {
        // 删除页面中的圈子
        this.circle.filter(e => {
          return e.id !== id
        })
        this.handleSuccess('QUIT_CIRCLE_SUCCESS')
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
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

.quit-circle-button {
  position: relative;;
  top: 1px;
  font-size: $description-size;
  padding: 5px;
}
</style>
