<template lang="html">
  <div class="index-container">
    <slider title="系统推荐" class="paid-recommend">
      <h2 slot="heading" class="rec-heading"><fa-icon name="star" class="icon"></fa-icon>系统推荐</h2>
      <slider-item v-for="item in paidUserRecommend">
        <user-item
          :uid="item.uid"
          :nickname="item.nickname"
          :avatar="item.avatar"
          :livingplace="item.livingplace"
          :weight="item.weight"
          :height="item.height"
          :age="item.age"
          :focused="item.focused"
          :photoNum="item.photoNum"
          :sex="item.sex"
          :intro="item.introduction"
          :income="item.income"
          :school="item.school"
          :house="item.house"
          :me="me"
          :car="item.car"
          :birthplace="item.birthplace"
          >
        </user-item>
      </slider-item>
    </slider>
    <act-min title="活动推荐" :activities="activityRecommend" class="act-recommend">
      <h2 slot="heading" class="rec-heading"><fa-icon name="star" class="icon"></fa-icon>活动推荐</h2>
    </act-min>
    <post-min title="话题推荐" :topic="topicRecommend" class="post-recommend">
      <h2 slot="heading" class="rec-heading"><fa-icon name="star" class="icon"></fa-icon>话题推荐</h2>
    </post-min>
    <user-steam :items="userRecommend">
      <h2 slot="heading" class="rec-heading"><fa-icon name="star" class="icon"></fa-icon>用户推荐</h2>
    </user-steam>
    <load-more-btn @click.native="getUserRecommend" text="下一组"></load-more-btn>
  </div>
</template>

<script>
import * as api from '../api/index.js'
import * as utils from '../utils/utils.js'
import Slider from './common/Slider'
import SliderItem from './common/SliderItem'
import UserItem from './common/DetailedUserListItem'
import ActMin from './index/ActivityMin'
import PostMin from './index/PostMin'
import Streamer from './common/UserStreamer'
import LoadMoreBtn from './common/buttons/LoadMore'

import 'vue-awesome/icons/star'

export default {
  components: {
    'slider': Slider,
    'slider-item': SliderItem,
    'user-item': UserItem,
    'act-min': ActMin,
    'post-min': PostMin,
    'user-steam': Streamer,
    'load-more-btn': LoadMoreBtn
  },
  data () {
    return {
      userRecommend: [],
      userRecommendPage: 0,
      paidUserRecommend: [],
      paidUserRecommendPage: 0,
      activityRecommend: [],
      activityRecommendPage: 0,
      topicRecommend: [],
      topicRecommendPage: 0,
      me: {}
    }
  },
  methods: {
    getUserRecommend () {
      this.openIndicator()
      return new Promise((resolve, reject) => {
        api.getUserRecommend(this.userRecommendPage++, 24).then(response => {
          this.closeIndicator()
          let remoteData = utils.response2Data(response)
          this.userRecommend = this.userRecommend.concat(remoteData)
          resolve(remoteData)
        }).catch(res => {
          reject(res)
          this.handleAllFail(res)
        })
      })
    },
    getPaidUserRecommend () {
      this.openIndicator()
      return new Promise((resolve, reject) => {
        api.getPaidUserRecommend(this.paidUserRecommendPage++, 10).then(response => {
          this.closeIndicator()
          let remoteData = utils.response2Data(response)
          this.paidUserRecommend = this.paidUserRecommend.concat(remoteData)
          resolve(remoteData)
        }).catch(res => {
          reject(res)
          this.handleAllFail(res)
        })
      })
    },
    getTopicRecommend () {
      this.openIndicator()
      return new Promise((resolve, reject) => {
        api.getTopicRecommend(this.topicRecommendPage++, 5).then(response => {
          this.closeIndicator()
          let remoteData = utils.response2Data(response)
          this.topicRecommend = this.topicRecommend.concat(remoteData)
          resolve(remoteData)
        }).catch(res => {
          reject(res)
          this.handleAllFail(res)
        })
      })
    },
    getActivityRecommend () {
      this.openIndicator()
      return new Promise((resolve, reject) => {
        api.getActivitiesRecommend(this.activityRecommendPage++, 5).then((response) => {
          this.closeIndicator()
          let remoteData = utils.response2Data(response)
          this.activityRecommend = this.activityRecommend.concat(remoteData)
          resolve(remoteData)
        }).catch(res => {
          this.closeIndicator()
          reject(res)
          this.handleAllFail(res)
        })
      })
    }
  },
  created () {
    console.log(this.getUserRecommend)
    this.getUserRecommend().then(res => {
      return this.getPaidUserRecommend()
    }).then(res => {
      return this.getActivityRecommend()
    }).then(res => {
      return this.getTopicRecommend()
    }).then(res => {
      return api.fetchMeInfo()
    }).then(res => {
      this.me = utils.response2Data(res)
    }).catch(res => {
      console.error(res)
      this.closeIndicator()
      this.handleFatalErr()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/index.scss";
 .index-container {
    background: $global-background-color;
 }

 .icon {
   width: 12px;
   height: 12px;
   color: $main-pink;
 }

 .paid-recommend {
   margin-bottom: $section-margin;
 }

 .act-recommend {
   margin-bottom: $section-margin;
 }

 .post-recommend {
   margin-bottom: $section-margin;
 }

 .rec-heading {
   margin: 0;
   margin-bottom: 5px;
   padding: 5px 0;
   @include item-description;
   border: 1px solid $list-border-color;
  //  background: $main-pink;
 }

</style>
