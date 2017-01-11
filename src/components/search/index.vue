<template lang="html">
  <section class="main">
    <nav-bar v-model="active" id="navbar">
      <tab-item id="tab-recent-reg" class="navbar-item">最新注册</tab-item>
      <tab-item id="tab-recent-login" class="navbar-item">最新登录</tab-item>
      <tab-item id="tab-recommend" class="navbar-item">为你推荐</tab-item>
    </nav-bar>
    <mt-tab-container class="tab-container" v-model="active">
      <mt-tab-container-item id="tab-recent-reg">
        <list class="recommend">
            <li v-for="circle in circleRecommend" class="recommend">
              <router-link :to="`/circles/${circle.id}`">
                <list-item
                  :content-title="circle.contentTitle"
                  :content-subtitle="circle.content"
                  :logo="circle.logo">
                </list-item>
              </router-link>
            </li>
        </list>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-recent-logind">
        <list class="recommend">
            <li v-for="circle in activityRecommend" class="recommend">
              <router-link :to="`/activities/${circle.id}`">
                <list-item
                  :content-title="circle.contentTitle"
                  :content-subtitle="circle.contentSubtitle"
                  :logo="circle.logo">
                </list-item>
              </router-link>
            </li>
        </list>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-recommend">
        <list class="recommend">
            <li v-for="circle in activityRecommend" class="recommend">
              <router-link :to="`/activities/${circle.id}`">
                <list-item
                  :content-title="circle.contentTitle"
                  :content-subtitle="circle.contentSubtitle"
                  :logo="circle.logo">
                </list-item>
              </router-link>
            </li>
        </list>
      </mt-tab-container-item>
    </mt-tab-container>
  </section
</template>

<script>
import {TabContainer}
export default {
  data () {
    return {
      active: 'tab-recent-reg'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/index.scss";
  .tab-container {
    padding: 0 $horizontal-margin;
    background-color: white;
  }
  #navbar {
    margin-bottom: 5px; // 避免挡住下方边框
    display: flex;
    justify-content: space-around;
    text-align: center;
    .navbar-item {
      flex: 1 1 200px;
      padding: 1em 0;
      display: block;
    }
    .is-selected {
      color: $main-red;
      border-bottom: 3px solid $main-red;
    }

    @include clearfix()
  }

  .recommend {
      @include list-border();
      padding: $list-padding 0 ;
      background-color: white;
      margin: 0px 0;
      box-shadow: 1px black;
  }

</style
