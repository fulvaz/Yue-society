<template>
  <div id="app">
    <router-view></router-view>
    <tabbar class="tab">
      <tabbar-item :to="'/'" :label="'首页'" :id="0" :isSelected="true">
        <i slot="icon" class="fa fa-home fa-2x" aria-hidden="true"></i>
      </tabbar-item>
      <tabbar-item :to="'/circle'" :label="'圈子'" :id="1">
        <i slot="icon" class="fa fa-circle-o fa-2x" aria-hidden="true"></i>
      </tabbar-item>
      <tabbar-item :to="'/search'" :label="'搜索'" :id="2">
        <i slot="icon" class="fa fa-search fa-2x" aria-hidden="true"></i>
      </tabbar-item>
      <tabbar-item :to="'/message'" :label="'私信'" :id="3">
        <i slot="icon" class="fa fa-envelope fa-2x" aria-hidden="true"></i>
      </tabbar-item>
      <tabbar-item :to="'/me'" :label="'我'" :id="4">
        <i slot="icon" class="fa fa-user fa-2x" aria-hidden="true"></i>
      </tabbar-item>
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
    background-color: #f7f7f7;
    margin-bottom: 53px;

    .tab {
      .selected {
        color: #c52c24;
      }
    }


  }


</style>
