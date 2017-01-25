<template lang="html">
  <div class="moment-cell-container">
    <router-link :to="'/users/'+uid"><img :src="avatar" alt="" class="avatar"></router-link>
    <div class="main">
      <span class="nickname">{{nickname}}</span>
      <p class="content">{{content}}</p>
      <div class="imgs">
        <grid>
          <grid-item v-for="img in imgs">
            <cover-img :img="img" @click="previewImage"></cover-img>
          </grid-item>
        </grid>
      </div>
      <div class="last-row">
        <span class="date">{{date}}</span>
        <!-- 已经点赞 -->
        <el-button v-if="ifLiked" class="like-btn" @click="">
          <icon name="heart" class="icon-like"></icon>
          <span>{{likes.length}}</span>
        </el-button>
        <el-button v-else class="like-btn" @click="handleLike">
          <icon name="heart-o" class="icon-like"></icon>
          <span>{{likes.length}}</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import Grid from '../common/layouts/Grid'
import GridCell from '../common/layouts/GridItem'
import CoverImg from '../common/ImageCover'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/heart'
import 'vue-awesome/icons/heart-o'
export default {
  components: {
    'grid': Grid,
    'grid-item': GridCell,
    'cover-img': CoverImg,
    'icon': Icon
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
    likes: Array,
    ifLiked: Boolean,
    date: String
  },
  data () {
    return {
    }
  },
  updated () {
    // 这样会让数据变得不响应
  },
  methods: {
    previewImage (src) {
      api.wxPreviewImage(src, this.imgs)
    },
    handleLike () {
      let data = {
        uid: this.$store.state.MeState.uid,
        momentId: this.id
      }
      this.$emit('liked', this.id)
      api.likeMoment(data).then(e => {
      }).catch(e => {
        console.error(e)
        this.toast(this.$text.LIKE_MOMENT_FAILED)
      })
    }
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
        padding-top: 5px;
      }

      // 定制子组件CoverImg的样式
      .fz-cover-image {
        padding-bottom: 100%;
      }
    }

    .last-row {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .like-btn {
        height: 12px;
        border: none;
        padding: 0;
        @include item-description;
      }
      .icon-like {
        height: 12px;
        width: 12px;
      }
    }
  }

</style>
