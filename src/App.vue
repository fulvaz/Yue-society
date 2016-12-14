<template>
  <div id="app">
    <router-view></router-view>
    <tabbar class="tab">
      <router-link to="/" class="icons">
        <i class="fa fa-home fa-2x" aria-hidden="true"></i>
        <p class="name">首页</p>
      </router-link>
      <router-link to="circle" class="icons">
        <i class="fa fa-circle-o fa-2x" aria-hidden="true"></i>
        <p class="name">圈子</p>
      </router-link>
      <router-link to="search" class="icons">
        <i class="fa fa-search fa-2x" aria-hidden="true"></i>
        <p class="name">搜索</p>
      </router-link>
      <router-link to="message" class="icons">
        <i class="fa fa-envelope fa-2x" aria-hidden="true"></i>
        <p class="name">私信</p>
      </router-link>
      <router-link to="me" class="icons">
        <i class="fa fa-user fa-2x" aria-hidden="true"></i>
        <p class="name">我</p>
      </router-link>
    </tabbar>
  </div>
</template>

<script>
import tabbar from 'components/common/Tabbar'
import TabbarItem from 'components/common/TabbarItem'
export default {
  components: {
    'tabbar': tabbar,
    'tabbar-item': TabbarItem
  }
}
</script>

<style lang="scss">
  @import "~normalize-scss/sass/_normalize.scss";
  @import '~font-awesome/scss/font-awesome.scss';

  @include normalize;
  #app {
    background-color: #efefef;
    margin-bottom: 53px;

    .tab {
      display: flex;
      justify-content: space-around;
      padding: 5px;
      height: 53px;
      width: 100%;
      box-sizing: border-box;
      background-color: #F7F7FA;
      position: fixed;
      bottom: 0;

      border-top: 1px solid #C0BFC4;

      .icons {
        display: block;
        i {
          text-align: center;
          color: #555;
        }

        .name {
          margin: 0;
          text-align: center;
          color: #888;
          font-size: 12px;
          line-height: 1.8;
        }
      }
    }

  }


</style>
