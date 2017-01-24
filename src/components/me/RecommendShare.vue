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
      <img :src="qrcode" class="qr-code-img">
    </section>
    <div class="text">
      <p>长按二维码加入月正圆</p>
    </div>
    <!-- <div class="btns">
      <el-button class="share-btn" type="primary">
        <icon class="btn-icon" name="wx-friends"></icon>
        <span>分享给好友</span>
      </el-button>
      <el-button class="share-btn" type="primary">
        <icon class="btn-icon" name="wx-circle"></icon>
        <span>分享到朋友圈</span>
      </el-button>
    </div> -->
    <!-- <user-list title="我推荐的人" :users="users"></user-list> -->
    <p class="introduction">月正圆是基于移动互联网技术，采用大数据精准匹配交友对象、实名制的熟人圈社交模式的婚恋交友平台。由华工、暨大管理与计算机博导教授、研究生，中大心理学教师等专家团队共同研发打造。在为华工、中大、暨大、华中科大、中南财经政法等众多高校单身校友服务的基础上，逐步扩展到广州医疗圈、银行金融圈、IT圈等相关行业圈子。平台业务立足广州，辐射珠三角并延伸华南地区。</p>
  </div>
</template>

<script>
import UserList from '../common/UserList'
import ListItem from '../common/ListItem'
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
      qrcode: ''
    }
  },
  created () {
    this.qrcode = this.$route.params['qrcode']
  },
  mounted () {
    // 将tabbar隐藏起来
    this.$root.$children[this.$root.$children.length - 1].$el.style.display = 'none'
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

  .text {
    @include item-title;
    text-align: center;
  }

  .introduction {
    @include item-description;
    margin: 2em $horizontal-margin;
  }

  .btns {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    .btn-icon {
      color: white;
    }
    .fa-icon {
      width: auto;
      height: 14px; /* or any other relative font sizes */
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
