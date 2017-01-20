<template>
  <div class="post-editor-container">
    <header>
      <span class="title">成员列表</span>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="main">
      <detailed-user-list :users="users" :me="me"></detailed-user-list>
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
      this.openIndicator()
      api.getCircleMember(this.$route.params.id, this.page++, 10).then(e => {
        this.closeIndicator()
        this.users = this.users.concat(utils.response2Data(e))
        if (utils.response2Data(e).length === 0) this.toast('没有新数据')
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

  .main {
    margin: 0 $horizontal-margin;
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
