<template lang="html">
  <div class="container">
    <section class="main">
      <nav-bar v-model="active" id="navbar">
        <tab-item id="tab-recent-reg" class="navbar-item">最新注册</tab-item>
        <tab-item id="tab-recent-login" class="navbar-item">最新登录</tab-item>
        <tab-item id="tab-recommend" class="navbar-item">为你推荐</tab-item>
      </nav-bar>
      <mt-tab-container class="tab-container" v-model="active">
        <mt-tab-container-item id="tab-recent-reg">
          <detailed-user-list :users="recentRegDisplay"></detailed-user-list>
          <button type="button" name="button" class="btn-load-more" @click="loadRecentReg">点击加载更多</button>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-recent-login">
          <detailed-user-list :users="recentLoginDisplay"></detailed-user-list>
          <button type="button" name="button" class="btn-load-more" @click="loadRecentLogin">点击加载更多</button>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-recommend">
          <detailed-user-list :users="recentRegDisplay"></detailed-user-list>
          <button type="button" name="button" class="btn-load-more" @click="loadUserRecommend">点击加载更多</button>
        </mt-tab-container-item>
      </mt-tab-container>
    </section>
    <float-button>
      <button class="btn-post" @click="search">搜索</button>
    </float-button>
  </div>
</template>

<script>
import {TabContainer, TabContainerItem, Navbar, TabItem} from 'mint-ui'
import List from '../common/List'
import ListItem from '../common/ListItem'
import FloatButton from '../common/FloatButton'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import DetailedUserList from '../common/DetailedUserList'
export default {
  created () {
    Promise.all([
      api.getRecentLogin(this.recentRegPage++, 10),
      api.getRecentReg(this.recentLoginPage++, 10),
      api.getSearchRecommend(this.userRecommendPage++, 10),
      api.fetchMeInfo()
    ]).then(res => {
      this.recentLogin = utils.response2Data(res[0])
      this.recentReg = utils.response2Data(res[1])
      this.userRecommend = utils.response2Data(res[2])
      this.me = utils.response2Data(res[3])
    }).catch(res => {
      this.handleFailWithCode(res.status, res.statusText)
    })
  },
  components: {
    'nav-bar': Navbar,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem,
    'list': List,
    'list-item': ListItem,
    'tab-item': TabItem,
    'float-button': FloatButton,
    'detailed-user-list': DetailedUserList
  },
  data () {
    return {
      recentReg: [],
      recentRegPage: 0,
      recentLogin: [],
      recentLoginPage: 0,
      userRecommend: [],
      userRecommendPage: 0,
      active: 'tab-recent-reg',
      me: {}
    }
  },
  computed: {
    recentLoginDisplay () {
      return this.recentLogin.map(e => {
        let tags = []
        if (e.age && e.age === this.me.age) tags.push('与我同年')
        if (e.income && parseInt(e.income.split('-')[0]) > 10) tags.push('高收入')
        if (e.school && e.school === this.me.school) tags.push('校友')
        if (e.house && e.house === '已购房') tags.push('有房')
        if (e.car === '有') tags.push('有车')
        if (e.birthplace === this.me.birthplace) tags.push('同乡')
        let obj = {
          id: e.uid,
          name: e.nickname,
          sex: e.sex,
          subtitle: `${e.livingplace} / ${e.height}厘米 / ${e.age}岁`,
          logo: e.avatar,
          intro: e.introduction || '',
          tags: tags
        }
        return obj
      })
    },
    // 数据例子!
    recentRegDisplay () {
      return this.recentReg.map(e => {
        let tags = []
        if (e.age && e.age === this.me.age) tags.push('与我同年')
        if (e.income && parseInt(e.income.split('-')[0]) > 10) tags.push('高收入')
        if (e.school && e.school === this.me.school) tags.push('校友')
        if (e.house && e.house === '已购房') tags.push('有房')
        if (e.car === '有') tags.push('有车')
        if (e.birthplace === this.me.birthplace) tags.push('同乡')
        let obj = {
          id: e.uid,
          name: e.nickname,
          sex: e.sex,
          subtitle: `${e.livingplace} / ${e.height}厘米 / ${e.age}岁`,
          logo: e.avatar,
          intro: e.introduction || '',
          tags: tags
        }
        return obj
      })
    },
    // 数据例子!
    userRecommendDisplay () {
      return this.userRecommend.map(e => {
        let tags = []
        if (e.age && e.age === this.me.age) tags.push('与我同年')
        if (e.income && parseInt(e.income.split('-')[0]) > 10) tags.push('高收入')
        if (e.school && e.school === this.me.school) tags.push('校友')
        if (e.house && e.house === '已购房') tags.push('有房')
        if (e.car === '有') tags.push('有车')
        if (e.birthplace === this.me.birthplace) tags.push('同乡')
        let obj = {
          id: e.uid,
          name: e.nickname,
          sex: e.sex,
          subtitle: `${e.livingplace} / ${e.height}厘米 / ${e.age}岁`,
          logo: e.avatar,
          intro: e.introduction || '',
          tags: tags
        }
        return obj
      })
    }
  },
  methods: {
    search () {
      this.$router.push({
        path: '/search/users'
      })
    },
    loadRecentLogin () {
      this.openIndicator()
      api.getRecentLogin(this.recentLoginPage++, 10).then(res => {
        this.closeIndicator()
        let data = utils.response2Data(res)
        this.recentLogin = this.recentLogin.concat(data)
        if (data.length === 0) {
          let err = new Error()
          err.status = ''
          err.statusText = '没有新内容了'
          throw err
        }
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    },
    loadRecentReg () {
      this.openIndicator()
      api.getRecentReg(this.recentRegPage++, 10).then(res => {
        this.closeIndicator()
        let data = utils.response2Data(res)
        this.recentReg = this.recentReg.concat(data)
        if (data.length === 0) {
          let err = new Error()
          err.status = ''
          err.statusText = '没有新内容了'
          throw err
        }
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    },
    loadUserRecommend () {
      this.openIndicator()
      api.getSearchRecommend(this.userRecommendPage++, 10).then(res => {
        this.closeIndicator()
        let data = utils.response2Data(res)
        this.userRecommend = this.userRecommend.concat(data)
        if (data.length === 0) {
          let err = new Error()
          err.status = ''
          err.statusText = '没有新内容了'
          throw err
        }
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .tab-container {
    padding: 0 $horizontal-margin;
    background-color: white;
  }
  #navbar {
    margin-bottom: 5px; // 避免挡住下方边框
    display: flex;
    justify-content: space-around;
    text-align: center;
    .navbar-item {
      flex: 1 1 200px;
      padding: 1em 0;
      display: block;
    }
    .is-selected {
      color: $main-red;
      border-bottom: 3px solid $main-red;
    }

    @include clearfix()
  }

  .recommend {
      @include list-border();
      padding: $list-padding 0 ;
      background-color: white;
      margin: 0px 0;
      box-shadow: 1px black;
  }

  .btn-load-more {
    width: 100%;
    padding: 1em 0;
    font-size: $description-size;
    color: $description-color;
    background: white;
    appearance: none;
  }

  .btn-post {
    // background-color: $douban-green;
  }

</style>
