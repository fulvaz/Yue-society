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
      <mt-button class="share-btn"></mt-button>
      <mt-button class="share-btn"></mt-button>
    </div>
    <user-list title="我推荐的人" :users="users"></user-list>
  </div>
</template>

<script>
import UserList from '../common/UserList'
import ListItem from '../common/ListItem'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'user-list': UserList,
    'list-item': ListItem
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
