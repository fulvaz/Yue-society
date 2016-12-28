<template lang="html">
  <div class="container">
    <list title="私信" class="message-list">
      <li class="message" v-for="msg in msgList" @click="resetCount(msg.uid)">
        <router-link :to="'/message/chat/' + msg.uid"><list-item :logo="msg.avatar" :content-title="msg.nickname" :content-subtitle="msg.lastMsg"></list-item></router-link>
        <mt-badge color="#fe6431" size="small" class="badge" v-if="msg.unread > 0">{{msg.unread}}</mt-badge>
      </li>
    </list>
  </div>
</template>

<script>
import List from '../common/List'
import ListItem from '../common/ListItem'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import { Badge } from 'mint-ui'
export default {
  data () {
    return {
      msgList: []
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
  created () {
    api.fetchMsgList().then(response => {
      let data = utils.response2Data(response)
      this.msgList = data
    })
  },
  methods: {
    resetCount (tuid) {
      let target = this.msgList.filter(msg => {
        return msg.uid === tuid
      })
      let uid = target[0].uid
      let unread = target[0].unread
      this.$store.dispatch('readMsg', {uid, unread})
    }
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
