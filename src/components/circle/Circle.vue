<template>
  <div class="container">
    <div class="btn-fixed">
      <button class="btn-post" v-if="!ifJoin" @click="joinCircle">加入</button>
      <button class="btn-post" v-else-if="ifApplied" disabled>已申请</button>
      <!-- 买发帖 -->
      <button class="btn-post" v-else-if="!auth" @click="buyCircle">发言</button>
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
      </div>
    </header>
    <section class="main">
      <nav-bar v-model="tabActive" class="navbar">
        <tab-item id="活动" class="navbar-item">活动</tab-item>
        <tab-item :id="category" v-for="category in postCategory" class="navbar-item">{{category}}</tab-item>
      </nav-bar>

      <tab-container v-model="tabActive" v-infinite-scroll="fetchPosts" infinite-scroll-distance="10" infinite-scroll-disabled="loadPostBusy">
        <tab-container-item v-for="category in postCategory" :id="category" class="post-container" >
          <router-link v-for="post in postsWithCategory[category]" :to="`/posts/${post.id}`" class="post">
            <post-cell :avatar="post.authorAvator" :title="post.title" :date="dateFormat(post.date)" :author="post.author"></post-cell>
          </router-link>
        </tab-container-item>

        <tab-container-item id="活动" class="post-container" >
          <router-link v-for="act in activities" :to="`/activities/${act.id}`" class="post">
            <post-cell :avatar="act.logo" :title="act.title" :date="dateFormat(act.date)" :author="act.location"></post-cell>
          </router-link>
        </tab-container-item>
      </tab-container>
    </section>

    <fz-editor v-model="postNew"></fz-editor>
  </div>
</template>

<script>
  // import Config from '../../config/setting'
  import { TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui'
  import PostCell from '../common/PostCell'
  import dateformat from 'dateformat'
  import MessageBox from '../common/MessageBox/MessageBox.js'
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
        'postCategory': Object,
        'memberNum': '',
        'CServices': [],
        'tabActive': '',
        posts: [],
        loadPostBusy: false,
        postPage: 0,
        actPage: 0,
        postNew: '',
        activities: []
      }
    },
    components: {
      'tab-container': TabContainer,
      'tab-container-item': TabContainerItem,
      'post-cell': PostCell,
      'nav-bar': Navbar,
      'tab-item': TabItem,
      'fz-editor': Editor
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
        console.error(response)
      })
      this.fetchPosts()
      this.tabActive = '交友' // 导航页切换到第一页
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
      })
    },
    methods: {
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
        MessageBox.prompt('输入加入圈子的验证信息').then(val => {
          let apply = {
            uid: this.$store.state.MeState.uid,
            circleId: parseInt(this.$route.params['id']),
            content: val.value,
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
        // 这个方案好蠢, 但是先用着
        const postPerPage = 20
        this.loadPostBusy = true
        let post
        api.getCirclePost(this.$route.params.id, this.postPage++, postPerPage).then((response) => {
          let remoteData
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          post = remoteData
          return api.getCircleActivity(this.$route.params.id, this.actPage++, postPerPage)
        }).then(response => {
          // 处理数据
          this.posts = this.posts.concat(post)
          this.activities = this.activities.concat(utils.response2Data(response))

          // 处理懒加载问题
          if (post.length === 0) {
            window.setTimeout(e => {
              this.loadPostBusy = false
            }, 5000)
            return
          }
          this.loadPostBusy = false
        }).catch(response => {
          console.error(response)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/util.scss";
  a {
    @include reseta(#aaa)
  }

  header {
    width: 100%;
    background-color: rgb(44, 175, 187);

    .container {
      padding: 1em 0;
      // margin: 0 18px;
      // padding: 35px 0;
      text-align: center;
      color: white;
      background-color: rgb(44, 175, 187);

      .circle-name {
        margin: 0;
        font-size: 24px;
      }

      .news {
        margin: 15px 0 20px 0;
        font-size: 12px;
        text-align: center;
      }

      .btn-group {
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
