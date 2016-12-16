<template>
    <div class="container">
        <swipe class="my-swipe" :speed="900">
            <swipe-item class="slide1"></swipe-item>
            <swipe-item class="slide2"></swipe-item>
            <swipe-item class="slide3"></swipe-item>
        </swipe>
        <slider class="circle-recommend recommend" :title="'—— 圈子推荐 ——'" :items-num="circleRecommend.length">
            <slider-item v-for="item in circleRecommend" :logo="item.logo" :content-title="item.contentTitle" :content-subtitle="item.contentSubtitle" :content="item.content" :itemsNum="circleRecommend.length"></slider-item>
        </slider>
        <slider class="activity-recommend recommend" :title="'—— 活动推荐 ——'" :items-num="activityRecommend.length">
            <slider-item v-for="item in activityRecommend" :logo="item.logo" :content-title="item.contentTitle" :content-subtitle="item.contentSubtitle" :content="item.content" :items-num="activityRecommend.length"></slider-item>
        </slider>
        <streamer :title="'个人推荐'" :items="userRecommend" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></streamer>
    </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'vue-swipe'
  import Slider from './common/Slider'
  import Streamer from './common/Streamer'
  import SliderItem from './common/SliderItem'
  import Config from '../config/setting'

  export default {
    components: {
      'swipe': Swipe,
      'swipe-item': SwipeItem,
      'slider': Slider,
      'streamer': Streamer,
      'slider-item': SliderItem
    },
    created () {
      this.fetchCircleRecommend()
      this.fetchActivitiesRecommend()
    },
    data () {
      return {
        circleRecommend: [],
        activityRecommend: [],
        userRecommend: [],
        busy: false,
        page: 0
      }
    },
    computed: {
    },
    methods: {
      fetchCircleRecommend () {
        this.$http.get(Config.circlesRecommendsApi).then((response) => {
          // TODO 处理异常 全部返回200
          let remoteData
          // 有些服务器返回字符串, 有些则是JSON, 需要判断
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          // 为了组件复用, 这里需要重新组装一下数据
          /**

            'contentTitle' <- name
            'contentSubtitle' <- location
            'content' <- introduction
          **/
          let tmp = remoteData.map((e) => {
            e['contentTitle'] = e.name
            e['contentSubtitle'] = e.location
            e['content'] = e.introduction
            delete e.name
            delete e.location
            delete e.introduction
            return e
          })
          this.circleRecommend = this.circleRecommend.concat(tmp)
        }, (response) => {

        })
      },
      fetchActivitiesRecommend () {
        this.$http.get(Config.activitiesRecommendsApi).then((response) => {
          // TODO 处理异常 全部返回200
          let remoteData
          // 有些服务器返回字符串, 有些则是JSON, 需要判断
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          // 为了组件复用, 这里需要重新组装一下数据
          /**

            'contentTitle' <- name
            'contentSubtitle' <- location
            'content' <- introduction
          **/
          let tmp = remoteData.map((e) => {
            e['contentTitle'] = e.name
            e['contentSubtitle'] = e.location
            e['content'] = e.introduction
            delete e.name
            delete e.location
            delete e.introduction
            return e
          })
          this.activityRecommend = this.activityRecommend.concat(tmp)
        }, (response) => {

        })
      },
      fetchUserRecommend: function () {
        this.$http.get(`${Config.usersRecommendsApi}?_page=${this.page}&_limit=5`).then((response) => {
          if (typeof response.body === 'object') this.userRecommend = this.userRecommend.concat(response.body)
          else this.userRecommend = this.userRecommend.concat(JSON.parse(response.body))
          this.busy = false
        }, (response) => {
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
    .my-swipe {
        height: 200px;
        width: 100%;
        color: #fff;
        font-size: 30px;
        text-align: center;
    }

    .slide1 {
        background-color: #0089dc;
        color: #fff;
    }

    .slide2 {
        background-color: #ffd705;
        color: #000;
    }

    .slide3 {
        background-color: #ff2d4b;
        color: #fff;

    }

    .recommend {
        background-color: white;
        margin: 10px 0;
        box-shadow: 1px black;
    }

</style>
