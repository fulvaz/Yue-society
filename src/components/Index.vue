<template>
    <div class="container">
        <swipe class="my-swipe" :auto="3000" :showIndicators="false">
          <swipe-item class="slider" v-for="src in sliderContent">
            <img :src="src" class="slide-content">
          </swipe-item>
        </swipe>
        <section class="main">
          <nav-bar v-model="active" id="navbar">
            <tab-item id="tab-circleRecommend" class="navbar-item">圈子推荐</tab-item>
            <tab-item id="tab-activitiesRecommend" class="navbar-item">活动推荐</tab-item>
            <tab-item id="tab-userRecommend" class="navbar-item">用户推荐</tab-item>
          </nav-bar>
          <mt-tab-container class="tab-container" v-model="active">
            <mt-tab-container-item id="tab-circleRecommend">
              <list class="circleRecommend">
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
            <mt-tab-container-item id="tab-activitiesRecommend">
              <list class="activitiesRecommend recommend">
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
            <mt-tab-container-item id="tab-userRecommend">
              <streamer :items="userRecommend" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></streamer>
            </mt-tab-container-item>
          </mt-tab-container>
        </section>
    </div>
</template>

<script>
  import { Swipe, SwipeItem, TabContainer, TabContainerItem, Navbar, TabItem } from 'mint-ui'
  import Streamer from './common/UserStreamer'
  import List from './common/List'
  import ListItem from './common/ListItem'
  import * as api from '../api/index.js'
  import * as utils from '../utils/utils.js'

  export default {
    components: {
      'list': List,
      'list-item': ListItem,
      'nav-bar': Navbar,
      'tab-item': TabItem,
      'swipe': Swipe,
      'swipe-item': SwipeItem,
      'streamer': Streamer,
      'mt-tab-container-item': TabContainerItem,
      'mt-tab-container': TabContainer
    },
    created () {
      this.fetchData()
    },
    data () {
      return {
        sliderContent: [],
        circleRecommend: [],
        activityRecommend: [],
        userRecommend: [],
        busy: false,
        page: 0,
        active: 'tab-circleRecommend'
      }
    },
    computed: {
    },
    methods: {
      fetchData () {
        Promise.all([api.fetchCircleRecommend(), api.fetchActivitiesRecommend(), api.getSliderContent()]).then((result) => {
          let tmp = result[0].map((e) => {
            e['contentTitle'] = e.name
            e['contentSubtitle'] = e.location
            e['content'] = e.introduction
            delete e.name
            delete e.location
            delete e.introduction
            return e
          })
          this.circleRecommend = this.circleRecommend.concat(tmp)

          tmp = result[1].map((e) => {
            e['contentTitle'] = e.title
            // 处理subtitle为 「111人参加 12月10日截止」的形式
            let endDate = new Date(e.durationend)
            let month = `${endDate.getMonth() + 1}`
            let day = `${endDate.getDate()}`
            month = /^\d$/.test(month) ? '0' + month : month
            day = /^\d$/.test(day) ? '0' + day : day
            e['contentSubtitle'] = `${e.attendance} 人参加 ${month}月${day}日 截止`
            e['content'] = e.content
            return e
          })
          this.activityRecommend = this.activityRecommend.concat(tmp)

          this.sliderContent = utils.response2Data(result[2]).h_img
        }).catch((err) => {
          console.error(err)
        })
      },
      fetchCircleRecommend () {
        api.fetchCircleRecommend().then((res) => {
          let tmp = res.map((e) => {
            e['contentTitle'] = e.name
            e['contentSubtitle'] = e.location
            e['content'] = e.introduction
            delete e.name
            delete e.location
            delete e.introduction
            return e
          })
          this.circleRecommend = this.circleRecommend.concat(tmp)
        }).catch((e) => {
          console.error(e)
        })
      },
      fetchActivitiesRecommend () {
        api.fetchActivitiesRecommend().then((response) => {
          let tmp = response.map((e) => {
            e['contentTitle'] = e.name
            e['contentSubtitle'] = e.location
            e['content'] = e.introduction
            delete e.name
            delete e.location
            delete e.introduction
            return e
          })
          this.activityRecommend = this.activityRecommend.concat(tmp)
        })
      },
      fetchUserRecommend: function () {
        // `${Config.usersRecommendsApi}?_page=${this.page}&_limit=5`
        api.fetchUserRecommend(this.page++, 10).then((response) => {
          // 遇到空数据就返回空
          if (response.length === 0) {
            this.busy = true
            setTimeout(e => {
              this.busy = false
            }, 5000) // 收到了空数据则5秒后重试
            return
          }
          this.userRecommend = this.userRecommend.concat(response)
          this.busy = false
        }).catch((err) => {
          console.error(err)
        })
      },
      loadMore () {
        this.busy = true
        this.fetchUserRecommend()
      }
    }
  }

</script>

<style scoped lang="scss">
  @import "../assets/util.scss";
  @import "../assets/var.scss";
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

  .my-swipe {
      height: 25vh;
      width: 100%;
      color: #fff;
      font-size: 30px;
      text-align: center;
  }

  .slide {
  }

  .slide-content {
    width: 100vw;
  }

  .recommend {
      @include list-border();
      padding: $list-padding 0 ;
      background-color: white;
      margin: 0px 0;
      box-shadow: 1px black;
  }

</style>
