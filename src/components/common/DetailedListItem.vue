<template>
  <div class="list-item">
    <img class="logo" :src="logo" >
    <div class="main">
      <div class="others"><slot></slot></div>
      <h2 class="content-title">
        {{name}}
        <icon v-show="sex" slot="icon" class="icon-sex" aria-hidden="true" name="user" :class="{female: sex==='女', male: sex==='男'}"></icon>
      </h2>
      <p class="content-subtitle">{{subtitle}}</p>
      <section v-show="tags.length !== 0" class="tags">
        <ul>
          <li v-for="tag in tags" class="tag"><fz-tag :text="tag"></fz-tag></li>
        </ul>
      </section>
      <p v-show="intro.length !== 0" class="intro">{{intro}}</p>
    </div>
  </div>
</template>

<script>
import Tag from './tagSlim'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/users'
export default {
  components: {
    'fz-tag': Tag,
    'icon': Icon
  },
  props: {
    'sex': '',
    'logo': '',
    'name': '',
    'subtitle': '',
    'intro': {
      type: String,
      default: ''
    },
    'tags': {
      default () {
        return []
      },
      type: Array
    }
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
      margin-left: 60px;

      .sex {

      }

      .content-title {
        .icon-sex {
          width: 12px;
          height: 12px;
        }
        .female {
          color: $female;
        }
        .male {
          color: $male;
        }
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

      .intro {
        @include item-description();
        margin: 0;
        max-height: 2.5em;
        overflow: hidden;
      }

      .tag {
        display: inline-block;
        margin-right: 3px;
        margin-bottom: 3px;
      }

      .others {
        float: right;
      }
    }
  }
</style>
