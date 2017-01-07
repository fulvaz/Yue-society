<template>
  <div class="container">
    <header class="profile">
      <img :src="avatar" class="avatar">
      <div class="detail">
        <span class="nickname">{{nickname}}</span>
        <div class="other-detail">
          <router-link class="balance" to="/me/consume_history">余额 {{balance}}元</router-link>
          <router-link class="looked" to="/me/looked">看过我 {{looked}}</router-link>
          <router-link class="focused" to="/me/focused">关注我 {{focused}}</router-link>
          <router-link class="whom-i-focus" to="/me/focus_who">已关注 {{focus}}</router-link>
        </div>
      </div>
    </header>
    <section class="main">
      <fz-icon-item label="基本信息" to="info" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="相册" to="album" class="icon icon-photo" :append="true">
        <i slot="icon" class="fa fa-picture-o fa-2x icon-photo" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="择偶条件" to="spouse" class="icon icon-condition" :append="true">
        <i slot="icon" class="fa fa-heart fa-2x icon-condition" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="购买服务" to="service" class="icon" :append="true">
        <i slot="icon" class="fa fa-hand-o-down fa-2x icon-service" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="推荐人" to="recommend" class="icon" :append="true">
        <i slot="icon" class="fa fa-users fa-2x icon-recommend" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="约见过" to="appointment" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="已参加活动" to="activitiesJoined" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="充值" to="deposite" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="消费记录" to="consumeHistory" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
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
        balance: state => state.MeState.balance,
        looked: state => state.MeState.looked,
        focused: state => state.MeState.focused,
        focus: state => state.MeState.focus.length,
        nickname: state => state.MeState.nickname,
        avatar: state => state.MeState.avatar
      })
    },
    components: {
      'fz-icon-item': IconItem
    },
    created () {
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
        display: flex;
        flex-wrap: wrap;
        margin-top: 13px;
        color: #fff;
        font-size: 13px;
        a {
          @include reseta(#fff);
          margin-right: 20px;
          margin-top: 7px;
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
