<template lang="html">
  <div class="container">
    <list :title="title" class="message-list">
      <li class="message" v-for="user in users">
        <router-link :to="'/users/' + user.uid">
          <list-item :logo="user.avatar" :content-title="user.nickname" :content-subtitle="user.introduction"></list-item>
        </router-link>
      </li>
    </list>
  </div>
</template>

<script>
import List from '../common/List'
import ListItem from '../common/ListItem'
// import * as api from '../../api/index.js'
// import * as utils from '../../utils/utils.js'
import { Badge } from 'mint-ui'
export default {
  props: {
    title: String,
    users: Array
  },
  data () {
    return {
    }
  },
  computed: {
    msgLess () {
      return this.msgList.lastMsg.slice(0, 40)
    }
  },
  components: {
    'list': List,
    'list-item': ListItem,
    'mt-badge': Badge
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "../../assets/index.scss";
  .message {
    position: relative;
    padding: $list-padding 0;
    border-bottom: 1px solid #dfdfdf;
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 35px;
  }
</style>
