<template>
  <div class="container">
    <header class="profile">
      <img :src="userInfo.avatar" class="avatar">
      <div class="detail">
        <span class="nickname">{{userInfo.nickname}}</span>
        <div class="other-detail">
          <router-link class="balance" to="/">余额 {{userInfo.balance}}元</router-link>
          <router-link class="looked" to="/">看过我 {{userInfo.looked}}</router-link>
          <router-link class="focused" to="/">关注我 {{userInfo.focused}}</router-link>
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
  import config from '../../config/setting.js'
  import IconItem from '../common/IconItem'
  export default {
    data () {
      return {
        userInfo: {}
      /*
        id: 0,
        nickname: '',
        realname: '',
        birthday: 0,
        province: '',
        city: '',
        height: 0,
        weight: 0,
        age: 0,
        income: 0,
        school: '',
        degree: '',
        lunarid: '',
        bloodtype: '',
        sex: '',
        nation: '',
        marriage: '',
        house: '',
        car: '',
        birthplace: '',
        faith: '',
        starssign: '',
        isvip: 0,
        looked: 0,
        focus: 0,
        balance: 0,
        perfection: 0,
        avator: '',
        album: '',
        recommender: '',
        account_status: 0
      */
      }
    },
    props: {

    },
    components: {
      'fz-icon-item': IconItem
    },
    created () {
      this.fetchMeInfo()
    },
    methods: {
      fetchMeInfo () {
        this.$http.get(config.meApi).then((response) => {
          let remoteData
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          this.userInfo = remoteData
          /*
            this.id = remoteData.id
            this.nickname = remoteData.id
            this.realname = remoteData.id
            this.birthday = remoteData.id
            this.province = remoteData.id
            this.city = remoteData.id
            this.height = remoteData.id
            this.weight = remoteData.id
            this.age = remoteData.id
            this.income = remoteData.id
            this.school = remoteData.id
            this.degree = remoteData.id
            this.lunarid = remoteData.id
            this.bloodtype = remoteData.id
            this.sex = remoteData.id
            this.nation = remoteData.id
            this.marriage = remoteData.id
            this.house = remoteData.id
            this.car = remoteData.id
            this.birthplace = remoteData.id
            this.faith = remoteData.id
            this.starssign = remoteData.id
            this.isvip = remoteData.id
            this.looked = remoteData.id
            this.focus = remoteData.id
            this.balance = remoteData.id
            this.perfection = remoteData.id
            this.avator = remoteData.id
            this.album = remoteData.id
            this.recommender = remoteData.id
            this.account_status = remoteData.id
         */
        })
      }
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