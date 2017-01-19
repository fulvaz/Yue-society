<template>
  <div class="container">
    <header class="profile">
      <div class="avatar" @click="handleAvatarUpload">
        <img :src="avatar">
        <p class="upload-sign" @click="handleAvatarUpload">修改头像</p>
      </div>
      <div class="detail">
        <span class="nickname">{{nickname}}</span>
        <div class="other-detail">
          <router-link class="balance" to="/me/consumeHistory">余额 {{balance}}元</router-link>
          <router-link class="looked" to="/me/looked">看过我 {{looked}}</router-link>
          <router-link class="focused" to="/me/focused">关注我 {{focused}}</router-link>
          <router-link class="whom-i-focus" to="/me/focus_who">已关注 {{focus}}</router-link>
        </div>
      </div>
    </header>
    <section class="main">
      <fz-icon-item label="基本信息" to="info" class="icon" :append="true">
        <icon slot="icon" class="fa-icon fa-user-circle fa-2x icon-info" aria-hidden="true" name="user-circle"></icon>
      </fz-icon-item>
      <fz-icon-item label="我的相册" to="album" class="icon icon-photo" :append="true">
        <icon slot="icon" class="fa-icon fa-picture-o fa-2x icon-photo" aria-hidden="true" name="picture-o"></icon>
      </fz-icon-item>
      <fz-icon-item v-show="ifAvailable" label="择偶条件" to="spouse" class="icon icon-condition" :append="true">
        <icon slot="icon" class="fa-icon fa-heart fa-2x icon-condition" aria-hidden="true" name="heart"></icon>
      </fz-icon-item>
      <!-- <fz-icon-item label="vip" to="service" class="icon" :append="true">
        <i slot="icon" class="fa fa-hand-o-down fa-2x icon-service" aria-hidden="true"></i>
      </fz-icon-item> -->
      <fz-icon-item label="我的推荐" to="recommend" class="icon" :append="true">
        <icon slot="icon" class="fa-icon fa-users fa-2x icon-recommend" aria-hidden="true" name="users"></icon>
      </fz-icon-item>
      <!-- <fz-icon-item label="约见过" to="appointment" class="icon" :append="true">
        <i slot="icon" class="fa fa-user-circle fa-2x icon-info" aria-hidden="true"></i>
      </fz-icon-item>
      <fz-icon-item label="谁约过我" to="appointed" class="icon" :append="true">
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
      </fz-icon-item> -->
    </section>
  </div>
</template>

<script>
  // import config from '../../config/setting.js'
  import { mapState } from 'vuex'
  import IconItem from '../common/IconItem'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/user-circle'
  import 'vue-awesome/icons/users'
  import 'vue-awesome/icons/picture-o'
  import 'vue-awesome/icons/heart'
  // import VueCoreImageUpload from 'vue-core-image-upload/'
  // import avatarUpMix from '../../mixins/uploadWithWX'
  import * as api from '../../api/index.js'
  export default {
    data () {
      return {
        avatar: ''
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
        ifAvailable: state => state.MeState.ifAvailable
        // avatar: state => state.MeState.avatar
      })
    },
    components: {
      'fz-icon-item': IconItem,
      'icon': Icon
    },
    created () {
      this.avatar = this.$store.state.MeState.avatar
    },
    methods: {
      handleAvatarUpload () {
        this.openIndicator()
        api.wxAuth(['chooseImage', 'uploadImage']).then(res => {
          this.closeIndicator()
          return api.wxChooseImage(1)
        }).then(res => {
          this._avatarTmp = res.localIds[0]
          return api.wxUploadImage(res.localIds[0])
        }).then(res => {
          this.openIndicator()
          return api.uploadAvatarId({serverId: res.serverId})
        }).then(res => {
          this.handleSuccess('UPLOAD_IMAGE_SUCCES')
          this.avatar = this._avatarTmp
          this.$emit('input', this.avatar) // vee-validate 验证需要input事件
        }).catch(res => {
          this.handleFailWithCode(res.status, res.statusText)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .container {
    width: 100%;
    height: $content-height;
    background-color: $global-background-color;
  }

  .profile {
    margin-bottom: 15px;
    height: 124px;
    background-color: #4b4b4b;
    border: 1px solid transparent;
    .avatar {
      position: relative;
      float: left;
      margin: 20px 0 0 20px;
      width: 70px;
      height: 70px;
      border: 2px solid white;
      .upload-sign {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        margin: 0;
        text-align: center;
        line-height: $description-size;
        font-size: $description-size;
        color: white;
        background: rgba(0, 0, 0, 0.5)
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .detail {
      margin-left: 106px;
      margin-top: 20px;
      .nickname {
        padding-bottom: 5px;
        box-sizing: border-box;
        display: block;
        color: #fff;
        font-size: $item-size;
        border-bottom: 1px solid #818181;
      }

      .other-detail {
        display: flex;
        flex-wrap: wrap;
        margin-top: $description-size;
        color: #fff;
        font-size: $description-size;
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
      box-sizing: border-box;
      border-right: 1px solid $list-border-color;

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
