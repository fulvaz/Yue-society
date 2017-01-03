<template lang="html">
  <div class="container">
    <list :title="title" class="message-list">
      <li class="message" v-for="user in users" @click="resetCount(user.uid)">
        <router-link :to="'/users/' + user.uid"><list-item :logo="user.avatar" :content-title="user.nickname" :content-subtitle="user.introduction"></list-item></router-link>
        <mt-badge color="#fe6431" size="small" class="badge" v-if="user.unread > 0">{{user.unread}}</mt-badge>
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

<style lang="css">
  .message {
    position: relative;
    padding: 15px 0;
    border-bottom: 1px solid #dfdfdf;
  }

  .badge {
    position: absolute;
    top: 12px;
    left: 35px;
  }
</style>
