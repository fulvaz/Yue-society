<template lang="html">
  <div class="container">
    <section class="main">
      <h1 class="title">{{title}}</h1>
      <fz-info-list :info="basicInfo"></fz-info-list>
    </section>
    <section class="functions">
      <button v-if="!ifJoined()" class="btn takepart-btn" @click="handleTakepart">参加</button>
      <button v-else class="btn takepart-btn" disabled>已参加</button>
    </section>
    <section class="detail">
      <h1>活动详情</h1>
      <p>
        {{content}}
      </p>
    </section>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import InfoList from '../common/InfoList'
export default {
  components: {
    'fz-info-list': InfoList
  },
  created () {
    api.getActivity(this.$route.params.id).then(response => {
      let data = utils.response2Data(response)
      Object.keys({...this.$data}).forEach(key => {
        this[key] = data[key]
      })
    })
  },
  data () {
    return {
      id: 0,
      circleId: 2,
      title: '',
      content: '',
      attendance: '',
      logo: '',
      durationstart: '',
      durationend: '',
      location: ''
    }
  },
  computed: {
    basicInfo () {
      return {
        '截止时间': utils.date2MMDDHHMM(this.durationend),
        '地点': this.location,
        '已参加人数': this.attendance
      }
    }
  },
  methods: {
    handleTakepart () {
      let data = {
        uid: this.$store.state.MeState.uid,
        activityId: parseInt(this.$route.params.id)
      }
      this.openIndicator()
      api.takePartIn(data).then(res => {
        this.handleSuccess('ENTER_ACTIVITY_SUCCESS')
        let actId = this.$route.params.id
        this.$store.dispatch('takePartInActivity', parseInt(actId))
      }).catch(res => {
        this.handleFail('ENTER_ACTIVITY_FAIL')
        this.closeIndicator()
        console.error(res)
      })
    },
    ifJoined () {
      let actId = parseInt(this.$route.params.id)
      return this.$store.state.MeState.joinedActivities.indexOf(actId) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 18px;
  }

  .title {
    font-size: 20px;
  }

  .main {
    margin-bottom: 15px;
  }

  .detail {
    margin-top: 24px;
    padding-bottom: 24px;
    h1 {
      color: #072;
      font-size: 17px;
    }
  }

  .functions {
    .btn {
      padding: 4px 8px;
      font-size: 12px;
      line-height: 18px;
      border: 1px solid #FF9092;
      border-radius: 5px;
      color: #FF9092;
      background-color: #FFD4D5;
    }
  }
</style>
