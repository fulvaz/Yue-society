<template>
  <div class="list-item">
    <img class="logo" :src="avatar" >
    <div class="main">
      <span class="nickname">{{nickname}}</span>
      <icon class="icon icon-sex" v-show="sex" slot="icon" aria-hidden="true" name="user" :class="{'female-icon': sex==='女', 'male-icon': sex==='男'}"></icon>
      <icon class="icon icon-heart" name="heart"></icon>
      <span class="focused">关注: {{focused}}</span>
      <!-- 图标是什么 -->
      <span class="photo-num">照片: {{photoNum}}</span>
      <span class="info">{{info}}</span>
      <section class="tags" v-show="tags.length !== 0">
        <ul>
          <li v-for="tag in tags" class="tag"><fz-tag :text="tag"></fz-tag></li>
        </ul>
      </section>
      <p class="intro" v-show="intro.length !== 0">{{intro}}</p>
    </div>
  </div>
</template>

<script>
// 不要问为什么冒出来这个除了样式外一毛一样的文件, 应该问问甲方想干嘛[捂脸]
import Tag from './tagSlim'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/heart'
export default {
  components: {
    'fz-tag': Tag,
    'icon': Icon
  },
  props: {
    'nickname': '',
    'avatar': '',
    livingplace: '',
    weight: '',
    height: '',
    age: '',
    'focused': '',
    'photoNum': '',
    'sex': '',
    'intro': {
      type: String,
      default: ''
    },
    me: Object
  },
  computed: {
    info () {
      return `${this.livingplace} / ${this.height}厘米 / ${this.weight}公斤 / ${this.age}岁`
    },
    tags () {
      let tags = []
      if (this.age && this.age === this.me.age) tags.push('与我同年')
      if (this.income && parseInt(this.income.split('-')[0]) > 10) tags.push('高收入')
      if (this.school && this.school === this.mthis.school) tags.push('校友')
      if (this.house && this.house === '已购房') tags.push('有房')
      if (this.car === '有') tags.push('有车')
      if (this.birthplace === this.me.birthplace) tags.push('同乡')
      return tags
    }
  }

}
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .list-item {
    width: 100%;
    overflow: hidden;
    min-height: 75px;
  }
  // border-bottom: 1px solid $list-border-color;
  .icon {
    width: 12px;
    height: 12px;
  }
  .logo {
    float: right;
    width: 50px;
    height: 50px;
  }
  .main {
    // margin-left: 60px;
    .nickname {
      @include item-title();
    }
    .female-icon {
      color: $female;
    }
    .male-icon {
      color: $male;
    }
    .focused {
      float: right;
    }

    .intro {
      @include item-description();
      line-height: $description-size;
      margin: 0;
      max-height: calc(2 * #{$description-size});
      overflow: hidden;
    }

    .tag {
      display: inline-block;
      margin-right: 3px;
      margin-bottom: 3px;
    }

    .others {
      float: right;
      margin-right: 10px;
    }
  }
</style>
