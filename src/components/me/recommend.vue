<template lang="html">
  <div class="recommend-container">
    <header>
      <!-- <img class="logo" :src="me.avatar" >
      <div class="info">
        <h2 class="content-title">{{me.nickname}}</h2>
        <h3 class="content-subtitle">{{me.livingPlace}}</h3>
      </div> -->
      <h2>我的专属推荐二维码</h2>
    </header>
    <section class="qr-code">
      <img :src="qrCode" class="qr-code-img">
    </section>
    <div class="btns">
      <el-button class="share-btn" type="primary">
        <icon class="btn-icon" name="wx-friends"></icon>
        <span>分享给好友</span>
      </el-button>
      <el-button class="share-btn" type="primary">
        <icon class="btn-icon" name="wx-circle"></icon>
        <span>分享到朋友圈</span>
      </el-button>
      <!-- <el-button class="share-btn">
        <img src="static/icons/wx_friends.svg" >
        分享给好友
      </el-button> -->
    </div>
    <user-list title="我推荐的人" :users="users"></user-list>
  </div>
</template>

<script>
import UserList from '../common/UserList'
import ListItem from '../common/ListItem'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import Icon from 'vue-awesome/components/Icon'
export default {
  components: {
    'user-list': UserList,
    'list-item': ListItem,
    'icon': Icon
  },
  data () {
    return {
      me: {},
      users: [],
      qrCode: ''
    }
  },
  created () {
    api.getRecommend().then(response => {
      this.users = utils.response2Data(response)
    })
    api.fetchMeInfo().then(res => {
      this.me = utils.response2Data(res)
    })
    api.getQrCode().then(res => {
      this.qrCode = utils.response2Data(res).qrCode
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .fa-icon {
    width: auto;
    height: 14px; /* or any other relative font sizes */
  }
  header {
    h2 {
        margin: 10px 0;
        font-size: 15px;
        font-weight: normal;
        color: #aaa;
    }

    // margin-left: calc((100vw - 200px) / 2);
    // margin-bottom: 1em;
    // @include clearfix();
    // $img-size: 60px;
    // img {
    //   margin-right: 10px;
    //   float: left;
    //   width: $img-size;
    //   height: $img-size;
    // }
    // .info {
    //   height: $img-size;
    //   display: flex;
    //   // justify-content: space-between;
    //   flex-direction: column;
    // }
    // .content-title {
    //   margin: 0;
    //   font-size: $item-size;
    // }
    // .content-subtitle {
    //   margin: 0;
    //   margin-top: 5px;
    //   font-size: $description-size;
    //   color: $description-color;
    // }
  }

  .btns {
    display: flex;
    justify-content: center;
    margin-top: 10px;

    .btn-icon {
      color: white;
    }

    .share-btn {
      background-color: $weixin-green;
      border: $weixin-green;
    }
  }

  .qr-code {
    .qr-code-img {
      display: block;
      margin-left: calc((100vw - 200px) / 2);
      width: 200px;
      height: 200px;
      border: 5px solid $main-red;
    }
  }
</style>
