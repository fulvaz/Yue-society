<template lang="html">
  <div class="moment-cell-container">
    <router-link :to="'/users/'+uid"><img :src="avatar" alt="" class="avatar"></router-link>
    <div class="main">
      <span class="nickname">{{nickname}}</span>
      <p class="content">{{content}}</p>
      <div class="imgs">
        <grid>
          <grid-item v-for="img in imgs">
            <cover-img :img="img"></cover-img>
          </grid-item>
        </grid>
      </div>
    </div>
  </div>
</template>

<script>
import Grid from '../common/layouts/Grid'
import GridCell from '../common/layouts/GridItem'
import CoverImg from '../common/ImageCover'
export default {
  components: {
    'grid': Grid,
    'grid-item': GridCell,
    'cover-img': CoverImg
  },
  props: {
    id: Number,
    avatar: String,
    nickname: String,
    uid: Number,
    content: String,
    imgs: {
      type: Array,
      default () {
        return []
      }
    },
    date: String
  }
}
</script>

<style lang="scss">
  @import "../../assets/index.scss";
  .moment-cell-container {
    .avatar {
      float: left;
      width: 50px;
      height: 50px;
    }

    .main {
      @include item-description;
      margin-left: 60px;

      .nickname {
        @include item-title;
      }

      // 定制子组件GridItem的样式
      .grid-item-wrapper {
        box-sizing: border-box;
        padding-right: 5px;
      }

      // 定制子组件CoverImg的样式
      .fz-cover-image {
        padding-bottom: 100%;
      }
    }
  }

</style>
