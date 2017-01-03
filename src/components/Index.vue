<template>
    <div class="container">
        <swipe class="my-swipe" :speed="900">
            <swipe-item class="slide1"></swipe-item>
            <swipe-item class="slide2"></swipe-item>
            <swipe-item class="slide3"></swipe-item>
        </swipe>
        <slider class="circle-recommend recommend" :title="'—— 圈子推荐 ——'">
            <slider-item v-for="item in circleRecommend" :logo="item.logo" :content-title="item.contentTitle" :content-subtitle="item.contentSubtitle" :content="item.content" :to="'/circles/' + item.id"></slider-item>
        </slider>
        <slider class="activity-recommend recommend" :title="'—— 活动推荐 ——'">
            <slider-item v-for="item in activityRecommend" :logo="item.logo" :content-title="item.contentTitle" :content-subtitle="item.contentSubtitle" :content="item.content" :to="'/activities/' + item.id"></slider-item>
        </slider>
        <streamer :title="'个人推荐'" :items="userRecommend" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"></streamer>
    </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'vue-swipe'
  import Slider from './common/Slider'
  import Streamer from './common/Streamer'
  import SliderItem from './common/SliderItem'
  import * as api from '../api/index.js'

  export default {
    components: {
      'swipe': Swipe,
      'swipe-item': SwipeItem,
      'slider': Slider,
      'streamer': Streamer,
      'slider-item': SliderItem
    },
    created () {
      console.log(this.$data)
      this.fetchData()
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
      fetchData () {
        Promise.all([api.fetchCircleRecommend(), api.fetchActivitiesRecommend()]).then((result) => {
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
        }).catch((err) => {
          console.log('connection err')
          console.log(err)
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
          console.log('connection err')
          console.log(e)
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
        this.page++
        // `${Config.usersRecommendsApi}?_page=${this.page}&_limit=5`
        api.fetchUserRecommend(this.page, 10).then((response) => {
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
          console.log(err)
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
        margin: 0px 0;
        box-shadow: 1px black;
    }

</style>
