<template lang="html">
  <div class="container">
    <header class="circle">
      <p>
        <img class="logo" :src="circleLogo" :alt="circleName">
        <span class="name">{{circleName}}</span>
        <span class="member">{{circleMember}} 成员</span>
      </p>
    </header>
    <section class="post">
      <h1 class="title">{{title}}</h1>
      <p class="info">
        <span class="author">{{author}}</span>
        <span class="date">{{date}}</span>
      </p>
      <p class="content">
        {{content}}
      </p>
    </section>
    <section class="replies">
      <label>回复</label>
      <ul>
        <li class="reply" v-for="reply in replies">
          <fz-reply
            :id="reply.id"
            :postId="reply.postId"
            :author="reply.author"
            :authorAvator="reply.authorAvator"
            :date="reply.date"
            :content="reply.content"
          ></fz-reply>
        </li>
      </ul>
    </section>
    <button class="new-post-btn" @click="handleClick">回复</button>
    <editor v-model="newReply"></editor>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    position: relative;
    box-sizing: border-box;
    padding: 0 18px;
    padding-bottom: 48px;
  }

  header {
    height: 25px;
    padding: 9px 0;
    border-bottom: 1px solid #e3e3e3;
    line-height: 24px;
    font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;

    p {
      margin: 0;
    }

    .logo {
      float: left;
      margin-right: 10px;
      width: 24px;
      height: 24px;
      vertical-align: center;
    }
    .name {
      display: inline-block;
      height: 24px;
      color: #42bd56;
      font-size: 15px;
    }
    .member {
      display: inline-block;
      height: 24px;
      font-size: 15px;
      color: #b4b4b4;
    }
  }
  .post {
    font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
    .title {
      margin: 30px 0 10px 0;
      font-size: 24px;
    }
    .info {
      margin-bottom: 30px;
      .author {
        color: #494949;
        font-size: 15px;
        margin-right: 5px;
      }
      .date {
        color: #ccc;
        font-size: 15px;
      }
    }
    .content {
      font-size: 18px;
      line-height: 30px;
      color: #494949;
    }
  }
  .replies {
    label {
      display: block;
      font-size: 15px;
      margin-bottom: 15px;
      color: #aaa;
    }
    ul {
      margin: 0;
      padding: 0;
    }
    .reply {
      list-style: none;
    }
  }

  .new-post-btn {
    position: fixed;
    left: 0;
    bottom: 53px;
    width: 100%;
    height: 48px;
    border: none;
    color: #a4a4a4;
    background-color: white;
    border-top: 1px solid #e3e3e3;
  }
</style>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import Reply from './Reply'
import Editor from './ReplyEditor'

export default {
  components: {
    'fz-reply': Reply,
    'editor': Editor
  },
  data () {
    return {
      id: 0,
      circleId: 0,
      type: '',
      author: '',
      authorAvator: '',
      date: '',
      title: '',
      content: '',
      replies: [],
      circleName: '',
      circleMember: 0,
      circleLogo: '',
      newReply: {}
    }
  },
  created () {
    api.fetchPost(this.$route.params['id']).then(res => {
      this.id = res.id
      this.circleId = res.circleId
      this.type = res.type
      this.author = res.author
      this.authorAvator = res.authorAvator
      this.date = utils.Date2YMD(res.date)
      this.title = res.title
      this.content = res.content
      this.replies = res.replies
      return api.fetchCircle(this.circleId)
    }).then(res => {
      this.circleName = res.name
      this.circleMember = res.memberNum
      this.circleLogo = res.logo
    }).catch(res => {
      console.error('[Post]: ' + res)
    })
  },
  watch: {
    newReply () {
      this.replies.push(this.newReply)
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      Editor.open()
      // MessageBox.prompt('请输入你的回复').then(val => {
      //   let date = new Date()
      //   let reply = {
      //     // id: Number,
      //     uid: this.$store.state.MeState.uid,
      //     postId: parseInt(this.$route.params.id),
      //     content: val.value,
      //     date
      //   }
      //   this.openIndicator()
      //   api.replyPost(this.id, reply).then(response => {
      //     this.handleSuccess('REPLY_POST_SUCCESS')
      //     let replyDisplay = {
      //       author: this.$store.state.MeState.nickname,
      //       authorAvator: this.$store.state.MeState.avatar,
      //       date: utils.date2YMDHMM(date),
      //       content: val.value
      //     }
      //     this.replies.push(replyDisplay)
      //   }).catch(response => {
      //     this.handleFail('REPLY_POST_FAIL')
      //   })
      // })
    }
  }
}
</script>
