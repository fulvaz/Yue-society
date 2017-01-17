<template>
  <div class="post-editor-container">
    <header>
      <span class="title">成员列表</span>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="editor">
      <detailed-user-list :users="userDisplay"></detailed-user-list>
    </section>
    <button type="button" name="button" class="btn-load-more" @click="loadMore">点击加载更多</button>
  </div>
</template>

<script>
import DetailedUserList from '../common/DetailedUserList'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
export default {
  data () {
    return {
      page: 0,
      users: [],
      me: {}
    }
  },
  computed: {
    // 数据例子!
    userDisplay () {
      return this.users.map(e => {
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
  components: {
    'detailed-user-list': DetailedUserList
  },
  created () {
    this.openIndicator()
    api.getCircleMember(this.$route.params.id, this.page++, 10).then(e => {
      this.closeIndicator()
      this.users = utils.response2Data(e)
      return api.fetchMeInfo()
    }).then(res => {
      this.me = utils.response2Data(res)
    }).catch(e => {
      this.handleFailWithCode(e.status, e.statusText)
    })
  },
  methods: {
    close () {
      this.$router.go(-1)
    },
    loadMore () {
      api.getCircleMember(this.$route.params.id, this.page++, 10).then(e => {
        this.closeIndicator()
        this.users = this.users.concat(utils.response2Data(e))
      }).catch(e => {
        this.handleFailWithCode(e.status, e.statusText)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/index.scss';
  .post-editor-container {
    box-sizing: border-box;
    background-color: white;
  }

  header {
    border-bottom: 1px solid #F2F2F2;
    @include clearfix()
    .title {
      display: inline-block;
      padding: 14px 0;
      line-height: 17px;
      font-size: 17px;
      text-align: center;
    }

    .send-btn {
      float: left;
    }

    .close-btn {
      float: right;
    }

    .btn {
      padding: 14px 18px;
      color: #42bd56;
      line-height: 17px;
      font-size: 17px;
      border: none;
      background-color: transparent;
    }
  }

  .btn-load-more {
    width: 100%;
    padding: 1em 0;
    font-size: $description-size;
    color: $description-color;
    background: white;
    appearance: none;
  }

  .errMsg {
    @include errMsg;
  }
</style>
