<template>
  <div class="list-item">
    <img class="avatar" :src="avatar" >
    <div class="main">
      <div class="row-1 row">
        <!-- 不然类名叫什么啊, 我怎么觉得语义化就是个笑话 -->
        <div class="col-1">
          <span class="nickname">{{nickname}}</span>
          <icon class="icon icon-sex" v-show="sex" slot="icon" aria-hidden="true" name="user" :class="{'female-icon': sex==='女', 'male-icon': sex==='男'}"></icon>
        </div>
        <div class="col-2">
          <icon class="icon icon-heart" name="heart"></icon>
          <span class="focused">{{focused}}</span>
          <icon class="icon icon-photo" name="picture-o"></icon>
          <span class="photo-num">{{photoNum}}</span>
        </div>
      </div>
      <!-- 图标是什么 -->
      <p class="info row">{{info}}</p>
      <p class="intro row" v-if="intro && intro.length !== 0">{{intro.slice(0, 40)+'...'}}</p>
      <div class="row-2 row">
      </div>
      <section class="tags row" v-show="tags.length !== 0">
        <ul>
          <li v-for="tag in tags" class="tag"><fz-tag :text="tag"></fz-tag></li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
// 不要问为什么冒出来这个除了样式外一毛一样的文件, 应该问问甲方想干嘛[捂脸]
import Tag from './tagSlim'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/users'
import 'vue-awesome/icons/heart'
import 'vue-awesome/icons/picture-o'
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
    'focused': {
      type: Number,
      default: 0
    },
    'photoNum': {
      type: Number,
      default: 0
    },
    'sex': '',
    'income': '',
    'school': '',
    'house': '',
    'car': '',
    'birthplace': '',
    'intro': {
      type: String,
      default: ''
    },
    me: Object
  },
  computed: {
    info () {
      let content = []
      if (this.livingplace) content.push(this.livingplace)
      if (this.height) content.push(this.height + '厘米')
      if (this.weight) content.push(this.weight + '公斤')
      if (this.age) content.push(this.age + '岁')
      return content.join(' / ')
    },
    tags () {
      let tags = []
      if (this.age && this.age === this.me.age) tags.push('与我同年')
      if (this.income && parseInt(this.income.split('-')[0]) > 10) tags.push('高收入')
      if (this.school && this.school === this.me.school) tags.push('校友')
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

  .row {
    margin-top: 5px;
    &:first-child {
      margin-top: 0;
    }
  }

  .list-item {
    width: 100%;
    overflow: hidden;
    min-height: 75px;
  }
  // border-bottom: 1px solid $list-border-color;
  .icon {
    position: relative;
    top: 1px; // 微调icon的位置
    width: 12px;
    height: 12px;
  }
  .avatar {
    // margin-left: 10px;
    float: left;
    width: 50px;
    height: 50px;
  }
  .main {
    margin-left: 60px;
    @include item-description();
    line-height: $description-size;
    .row-1 {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      div {
        display: flex;
        align-items: baseline;
      }
    }

    .nickname {
      @include item-title();
    }
    .female-icon {
      color: $female;
    }
    .male-icon {
      color: $male;
    }
    .icon-heart {
      margin-left: 5px;
      margin-right: 2px;
      width: 11px;
      height: 11px;
    }
    .icon-photo {
      position: relative;
      top: 2px; // 微调icon的位置
      margin-left: 5px;
      margin-right: 2px;
    }
    .focused {
    }
    .info {
      margin: 0;
      margin-top: 5px;
    }
    .intro {
      @include item-description();
      line-height: $description-size;
      margin: 0;
      margin-top: 5px;
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
