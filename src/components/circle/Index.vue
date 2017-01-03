<template>
    <div class="container">
        <slider class="circle-recommend recommend" :title="'—— 圈子推荐 ——'">
            <slider-item v-for="item in circleRecommend" :logo="item.logo" :content-title="item.contentTitle" :content-subtitle="item.contentSubtitle" :content="item.content" :to="'/circles/' + item.id"></slider-item>
        </slider>
        <div class="more"><router-link to="/circles">发现更多圈子</router-link></div>
        <circle-list :title="'我的圈子'" class="circle-my">
            <li v-for="circle in myCircles"><router-link :to="`/circles/${circle.id}`"><circle-list-item :content-title="circle.name" :content-subtitle="circle.memberNum + ' 人'" :logo="circle.logo"></circle-list-item></router-link></li>
        </circle-list>
    </div>
</template>

<script>
  import Slider from '../common/Slider'
  import SliderItem from '../common/SliderItem'
  import Config from '../../config/setting'
  import List from '../common/List'
  import ListItem from '../common/ListItem'

  export default {
    data () {
      return {
        circleRecommend: [],
        myCircles: []
      }
    },
    components: {
      'slider': Slider,
      'slider-item': SliderItem,
      'circle-list': List,
      'circle-list-item': ListItem
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
      fetchMyCircle () {
        this.$http.get(Config.myCircles).then((response) => {
          let remoteData
          if (typeof response.body === 'object') remoteData = response.body
          else remoteData = JSON.parse(response.body)
          this.myCircles = remoteData
        })
      }
    },
    created () {
      this.fetchCircleRecommend()
      this.fetchMyCircle()
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/util.scss";
  .container {
      & > * {
        margin-bottom: 10px;
      }
  }

  .circle-recommend {
    background-color: #fff;
    margin-bottom: 0;
  }

  .more {
    background-color: #fff;
    padding-bottom: 11px;

    a {
      display: block;
      width: 100%;
      text-align: center;
      font-size: 15px;
      @include reseta(#aaa);
    }
  }

  .circle-my {
      li {
        list-style: none;
        padding: 15px 0px;
        border-top: 1px solid #F1F1F1;

        &:last-child {
          border-bottom: 1px solid #F1F1F1;
        }

        a {
          @include reseta(#000)
        }
      }
  }
</style>
