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
            <mt-button size="small" type="default" class="quit-circle-button" @click.prevent="joinCircle(item.id)">加入圈子</mt-button>
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
import * as api from '../../api/index.js'
import List from './List'
import DetailedListItem from './DetailedListItem'
import { Button, MessageBox } from 'mint-ui'
export default {
  components: {
    list: List,
    'list-item-detailed': DetailedListItem,
    'mt-button': Button,
    'message-box': MessageBox
  },
  props: {
    circle: Array
  },
  methods: {
    joinCircle (circleId) {
      MessageBox.prompt(' ', '请输入申请加入圈子原因').then(({value, action}) => {
        this.openIndicator()
        let apply = {
          uid: this.$store.state.MeState.uid,
          circleId: parseInt(circleId),
          content: value,
          date: (new Date()).toString()
        }
        api.joinCircle(apply).then(response => {
          let circleId = parseInt(this.$route.params['id'])
          this.$store.dispatch('applyCircle', circleId)
          this.handleSuccess('APPLY_CIRCLE_SUCCESS')
        }).catch(response => {
          this.handleAllFail(response)
        })
      }).catch(e => {})
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
