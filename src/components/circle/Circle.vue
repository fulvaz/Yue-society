<template>
  <div class="container">
    <div class="btn-fixed">
      <button class="btn-post" v-if="!ifJoin" @click="joinCircle">加入</button>
      <!-- <button class="btn-post" v-if="!ifJoin" @click="joinCircleWithoutAuth">加入</button> -->
      <button class="btn-post" v-else-if="ifApplied" disabled>已申请</button>
      <!-- 买发帖 -->
      <!-- <button class="btn-post" v-else-if="!auth" @click="buyCircle">购买发帖</button> -->
      <button class="btn-post" v-else @click="newPost">发言</button>
    </div>
    <header>
      <div class="container">
        <h1 class="circle-name">{{circleName}}</h1>
        <!-- <p class="news">{{news}}</p> -->
        <!-- <div class="btn-fixed">
          <button class="btn-post" v-if="!ifJoin" @click="joinCircle">加入圈子</button>
          <button class="btn-post" v-else-if="ifApplied">已申请</button>
          <button class="btn-post" v-else-if="!auth" @click="buyCircle">购买发帖权利</button>
          <button class="btn-post" v-else @click="newPost">发言</button>
        </div> -->
        <div class="btn-group">
          <button class="btn-post" @click="openMemberList">成员</button>
        </div>
      </div>
    </header>
    <section class="main">
      <nav-bar v-model="tabActive" class="navbar">
        <tab-item id="活动" class="navbar-item">活动</tab-item>
        <tab-item id="动态" class="navbar-item">动态</tab-item>
      </nav-bar>

      <tab-container v-model="tabActive">
        <!-- 不同选项的Container -->
        <!-- <tab-container-item v-for="category in postCategory" :id="category" class="post-container" >
          <router-link v-for="post in postsWithCategory[category]" :to="`/posts/${post.id}`" class="post">
            <post-cell :avatar="post.authorAvator" :title="post.title" :date="dateFormat(post.date)" :author="post.author"></post-cell>
          </router-link>
          <button type="button" name="more" class="btn-more" @click="fetchPosts" >点击更多</button>
        </tab-container-item> -->

        <!-- 活动的Container -->
        <tab-container-item id="动态" class="post-container" >
          <!-- <moment>

          </moment> -->
        </tab-container-item>
        <tab-container-item id="活动" class="post-container" >
          <router-link v-for="act in activities" :to="`/activities/${act.id}`" class="post">
            <post-cell :avatar="act.logo" :title="act.title" :date="dateFormat(act.date)" :author="act.location"></post-cell>
          </router-link>
        </tab-container-item>
      </tab-container>
    </section>
    <fz-editor v-model="postNew" :category="postCategory"></fz-editor>
    <join-msg-edior v-model="msgJoin"></join-msg-edior>
  </div>
</template>

<script>
  // import Config from '../../config/setting'
  import { TabContainer, TabContainerItem, Navbar, TabItem, Loadmore } from 'mint-ui'
  import Moment from './Moment'
  import MomentCell from './MomentCell'
  import JoinMsgEditor from './JoinMsgEditor'
  import PostCell from '../common/PostCell'
  import dateformat from 'dateformat'
  import * as api from '../../api/index.js'
  import Editor from '../posts/PostEditor'
  import * as utils from '../../utils/utils.js'
  // import { mapState } from 'vuex'

  export default {
    data () {
      return {
        'auth': false,
        'circleName': '',
        'news': '',
        'postCategory': {},
        'memberNum': '',
        'CServices': [],
        'tabActive': '',
        posts: [],
        msgJoin: '',
        postPage: 0,
        actPage: 0,
        postNew: '',
        activities: [],
        members: []
      }
    },
    components: {
      'mt-loadmore': Loadmore,
      'tab-container': TabContainer,
      'tab-container-item': TabContainerItem,
      'post-cell': PostCell,
      'nav-bar': Navbar,
      'tab-item': TabItem,
      'fz-editor': Editor,
      'moment': Moment,
      'moment-cell': MomentCell,
      'join-msg-edior': JoinMsgEditor
    },
    created () {
      api.getCircleInfo(this.$route.params.id).then(response => {
        let remoteData = utils.response2Data(response)
        this.circleName = remoteData.name
        this.news = remoteData.news
        this.postCategory = remoteData.postCategory
        this.memberNum = remoteData.memberNum
        this.CService = remoteData.CServiceId
        // this.tabActive = this.postCategory[Object.keys(this.postCategory)[0]] // 导航页切换到第一页
      }).catch(response => {
        this.handleFailWithCode(response.status, response.statusText)
        console.error(response)
      })
      this.fetchPosts()
      this.tabActive = '活动' // 导航页切换到第一页
    },
    computed: {
      postsWithCategory () {
        // 整理posts以放进tab里面
        let postsWithCategory = {}
        Object.keys(this.postCategory).forEach((key) => {
          let type = this.postCategory[key]
          postsWithCategory[type] = this.posts.filter((post) => {
            return type === post.type
          })
        })
        return postsWithCategory
      },
      ifJoin () {
        return this.$store.state.MeState.joinedCircles.indexOf(parseInt(this.$route.params.id)) !== -1
      },
      ifApplied () {
        return this.$store.state.MeState.appliedCircles.indexOf(parseInt(this.$route.params.id)) !== -1
      }
    },
    watch: {
      postNew () {
        this.posts = []
        this.postPage = 0
        this.fetchPosts()
      }
    },
    beforeRouteEnter (to, from, next) {
      api.authCircle(to.params.id).then(res => {
        next(vm => {
          vm.auth = utils.response2Data(res).right
        })
      }).catch(res => {
        next()
      })
    },
    methods: {
      openMemberList () {
        this.$router.push({
          path: 'member',
          append: true,
          params: {id: this.$route.params.id}
        })
      },
      buyCircle () {
        this.$router.push({
          path: '/me/buyCircle',
          params: {
            id: this.$route.params.id
          }
        })
      },
      newPost () {
        Editor.open()
      },
      joinCircle () {
        JoinMsgEditor.open()
      },
      joinCircleWithoutAuth () {
        let apply = {
          uid: this.$store.state.MeState.uid,
          circleId: parseInt(this.$route.params['id']),
          content: '',
          date: (new Date()).toString()
        }
        this.openIndicator()
        api.joinCircle(apply).then(response => {
          let circleId = parseInt(this.$route.params['id'])
          this.$store.dispatch('applyCircle', circleId)
          this.handleSuccess('APPLY_CIRCLE_SUCCESS')
        }).catch(response => {
          this.handleSuccess('APPLY_CIRCLE_FAIL')
        })
      },
      dateFormat (value) {
        return dateformat(value, 'mm-dd hh:MM')
      },
      // fetchCircleInfo () {
      //   this.$http.get(`${Config.circlesApi}/${this.$route.params['id']}`).then((response) => {
      //     let remoteData
      //     // 有些服务器返回字符串, 有些则是JSON, 需要判断
      //     if (typeof response.body === 'object') remoteData = response.body
      //     else remoteData = JSON.parse(response.body)
      //     ;[this.circleName, this.news, this.postCategory, this.memberNum, this.CService] = [remoteData.name, remoteData.news, remoteData.postCategory, remoteData.memberNum, remoteData.CServiceId]
      //     this.tabActive = this.postCategory[Object.keys(this.postCategory)[0]] // 导航页切换到第一页
      //   })
      // },
      fetchPosts: function () {
        this.openIndicator('加载中...')
        // 这个方案好蠢, 但是先用着
        const postPerPage = 20
        api.getCirclePost(this.$route.params.id, this.postPage++, postPerPage).then((response) => {
          let remoteData
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          if (remoteData.length === 0) {
            this.toast('已经没有新帖子了')
          }
          this.posts = this.posts.concat(remoteData)
          return api.getCircleActivity(this.$route.params.id, this.actPage++, postPerPage)
        }).then(response => {
          this.closeIndicator()
          // 数据为空
          if (response.length === 0) {
            this.toast('已经没有新帖子了')
          }

          // 处理数据
          this.activities = this.activities.concat(utils.response2Data(response))
        }).catch(response => {
          this.closeIndicator()
          console.error(response)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  a {
    @include reseta(#aaa)
  }

  header {
    width: 100%;
    background-color: rgb(44, 175, 187);

    .container {
      @include clearfix;
      padding: 0.5em $horizontal-margin;
      // margin: 0 18px;
      // padding: 35px 0;
      text-align: center;
      color: white;
      background-color: rgb(44, 175, 187);

      .circle-name {
        float: left;
        margin: 0;
        font-size: 24px;
      }

      .news {
        margin: 15px 0 20px 0;
        font-size: 12px;
        text-align: center;
      }

      .btn-group {
        float: right;
        .disabled {
          color: #aaa;
          border: 1px solid #aaa;
        }
        button {
          border: 1px solid white;
          border-radius: 4px;
          font-size: 15px;
          color: white;
          background-color: transparent;
        }
      }
    }
  }

  .main {
    background-color: #fff;
    a {
      display: block;
    }

    .navbar {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-bottom: 3px;
      .navbar-item {
        flex: 1 1 200px;
        padding: 14px 0;
        display: block;
      }

      .is-selected {
        color: #C52C24;
        border-bottom: 3px solid #C52C24;
      }

      @include clearfix()
    }

    .post-container {
      padding: 0 $horizontal-margin;
      box-sizing: border-box;
    }

    .btn-more {
      width: 100%;
      height: 40px;
      font-size: $description-size;
      color: $description-color;
      border: none;
      background: transparent;
      border-bottom: $list-border;
    }

    .post {
      padding: $list-padding 0;
      @include list-border;
    }
  }

  .btn-fixed {
    z-index: 1;
    position: fixed;
    bottom: calc(1em + 53px);
    right: 1em;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $douban-green;
    overflow: hidden;

    .disabled {
      color: #aaa;
      border: 1px solid #aaa;
    }

    button {
      width: 100%;
      height: 100%;
      color: white;
    }
  }
</style>
