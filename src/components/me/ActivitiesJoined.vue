<template lang="html">
  <list :title="'已加入活动'" class="circle-my">
      <li v-for="activity in activities">
        <router-link :to="`/activities/${activity.id}`">
          <list-item
            :content-title="activity.name"
            :content-subtitle="activity.durationend + ' 截止'"
            :logo="activity.logo">
          </list-item>
        </router-link>
      </li>
  </list>
</template>

<script>
import List from '../common/List'
import ListItem from '../common/ListItem'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'list': List,
    'list-item': ListItem
  },
  data () {
    return {
      activities: []
    }
  },
  created () {
    api.getActivitiesJoined().then(res => {
      this.activities = utils.response2Data(res)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  li {
    position: relative;
    padding: $list-padding 0;
    border-bottom: 1px solid #dfdfdf;
  }
</style>
