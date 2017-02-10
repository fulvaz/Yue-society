<template>
  <div class="container">
    <div class="btn-fixed">
      <button class="btn-post" v-if="ifApplied" disabled>已申请</button>
      <button class="btn-post" v-else-if="!ifJoin" @click="joinCircle">加入</button>
      <button class="btn-post" v-else-if="tabActive==='话题'" @click="newPost">发帖</button>
      <button class="btn-post" v-else-if="tabActive==='活动'" @click="newAct">发布</button>
    </div>
    <header>
      <div class="container">
        <h1 class="circle-name">{{circleName}}</h1>
        <div class="btn-group">
          <button class="btn-post" @click="openMemberList">成员</button>
        </div>
      </div>
    </header>
    <section class="main">
      <nav-bar v-model="tabActive" class="navbar">
        <tab-item id="动态" class="navbar-item">动态</tab-item>
        <tab-item id="活动" class="navbar-item">活动</tab-item>
        <tab-item id="话题" class="navbar-item">话题</tab-item>
      </nav-bar>

      <tab-container v-model="tabActive">

        <tab-container-item id="动态" class="post-container" >
          <moment v-model="moments">
          </moment>
          <load-more-btn @click="fetchMoments"></load-more-btn>
        </tab-container-item>

        <!-- 活动的Container -->
        <tab-container-item id="活动" class="post-container" >
          <!-- <router-link v-for="act in activities" :to="`/activities/${act.id}`" class="post">
            <post-cell :avatar="act.logo" :title="act.title" :date="dateFormat(act.date)" :author="act.location"></post-cell>
          </router-link> -->
          <activity :activities="activities"></activity>
          <load-more-btn @click="fetchActivities" ></load-more-btn>
        </tab-container-item>

        <tab-container-item id="话题" class="post-container" >
          <router-link v-for="act in posts" :to="`/posts/${act.id}`" class="post">
            <post-cell :avatar="act.authorAvator" :title="act.title" :date="dateFormat(act.date)" :author="act.author"></post-cell>
          </router-link>
          <load-more-btn @click="fetchPosts" ></load-more-btn>
        </tab-container-item>

      </tab-container>
    </section>
    <member-list :id="_cid" :memberNum="memberNum"></member-list>
  </div>
</template>

<script>
  // import Config from '../../config/setting'
  import { TabContainer, TabContainerItem, Navbar, TabItem, MessageBox } from 'mint-ui'
  import Moment from './Moment'
  import Activity from './Activity'
  import PostCell from '../common/PostCell'
  import dateformat from 'dateformat'
  import * as api from '../../api/index.js'
  import * as utils from '../../utils/utils.js'
  import LoadMoreBtn from '../common/buttons/LoadMore'
  import MemberList from './MemberList'
  import Editor from '../common/editor/main.js'
  // import { mapState } from 'vuex'

  export default {
    props: {
      circleId: {
        type: String,
        default: 0
      }
    },
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
        momentPage: 0,
        momentNew: '',
        activities: [],
        members: [],
        moments: []
      }
    },
    components: {
      'tab-container': TabContainer,
      'tab-container-item': TabContainerItem,
      'post-cell': PostCell,
      'nav-bar': Navbar,
      'tab-item': TabItem,
      // 'moment-editor': Editor,
      'moment': Moment,
      // 'join-msg-edior': JoinMsgEditor,
      'load-more-btn': LoadMoreBtn,
      'activity': Activity,
      'member-list': MemberList
    },
    created () {
      this.openIndicator()
      Promise.all([
        api.getCircleInfo(this._cid),
        api.getCircleMoments(this._cid, this.momentPage++, 10),
        api.getCircleActivity(this._cid, this.actPage++, 10),
        api.getCirclePost(this._cid, this.postPage++, 10),
        api.wxAuth(['chooseImage', 'uploadImage', 'previewImage'])
      ]).then(result => {
        this.closeIndicator()
        let remoteData = utils.response2Data(result[0])
        this.circleName = remoteData.name
        this.news = remoteData.news
        this.postCategory = remoteData.postCategory
        this.memberNum = remoteData.memberNum
        this.CService = remoteData.CServiceId

        remoteData = utils.response2Data(result[1])
        this.moments = remoteData.map(e => {
          e.date = utils.date2YMDHMM(e.date)
          return e
        })
        this.activities = utils.response2Data(result[2])
        this.posts = utils.response2Data(result[3])
        // this.tabActive = this.postCategory[Object.keys(this.postCategory)[0]] // 导航页切换到第一页
      }).catch(response => {
        this.closeIndicator()
        this.handleFatalErr()
        console.error(response)
      })
      this.tabActive = '动态' // 导航页切换到第一页
    },
    computed: {
      // postsWithCategory () {
      //   // 整理posts以放进tab里面
      //   let postsWithCategory = {}
      //   Object.keys(this.postCategory).forEach((key) => {
      //     let type = this.postCategory[key]
      //     postsWithCategory[type] = this.posts.filter((post) => {
      //       return type === post.type
      //     })
      //   })
      //   return postsWithCategory
      // },
      _cid () {
        let result = this.$route.params.id || this.circleId
        return result
      },
      ifJoin () {
        return this.$store.state.MeState.joinedCircles.indexOf(parseInt(this._cid)) !== -1
      },
      ifApplied () {
        return this.$store.state.MeState.appliedCircles.indexOf(parseInt(this._cid)) !== -1
      }
    },
    watch: {
      momentNew () {
        this.moments.unshift(this.momentNew)
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(window.location.href)
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
        // this.$router.push({
        //   path: 'member',
        //   append: true,
        //   params: {id: this._cid}
        // })
        MemberList.open()
      },
      buyCircle () {
        this.$router.push({
          path: '/me/buyCircle',
          params: {
            id: this._cid
          }
        })
      },
      newPost () {
        Editor.open({
          head: '发布话题'
        }).then(res => {
          let data = {
            uid: parseInt(this.$store.state.MeState.uid),
            circleId: parseInt(this._cid),
            title: res.contentTitle,
            content: res.content,
            imgServerIds: res.imgs,
            date: +new Date()
          }
          this.openIndicator()
          api.newPost(data).then(res => {
            Editor.close()
            Editor.clearAllData()
            this.closeIndicator()
            this.toast(this.$text.NEW_POST_SUCCESS)
          }).catch(res => {
            this.closeIndicator()
            this.toast(this.$text.NEW_POST_FAIL)
          })
        })
      },
      newAct () {
        Editor.open({
          head: '发布活动'
        }).then(res => {
          let data = {
            uid: parseInt(this.$store.state.MeState.uid),
            circleId: parseInt(this._cid),
            title: res.contentTitle,
            content: res.content,
            imgServerIds: res.imgs,
            date: +new Date()
          }
          this.openIndicator()
          api.newActivity(data).then(res => {
            Editor.close()
            Editor.clearAllData()
            this.closeIndicator()
            this.toast(this.$text.NEW_ACT_SUCCESS)
          }).catch(res => {
            this.closeIndicator()
            this.toast(this.$text.NEW_ACT_FAIL)
          })
        })
      },
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
      fetchPosts () {
        this.openIndicator()
        api.getCirclePost(this._cid, this.postPage++, 10).then(res => {
          this.closeIndicator()
          let remoteData = utils.response2Data(res)
          this.posts = this.posts.concat(remoteData)
        }).catch(res => {
          this.handleAllFail(res)
        })
      },
      fetchMoments () {
        this.openIndicator()
        api.getCircleMoments(this._cid, this.momentPage++, 10).then(res => {
          this.closeIndicator()
          let remoteData = utils.response2Data(res)
          if (remoteData.length === 0) {
            this.toast('没有新数据了')
          }
          this.moments = this.moments.concat(remoteData.map(e => {
            e.date = utils.date2YMDHMM(e.date)
            return e
          }))
        }).catch(res => {
          this.handleAllFail(res)
        })
      },
      fetchActivities () {
        this.openIndicator()
        api.getCircleActivity(this._cid, this.actPage++, 10).then(res => {
          this.closeIndicator()
          let remoteData = utils.response2Data(res)
          if (remoteData.length === 0) {
            this.toast('没有新数据了')
          }
          this.activities = this.activities.concat(remoteData)
        }).catch(res => {
          this.handleAllFail(res)
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
