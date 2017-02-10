<template>
  <div class="post-editor-container" v-show="show">
    <header>
      <span class="title">成员列表</span>
      <span class="memberNum">{{memberNum}} 人</span>
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
let that
export default {
  props: {
    circleId: String,
    memberNum: Number
  },
  data () {
    return {
      page: 0,
      users: [],
      me: {},
      show: false
    }
  },
  computed: {
  },
  components: {
    'detailed-user-list': DetailedUserList
  },
  created () {
    this.openIndicator()
    that = this
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
      this.show = false
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
  },
  open () {
    console.log(that.show)
    that.show = true
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/index.scss';
  .post-editor-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: white;
  }

  header {
    border-bottom: 1px solid #F2F2F2;
    @include clearfix()
    display: flex;
    justify-content: space-between;
    .title {
      display: inline-block;
      padding: 14px $horizontal-margin;
      line-height: 17px;
      font-size: 17px;
      text-align: center;
    }

    .memberNum {
      padding: 14px 0;
      text-align: center;
      flex: 1;
    }

    .send-btn {
      float: left;
      z-index:9999
    }

    .close-btn {
      float: right;
    }

    .btn {
      padding: 14px $horizontal-margin;
      color: #42bd56;
      line-height: 17px;
      font-size: 17px;
      border: none;
      background-color: transparent;
    }
  }

  .main {
    // margin: 0 $horizontal-margin;
    background-color: $global-background-color;
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
