<template>
    <div class="index-container">
      <section class="main">
        <nav-bar v-model="active" id="navbar">
          <tab-item id="tab-myCircle" class="navbar-item">我的圈子</tab-item>
          <tab-item id="tab-circleRecommend" class="navbar-item">推荐圈子</tab-item>
          <tab-item id="tab-circleSearch" class="navbar-item">圈子搜索</tab-item>
        </nav-bar>
        <mt-tab-container class="tab-container" v-model="active">
          <mt-tab-container-item id="tab-myCircle">
            <list class="recommend">
                <li v-for="item in myCDisplay" class="recommend">
                  <router-link :to="`/circles/${item.id}`">
                    <!-- <list-item-detailed
                      :name="item.name"
                      :subtitle="item.subtitle"
                      :logo="item.logo"
                      :tags="item.tags"
                      :intro="item.intro"
                      >
                    </list-item-detailed> -->
                    <circle-list :title="''" class="circle-my">
                        <li v-for="circle in myCircles"><router-link :to="`/circles/${circle.id}`"><circle-list-item :content-title="circle.name" :content-subtitle="circle.memberNum + ' 人'" :logo="circle.logo"></circle-list-item></router-link></li>
                    </circle-list>
                  </router-link>
                </li>
            </list>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-circleRecommend">
            <list class="recommend">
                <li v-for="item in cRecDisplay" class="recommend">
                  <router-link :to="`/circles/${item.id}`">
                    <list-item-detailed
                      :name="item.name"
                      :subtitle="item.subtitle"
                      :logo="item.logo"
                      :tags="item.tags"
                      :intro="item.intro"
                      >
                    </list-item-detailed>
                  </router-link>
                </li>
            </list>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-circleSearch">
          </mt-tab-container-item>
        </mt-tab-container>
      </section>
    </div>
</template>

<script>
  import {TabContainer, TabContainerItem, Navbar, TabItem, Button} from 'mint-ui'
  import Slider from '../common/Slider'
  import SliderItem from '../common/SliderItem'
  import List from '../common/List'
  import ListItem from '../common/ListItem'
  import DetailedListItem from '../common/DetailedListItem'
  import * as api from '../../api/index.js'
  import * as utils from '../../utils/utils.js'

  export default {
    data () {
      return {
        circleRecommend: [],
        myCircles: [],
        active: 'tab-circleRecommend'
      }
    },
    computed: {
      cRecDisplay () {
        return this.circleRecommend.map(e => {
          let tags = e.tags
          if (e.ifHot) tags.push('热门圈子')

          let obj = {
            id: e.id,
            name: e.name,
            subtitle: `${e.location} / ${e.category}`,
            logo: e.logo,
            intro: e.introduction,
            tags: tags
          }
          return obj
        })
      },
      myCDisplay () {
        return this.myCircles.map(e => {
          let tags = e.tags
          let obj = {
            id: e.id,
            name: e.name,
            subtitle: `${e.location} / ${e.category}`,
            logo: e.logo,
            intro: e.introduction,
            tags: tags
          }
          return obj
        })
      }
    },
    components: {
      'mt-button': Button,
      'mt-tab-container-item': TabContainerItem,
      'mt-tab-container': TabContainer,
      'nav-bar': Navbar,
      'tab-item': TabItem,
      'slider': Slider,
      'slider-item': SliderItem,
      'circle-list': List,
      'circle-list-item': ListItem,
      'list': List,
      'list-item-detailed': DetailedListItem,
      'list-item': ListItem
    },
    methods: {
      fetchCircleRecommend () {
        api.fetchCircleRecommend().then(res => {
          let remoteData = utils.response2Data(res)
          this.circleRecommend = this.circleRecommend.concat(remoteData)
        })
      },
      fetchMyCircle () {
        api.fetchMyCircle().then(res => {
          let data = utils.response2Data(res)
          this.myCircles = data
        })
      }
    },
    created () {
      this.fetchCircleRecommend()
      this.fetchMyCircle()
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .index-container {
      background-color: #fff;
      padding: 0;
  }

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

</style>
