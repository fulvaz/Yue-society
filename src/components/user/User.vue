<template lang="html">
  <div class="container">
    <header>
      <img :src="avatar" :alt="nickname" class="avatar">
    </header>
    <section class="main-info">
      <div class="info">
        <span class="username">{{nickname}}</span>
        <span class="location">{{livingPlace}}</span>
        <div class="btns">
          <button v-if="!ifFocused" class="focuse-btn btn" @click="handleFocus">关注</button>
          <button v-else class="unfocuse-btn btn" @click="handleUnfocus">取消关注</button>
          <button class="msg-btn btn" @click="handleMsg">私信</button>
          <button class="appointment-btn btn" @click="handleAppointment">红娘约见</button>
        </div>
      </div>
      <p class="introduction">{{introduction}}</p>
    </section>
    <section class="tags">
      <ul>
        <li v-for="tag in tags"><fz-tag :text="tag"></fz-tag></li>
      </ul>
    </section>

    <section class="conditions">
      <fz-list title="择偶条件">
        <li v-for="(value, key) in conditions">
          <div class="wrapper">
            <span class="key">{{key}}</span>
            <span class="value">{{value}}</span>
          </div>
        </li>
      </fz-list>
    </section>

    <section class="details">
      <fz-list title="基本信息">
        <li v-for="(value, key) in info">
          <div class="wrapper">
            <span class="key">{{key}}</span>
            <span class="value">{{value}}</span>
          </div>
        </li>
      </fz-list>
    </section>

    <!-- 弹出层显示约会见面 -->
    <mt-popup
      v-model="showPopup"
      modal="false"
      closeOnClickModal="false"
      position="right"
      class="popup-appointment"
      style="z-index: 4000"
    >
      <appointment></appointment>
    </mt-popup>
  </div>
</template>

<style scoped lang="scss">
  @import "../../assets/util.scss";

  .container {
    background-color: transparent;

    & > section {
      background-color: white;
    }
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 195px;
    z-index: -1;
    background-color: #A0592B;

    .avatar {
      width: 100px;
      height: 100px;
      border: none;
      border-radius: 50%;
    }
  }

  .main-info {
    position: relative;
    padding: 18px 18px 15px 18px;
    background-color: white;
    .btns {
      // position: absolute;
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      @include clearfix();
    }
    .btn {
      width: 90px;
      padding: 9px 0;
      font-size: 13px;
      color: white;
      background-color: #42bd56;
      border: none;
      border-radius: 3px;
    }

    .msg-btn {
      background-color: #FF2944;
    }

    .appointment-btn {
      background-color: #FF2944;
    }

    .username {
      display: block;
      line-height: 23px;
      font-size: 19px;
      color: #494949;
    }

    .location {
      display: block;
      line-height: 17px;
      font-size: 13px;
      color: #9b9b9b;
    }

    .introduction {
      margin: 0;
      margin-top: 13px;
      line-height: 16px;
      font-size: 13px;
      color: #4a4a4a;
    }
  }

  .tags {
    @include clearfix()
    padding: 0 18px;
    border-top: 1px solid #F2F2F2;
    background-color: white;
    ul {
      margin: 10px 0;
      padding: 0;
    }
    li {
      list-style: none;
      float: left;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }

  li {
    display: flex;
    list-style: none;
    .key {
      display: inline-block;
      width: 100px;
      font-size: 13px;
      line-height: 33px;
    }
    .value {
      display: inline-block;
      font-size: 13px;
      line-height: 33px;
    }
  }

  .conditions {
    margin-top: 15px;
    background-color: white;
  }

  .details {
    margin-top: 15px;
  }

  .popup-appointment {
    position: fixed;
    z-index: 4000 !important;
    width: 100vw;
    height: 100vh;
  }
</style>

<script>
// import wx from 'weixin-js-sdk'
import * as api from '../../api/index.js'
import Tag from '../common/tag'
import List from '../common/List'
import * as utils from '../../utils/utils.js'
import { Popup } from 'mint-ui'
import Appointment from './Appointment'
export default {
  methods: {
    handleAppointment () {
      this.$router.push('/users/appointment/' + this.$route.params.uid)
    },
    handleFocus () {
      api.focus(parseInt(this.$route.params.uid)).then(response => {
        this.$store.dispatch('focus', this.$route.params.uid)
      }).catch(response => {
        console.error(response)
      })
    },
    handleUnfocus () {
      api.unfocus(parseInt(this.$route.params.uid)).then(response => {
        this.$store.dispatch('unfocus', this.$route.params.uid)
      }).catch(response => {
        console.error(response)
      })
    },
    handleMsg () {
      console.log('/message/chat/' + this.$route.params.uid)
      this.$router.push('/message/chat/' + this.$route.params.uid)
    }
  },
  components: {
    'fz-list': List,
    'fz-tag': Tag,
    'mt-popup': Popup,
    'appointment': Appointment
  },
  updated () {
    // this.showPopup = true
  },
  created () {
    api.getUser(this.$route.params.uid).then(response => {
      let data = utils.response2Data(response)
      let keys = Object.keys(utils.objAssign(this.$data))
      keys.forEach(e => {
        this[e] = data[e]
      })
    })
  },
  computed: {
    ifFocused () {
      return this.$store.state.MeState.focus.indexOf(parseInt(this.$route.params.uid)) !== -1
    },
    tags () {
      return [this.height + '厘米', '年收入' + this.income + '元', this.degree, this.house, this.car + '车', this.school]
    },
    conditions () {
      return {
        '体重': `${this.spouseCondition.startweight} - ${this.spouseCondition.endweight}`,
        '身高': `${this.spouseCondition.startheight} - ${this.spouseCondition.endheight}`,
        '年龄': `${this.spouseCondition.startage} - ${this.spouseCondition.endage}`,
        '学历': `${this.spouseCondition.startdegree} - ${this.spouseCondition.enddegree}`,
        '收入': `${this.spouseCondition.startrevenue} - ${this.spouseCondition.endrevenue}`,
        '现居地': this.spouseCondition.livingPlace,
        '出生地': this.spouseCondition.birthplace
      }
    },
    info () {
      // 个人信息
      return {
        '现居地': this.livingPlace,
        '年龄': this.age,
        '身高': this.height,
        '收入': this.income,
        '学历': this.degree,
        '婚姻状况': this.marriage,
        '房子': this.house,
        '车': this.car,
        '民族': this.nation,
        '体重': this.weight,
        '学校': this.school,
        '出生地': this.birthplace,
        '宗教信仰': this.faith,
        '星座': this.starsign
      }
    }
  },
  data () {
    return {
      uid: 0,
      sex: '',
      introduction: '',
      // 个人信息
      avatar: '',
      album: '',
      nickname: '',
      livingPlace: '',
      age: 0,
      height: 0,
      income: 0,
      degree: '',
      marriage: '',
      house: '',
      car: '',
      nation: '',
      weight: 0,
      school: '',
      birthplace: '',
      faith: '',
      starsign: '',
      spouseCondition: {}, // 测试下是否会响应式 大概是不会, 除非用特别的赋值方式
      showPopup: false
    }
  }
}
</script>
