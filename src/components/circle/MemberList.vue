<template lang="html">
  <div class="post-editor-container">
    <header>
      <span class="title">成员列表</span>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="editor">
      <user-list
        :users="users"
      >
      </user-list>
    </section>
  </div>
</template>

<script>
import Popup from '../common/PopupWithButton'
import UserList from '../common/UserList'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
export default {
  data () {
    return {
      page: 0,
      users: []
    }
  },
  components: {
    popup: Popup,
    'user-list': UserList
  },
  created () {
    this.openIndicator()
    api.getCircleMember(this.$route.params.id, this.page++, 0).then(e => {
      this.closeIndicator()
      this.users = utils.response2Data(e)
    }).catch(e => {
      this.handleFailWithCode(e.status, e.statusText)
    })
  },
  methods: {
    close () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/index.scss';
  .post-editor-container {
    box-sizing: border-box;
    background-color: white;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
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

  .errMsg {
    @include errMsg;
  }
</style>
