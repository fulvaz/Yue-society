<template>
  <div class="container">
    <header >
      <div class="container">
        <h1 class="circle-name">{{circleName}}</h1>
        <p class="news">{{news}}</p>
        <div class="btn-group">
          <button class="btn-post">发言</button>
          <button class="btn-service">联系红娘</button>
        </div>
      </div>
    </header>
    <section class="main">
      <nav-bar v-model="tabActive" class="navbar">
        <tab-item :id="category" v-for="category in postCategory" class="navbar-item">{{category}}</tab-item>
      </nav-bar>

      <tab-container v-model="tabActive" v-infinite-scroll="fetchPosts" infinite-scroll-distance="10" infinite-scroll-disabled="loadPostBusy">
        <tab-container-item v-for="category in postCategory" :id="category" class="post-container" >
          <router-link v-for="post in postsWithCategory[category]" :to="`/posts/${post.id}`" class="post">
            <post-cell :avator="post.authorAvator" :title="post.title" :date="dateFormat(post.date)" :author="post.author"></post-cell>
          </router-link>
        </tab-container-item>
      </tab-container>
    </section>
  </div>
</template>

<script>
  import Config from '../../config/setting'
  import { TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui'
  import PostCell from '../common/PostCell'
  import dateformat from 'dateformat'

  export default {
    data () {
      return {
        'circleName': '',
        'news': '',
        'postCategory': Object,
        'memberNum': '',
        'CServices': [],
        'tabActive': '',
        posts: [],
        loadPostBusy: false
      }
    },
    components: {
      'tab-container': TabContainer,
      'tab-container-item': TabContainerItem,
      'post-cell': PostCell,
      'nav-bar': Navbar,
      'tab-item': TabItem
    },
    created () {
      this.fetchPosts()
      this.fetchCircleInfo()
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
      }
    },
    methods: {
      dateFormat (value) {
        return dateformat(value, 'mm-dd hh:MM')
      },
      fetchCircleInfo () {
        this.$http.get(`${Config.circlesApi}/${this.$route.params['id']}`).then((response) => {
          let remoteData
          // 有些服务器返回字符串, 有些则是JSON, 需要判断
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          ;[this.circleName, this.news, this.postCategory, this.memberNum, this.CService] = [remoteData.name, remoteData.news, remoteData.postCategory, remoteData.memberNum, remoteData.CServiceId]
          this.tabActive = this.postCategory[Object.keys(this.postCategory)[0]] // 导航页切换到第一页
        })
      },
      'fetchPosts': (function () {
        let page = 0
        const postPerPage = 20
        return function inner () {
          // this.loadPostBudy = true
          page++
          this.$http.get(`${Config.circlesApi}/${this.$route.params['id']}/posts?_page=${page}&_limit=${postPerPage}`).then((response) => {
            this.loadPostBudy = true
            let remoteData
            if (typeof response.body === 'object') remoteData = response.body
            else remoteData = JSON.parse(response.body)
            this.posts = this.posts.concat(remoteData)
          })
        }
      })()
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
      margin: 0 18px;
      padding: 35px 0;
      text-align: center;
      color: white;

      .circle-name {
        margin: 0;
        font-size: 24px;
      }

      .news {
        margin: 15px 0 20px 0;
        font-size: 12px;
        text-align: left;
      }

      .btn-group {
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
      .navbar-item {
        flex: 1 1 200px;
        padding: 17px 0;
        display: block;
      }

      .is-selected {
        color: #C52C24;
        border-bottom: 3px solid #C52C24;
      }

      @include clearfix()
    }

    .post-container {
      margin-left: 10px;
    }

    .post {
      border-bottom: 1px solid #ECECEC;

    }
  }
</style>
