<template>
  <div class="container">
    <header class="profile">
      <img :src="avatar" class="avatar">
      <div class="detail">
        <span class="nickname">{{nickname}}</span>
        <div class="other-detail">
          <router-link class="balance" to="/">余额 {{balance}}元</router-link>
          <router-link class="looked" to="/">看过我 {{looked}}</router-link>
          <router-link class="focused" to="/">关注我 {{focused}}</router-link>
        </div>
      </div>
    </header>
    <section class="main">
      <fz-icon-item label="基本信息" to="info" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="相册" to="photos" class="icon icon-photo" :append="true">
        <i slot="icon" class="fa fa-picture-o fa-2x icon-photo" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="择偶条件" to="condition" class="icon icon-condition" :append="true">
        <i slot="icon" class="fa fa-heart fa-2x icon-condition" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="购买服务" to="srevice" class="icon" :append="true">
        <i slot="icon" class="fa fa-hand-o-down fa-2x icon-service" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="推荐人" to="recommend" class="icon" :append="true">
        <i slot="icon" class="fa fa-users fa-2x icon-recommend" aria-hidden="true"></i>
      </fz-icon-item>
    </section>
  </div>
</template>

<script>
  // import config from '../../config/setting.js'
  import { mapState } from 'vuex'
  import IconItem from '../common/IconItem'
  export default {
    data () {
      return {
      }
    },
    props: {
    },
    computed: {
    // ['avatar', 'balance', 'looked', 'focused', 'nickname']
      ...mapState({
        avatar: state => state.MeInfo.avatar,
        balance: state => state.MeInfo.balance,
        looked: state => state.MeInfo.looked,
        focused: state => state.MeInfo.focused,
        nickname: state => state.MeInfo.nickname
      }),
      test () {
        return this.$store.state.MeInfo.avatar
      }
    },
    components: {
      'fz-icon-item': IconItem
    },
    created () {
      this.$store.dispatch('fetchMeInfo')
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/util.scss";
  .container {
  }
  
  .profile {
    margin-bottom: 15px;
    height: 124px;
    background-color: #4b4b4b;
    .avatar {
      float: left;
      margin: 20px 0 0 20px;
      width: 70px;
      height: 70px;
      border: 2px solid white;
    }
    .detail {
      margin-left: 106px;
      padding-top: 29px;
      .nickname {
        padding-bottom: 5px;
        box-sizing: border-box;
        display: block;
        color: #fff;
        font-size: 17px;
        border-bottom: 1px solid #818181;
      }

      .other-detail {
        margin-top: 20px;
        color: #fff;
        font-size: 13px;
        a {
          @include reseta(#fff);
          margin-right: 20px;
        }
      }
    }
  }

  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fff;
    /*icon参考颜色*/
    /*红#FF2944*/
    /*蓝#0673DE*/
    /*黄#FF992E*/
    /*绿#2BAF4B*/
    /*紫#696AD7*/
    /*橙#FF6D3B*/
    .icon {
      width: 25%;
      height: 100px;
      .icon-info {
        color: #2baf4b;
      }
      .icon-photo {
        color: #ff992e;
      }
      .icon-condition {
        color: #ff2944;
      }
      .icon-service {
        color: #696ad7;
      }
      .icon-recommend {
        color: #0673de;
      }
    }

  }
</style>