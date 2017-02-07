<template>
  <div class="list-item">
    <router-link :to="link" class="logo" >
      <img-cover :img="logo" >
    </router-link>
    <div class="main">
      <h2 class="content-title">{{contentTitle}}</h2>
      <h3 class="content-subtitle">{{contentSubtitle}}</h3>
    </div>
  </div>
</template>

<script>
  import ImgCover from '../common/ImageCover'
  export default {
    components: {
      'img-cover': ImgCover
    },
    props: {
      'link': '',
      'logo': '',
      'content-title': '',
      'content-subtitle': ''
    },
    computed: {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .list-item {
    width: 100%;
    overflow: hidden;
    // border-top: 1px solid $list-border-color;

    .logo {
      float: left;
      width: 50px;
      height: 50px;
    }

    .main {
      height: 50px;
      margin-left: 60px;

      .content-title {
        @include item-title();
        margin: 0;
        overflow: hidden;
      }

      .content-subtitle {
        @include item-description();
        bottom: 0;
        margin: 0;
        margin-top: 5px;
      }
    }
  }
</style>
