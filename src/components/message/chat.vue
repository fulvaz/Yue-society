<template lang="html">
  <div class="container">
    <div class="reply">
      <textarea type="text" name="" v-model="reply" class="text" rows="1"></textarea>
      <button class="send-btn" @click="replyMsg" :disabled="ifNull">发送</button>
    </div>
    <ul>
      <li class="msg" v-for="msg in msgs">
        <send-bubble v-if="ifFromMe(msg.from.id)" :date="date2YMDHMM(msg.date)" :content="msg.content" :from="msg.from" :to="msg.to"></send-bubble>
        <receive-bubble v-else :date="date2YMDHMM(msg.date)" :content="msg.content" :from="msg.from" :to="msg.to"></receive-bubble>
      </li>
    </ul>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import SendBubble from './send-bubble'
import ReceiveBubble from './receive-bubble'
export default {
  components: {
    'send-bubble': SendBubble,
    'receive-bubble': ReceiveBubble
  },
  data () {
    return {
      msgs: [],
      reply: ''
    }
  },
  computed: {
    ifNull () {
      return this.reply.length === 0
    }
  },
  created () {
    api.getChat(this.$route.params.uid).then(res => {
      this.msgs = utils.response2Data(res)
    }).catch(res => {
      console.error(res)
    })
  },
  methods: {
    ifFromMe (uid) {
      return this.$store.state.MeState.uid === parseInt(uid)
    },
    date2YMDHMM (date) {
      return utils.date2YMDHMM(date)
    },
    replyMsg () {
      let to = this.$route.params.uid
      let from = this.$store.state.MeState.uid
      let date = (new Date()).toString()
      let reply = {
        to,
        from,
        date,
        content: this.reply
      }
      this.openIndicator()
      api.replyMsg(to, reply).then(response => {
        this.handleSuccess('SEND_MSG_SUCCESS')
      }).catch(response => {
        this.handleFail('SEND_MSG_FAIL')
        console.error(response)
      })

      // 添加新的消息到头部 其实只用到from而已, to没用上
      this.msgs.unshift({
        content: this.reply,
        date,
        from: {
          id: from,
          nickname: this.$store.state.MeState.nickname,
          avatar: this.$store.state.MeState.avatar
        }
      })

      // 清空输入栏
      this.reply = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/util.scss';
  .container {
    background-color: #f5f5f5;
  }

  .reply {
    display: flex;
    .text {
      flex: 1;
      padding: 10px;
      border: 1px solid #eee;
    }
    .send-btn {
      border: 1px solid #eee;
    }
  }

  ul {
    margin: 0 10px;
    padding: 0 10px;
    li {
      padding: 10px 0;
      list-style: none;
      @include clearfix()
    }
  }

</style>
