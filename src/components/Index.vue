<template>
    <div class="container">
        <swipe class="my-swipe" :auto="3000" :showIndicators="false">
          <swipe-item class="slider" v-for="src in sliderContent">
            <img :src="src" class="slide-content">
          </swipe-item>
        </swipe>
        <section class="main">
          <nav-bar v-model="active" id="navbar">
            <tab-item id="tab-userRecommend" class="navbar-item">用户推荐</tab-item>
            <tab-item id="tab-circleRecommend" class="navbar-item">圈子推荐</tab-item>
            <tab-item id="tab-activitiesRecommend" class="navbar-item">活动推荐</tab-item>
          </nav-bar>
          <mt-tab-container v-model="active">
            <mt-tab-container-item id="tab-circleRecommend" class="tab-container-item">
              <detailed-circle-list :circle="recCircleDisplay"></detailed-circle-list>
              <load-more-btn @click.native="fetchCircleRecommend"></load-more-btn>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-activitiesRecommend" class="tab-container-item">
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
            <mt-tab-container-item id="tab-userRecommend" class="tab-container-item tab-userRecommend">
              <streamer :items="userRecommend" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></streamer>
            </mt-tab-container-item>
          </mt-tab-container>
        </section>
    </div>
</template>

<script>
  import { Swipe, SwipeItem, TabContainer, TabContainerItem, Navbar, TabItem, MessageBox } from 'mint-ui'
  import DetailedCircleList from './common/DetailedCircleList'
  import Streamer from './common/UserStreamer'
  import List from './common/List'
  import ListItem from './common/ListItem'
  import * as api from '../api/index.js'
  import * as utils from '../utils/utils.js'
  import LoadMoreBtn from './common/buttons/LoadMore'

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
      'mt-tab-container': TabContainer,
      'detailed-circle-list': DetailedCircleList,
      'load-more-btn': LoadMoreBtn
    },
    created () {
      this.fetchData()
    },
    data () {
      return {
        sliderContent: [],
        circleRecommend: [],
        circleRecommendPage: 0,
        activityRecommend: [],
        activityRecommendPage: 0,
        userRecommend: [],
        busy: false,
        page: 0,
        active: 'tab-userRecommend'
      }
    },
    computed: {
      recCircleDisplay () {
        return this.circleRecommend.map(e => {
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
    methods: {
      fetchData () {
        Promise.all([api.fetchCircleRecommend(this.circleRecommendPage++, 10), api.fetchActivitiesRecommend(this.activityRecommendPage++, 10), api.getSliderContent()]).then((result) => {
          let tmp = utils.response2Data(result[0]).map((e) => {
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
        api.fetchCircleRecommend(this.circleRecommendPage++, 10).then((res) => {
          let data = utils.response2Data(res)
          this.circleRecommend = this.circleRecommend.concat(data)
        }).catch((e) => {
          console.error(e)
        })
      },
      fetchActivitiesRecommend () {
        api.fetchActivitiesRecommend(this.activityRecommendPage++, 10).then((response) => {
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
        api.fetchUserRecommend(this.page++, 12).then((response) => {
          // 遇到空数据就返回空
          if (response.length === 0) {
            this.busy = true
            setTimeout(e => {
              this.busy = false
            }, 5000) // 收到了空数据则5秒后重试
            return
          }
          // 处理一个新旧api切换的小问题
          response = response.map(e => {
            if (!e.name) e.name = e.nickname
            return e
          })
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
    },
    mounted () {
      let msg = '    欢迎加入月正圆婚恋网！本平台是严肃认真的婚恋交友社交平台，“为保证平台信息准确性，请真实完善个人信息”。平台功能只针对信息完善并实名认证的会员开放。系统实名认证功能正开发调试中，敬请期待！'
      MessageBox('提示', msg)
    }
  }

</script>

<style scoped lang="scss">
  @import "../assets/util.scss";
  @import "../assets/var.scss";
  .tab-container-item {
    box-sizing: border-box;
    padding: 0 $horizontal-margin;
    background-color: white;
  }
  .tab-userRecommend {
    padding: 0 5px;
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
