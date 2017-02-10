<template>
    <div class="index-container">
      <section class="main">
        <nav-bar v-model="active" id="navbar">
          <tab-item id="tab-myCircle" class="navbar-item">
            <div>
              <fa-icon class="fa-icon" slot="icon" name="user-o"></fa-icon>
              <span>我的圈子</span>
            </div>
            <!-- 我的圈子 -->
          </tab-item>
          <tab-item id="tab-circleRecommend" class="navbar-item">
            <div>
              <fa-icon class="fa-icon" slot="icon" name="thumbs-o-up"></fa-icon>
              <span>圈子推荐</span>
            </div>
            <!-- 推荐圈子 -->
          </tab-item>
          <tab-item id="tab-circleSearch" class="navbar-item">
            <div>
              <fa-icon class="fa-icon" slot="icon" name="search"></fa-icon>
              <span>圈子搜索</span>
            </div>
            <!-- 圈子搜索 -->
          </tab-item>
        </nav-bar>


        <mt-tab-container class="tab-container" v-model="active">
          <mt-tab-container-item id="tab-myCircle" class="tab-myCircle">
            <my-circle-list-detailed :circle="myCircleDisplay">
            </my-circle-list-detailed>
            <!-- <load-more-btn></load-more-btn> -->
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-circleRecommend">
            <circle-list-detailed :circle="recCircleDisplay"></circle-list-detailed>
            <load-more-btn @click.native="fetchCircleRecommend" :show="circleRecLoadMoreBtnShow"></load-more-btn>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-circleSearch">
            <fz-search></fz-search>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-circle">
            <fz-circle circleId="0"></fz-circle>
          </mt-tab-container-item>
        </mt-tab-container>
      </section>
    </div>
</template>

<script>
  import {TabContainer, TabContainerItem, Navbar, TabItem, Button} from 'mint-ui'
  import List from '../common/List'
  import ListItem from '../common/ListItem'
  import DetailedListItem from '../common/DetailedListItem'
  import * as api from '../../api/index.js'
  import * as utils from '../../utils/utils.js'
  import Search from './Search'
  import circleList from '../common/DetailedCircleList'
  import myCircleList from './MyCircleList'
  import LoadMoreBtn from '../common/buttons/LoadMore'
  import Circle from './Circle'

  import 'vue-awesome/icons/thumbs-o-up'
  import 'vue-awesome/icons/search'
  import 'vue-awesome/icons/user-o'

  export default {
    data () {
      return {
        circleRecommend: [],
        myCircles: [],
        active: 'tab-circle',
        circleRecommendPage: 0,
        myCirclesPage: 0,
        circleRecLoadMoreBtnShow: true
      }
    },
    computed: {
      recCircleDisplay () {
        return this.circleRecommend.map(e => {
          let tags = e.tags
          if (e.ifHot && tags.indexOf('热门圈子') === -1) tags.push('热门圈子')

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
      myCircleDisplay () {
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
      'circle-list-detailed': circleList,
      'fz-search': Search,
      'mt-button': Button,
      'mt-tab-container-item': TabContainerItem,
      'mt-tab-container': TabContainer,
      'nav-bar': Navbar,
      'tab-item': TabItem,
      'circle-list': List,
      'circle-list-item': ListItem,
      'list': List,
      'list-item-detailed': DetailedListItem,
      'list-item': ListItem,
      'load-more-btn': LoadMoreBtn,
      'my-circle-list-detailed': myCircleList,
      'fz-circle': Circle
    },
    methods: {
      fetchCircleRecommend () {
        api.fetchCircleRecommend(this.circleRecommendPage++, 10).then(res => {
          let remoteData = utils.response2Data(res)
          if (remoteData.length === 0) {
            let err = new Error()
            err.status = ''
            err.statusText = this.$text.NO_NEW_DATA
            throw err
          }
          this.circleRecommend = this.circleRecommend.concat(remoteData)
        }).catch(res => {
          this.handleAllFail(res)
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
    // padding: 0 $horizontal-margin;
    background-color: white;
    .tab-myCircle {
      box-sizing: border-box;
      // padding-right: $horizontal-margin;
    }
  }
  #navbar {
    margin-bottom: 5px; // 避免挡住下方边框
    display: flex;
    justify-content: space-around;
    text-align: center;
    .navbar-item {
      flex: 1 1 200px;
      display: block;
      padding: .5rem 0;
      font-size: 1rem;
      color: $item-color;
      .fa-icon {
        width: 1rem;
        height: 1rem;
      }
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
