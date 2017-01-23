<template>
  <div id="app">
    <div class="router-view">
      <router-view></router-view>
    </div>
    <tabbar class="tab" ref="tabbar">
      <tabbar-item :to="'/'" :label="'首页'" :id="0" :isSelected="true">
        <icon slot="icon" class="fa-icon" aria-hidden="true" name="home"></icon>
      </tabbar-item>
      <tabbar-item :to="'/circle'" :label="'圈子'" :id="1">
        <icon slot="icon" aria-hidden="true" name="circle-o"></icon>
      </tabbar-item>
      <tabbar-item :to="'/search'" :label="'搜索'" :id="2">
        <icon slot="icon" aria-hidden="true" name="search"></icon>
      </tabbar-item>
      <tabbar-item :to="'/message'" :label="'私信'" :id="3">
        <div class="msg-tab-icon" slot="icon">
          <icon aria-hidden="true" name="envelope"></icon>
          <mt-badge class="unread" size="small" color="#fe6431" v-if="unread > 0">{{unread}}</mt-badge>
        </div>
      </tabbar-item>
      <tabbar-item :to="'/me'" :label="'我'" :id="4">
        <icon slot="icon" class="fa-icon" aria-hidden="true" name="user"></icon>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import tabbar from 'components/common/Tabbar'
import TabbarItem from 'components/common/TabbarItem'
import {Badge} from 'mint-ui'

// icons
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/circle-o'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/envelope'
import 'vue-awesome/icons/user'

export default {
  components: {
    'tabbar': tabbar,
    'tabbar-item': TabbarItem,
    'mt-badge': Badge,
    'icon': Icon
  },
  computed: {
    unread () {
      return this.$store.state.MeState.unreadMsg
    }
  }
}
</script>

<style lang="scss">
  @import "~normalize-scss/sass/_normalize.scss";
  @import "assets/index.scss";

  @include normalize;
  body {
    font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  }

  a {
    @include reseta(#000);
  }

  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .router-view {
      flex: 1 1 calc(100vh - 53px);
      min-height: calc(100vh - 53px);
      // margin-bottom: 53px;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .tab {
      .selected {
        color: #c52c24;
      }
    }
  }

  .msg-tab-icon {
    position: relative;
    // TODO 这里只是hack, 不知道为什么div会多出了一点点高度
    height: 25px;
    .unread {
      position: absolute;
      top: 0;
      right: -12px;
    }
  }

  input {
    border: none;
    resize: none;
    outline: none;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
  }

  button {
    outline: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    // background-color: white;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  .fa-icon {
    width: 25px;
    height: 25px;
    font-size: 2em;
  }

</style>
