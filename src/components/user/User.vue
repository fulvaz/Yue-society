<template lang="html">
  <div class="container">
    <header v-show="album.length !== 0">
      <div class="photo-container" @click="handlePreviewImage">
        <tr><td class="photo-cell" v-for="photo in album"><img :src="photo" class="photo"></td></tr>
      </div>
    </header>
    <section class="main-info">
      <div class="info">
        <img :src="avatar" :alt="nickname" class="avatar">
        <span class="username">{{nickname}}</span>
        <span class="location">{{livingPlace}}</span>
      </div>
      <p class="introduction">{{introduction}}</p>
      <div class="btns">
        <mt-button v-if="!ifFocused" class="focuse-btn btn" @click="handleFocus">关注</mt-button>
        <mt-button v-else class="unfocuse-btn btn" @click="handleUnfocus">取消关注</mt-button>
        <mt-button class="msg-btn btn" @click="handleMsg">私信</mt-button>
        <mt-button class="appointment-btn btn" @click="underDev">红娘约见</mt-button>
      </div>
    </section>
    <section class="tags">
      <ul>
        <li v-for="tag in tags"><fz-tag :text="tag"></fz-tag></li>
      </ul>
    </section>

    <section class="conditions">
      <fz-list title="择偶条件">
        <li v-for="(value, key) in conditions" v-show="value && value!=='0 - 0'">
          <div class="wrapper">
            <span class="key">{{key}}</span>
            <span class="value">{{value}}</span>
            <span class="unit" v-if="units[key]">{{units[key]}}</span>
          </div>
        </li>
      </fz-list>
    </section>

    <section class="details">
      <fz-list title="基本信息">
        <li v-for="(value, key) in info" v-show="value && value!=='0'">
          <div class="wrapper">
            <span class="key">{{key}}</span>
            <span class="value">{{value}}</span>
            <span class="unit" v-if="units[key]">{{units[key]}}</span>
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
  @import "../../assets/index.scss";

  .container {
    background-color: transparent;

    & > section {
      background-color: white;
    }
  }

  header {
    height: 20vh;
    overflow-x: scroll;
    overflow-y: hidden;
    .photo-container {
      display: table;
      // width: 1000%;
    }
    .photo-cell {
        border-right: 1px solid $list-border-color;
        padding: 0 8px;
    }

    .photo {
      height: 25vh;
    }
  }

  .main-info {
    position: relative;
    padding: 18px 18px 15px 18px;
    background-color: white;

    .avatar {
      float: left;
      width: 40px;
      height: 40px;
      border: none;
      margin-right: 5px;
      border-radius: 50%;
    }

    .btns {
      display: flex;
      margin-top: 15px;
      width: 100%;
      @include clearfix();
    }
    .btn {
      flex: 1 1;
      margin-right: 5px;
      padding: 9px 0;
      font-size: 13px;
      color: white;
      text-align: center;
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
      font-size: $description-size;
      line-height: 33px;
    }
    .value {
      display: inline-block;
      font-size: $description-size;
      line-height: 33px;
    }
    .unit {
      font-size: $description-size;
    }
  }

  .conditions {
    margin: 0 $horizontal-margin;
    margin-top: 15px;
    background-color: white;
  }

  .details {
    margin: 0 $horizontal-margin;
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
import * as api from '../../api/index.js'
import Tag from '../common/tag'
import List from '../common/List'
import * as utils from '../../utils/utils.js'
import { Popup, Button } from 'mint-ui'
import Appointment from './Appointment'
import wx from 'weixin-js-sdk'
import units from '../../assets/units.js'
export default {
  methods: {
    underDev () {
      this.toastMsg('功能即将上线', true)
    },
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
    handlePreviewImage (event) {
      let vm = this
      if (event.target.nodeName.toLowerCase() !== 'img') return
      this.openIndicator()
      api.getWXConfig(window.location.pathname + window.location.hash).then(response => {
        let wxConfig = utils.response2Data(response)
        wxConfig.jsApiList = [
          'previewImage'
        ]
        // wxConfig.debug = process.env.NODE_ENV
        wx.config(wxConfig)
        wx.ready(function (res) {
          vm.closeIndicator()
          let img = event.target
          api.wxPreviewImage(img.src, vm.album)
        })
        wx.error(function (res) {
          console.log('auth failed')
        })
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
    'mt-Button': Button,
    'appointment': Appointment
  },
  updated () {
    // this.showPopup = true
  },
  created () {
    this.units = units
    api.getUser(this.$route.params.uid).then(response => {
      let data = utils.response2Data(response)
      utils.batchAssign(data, this)
    })
  },
  computed: {
    ifFocused () {
      return this.$store.state.MeState.focus.indexOf(parseInt(this.$route.params.uid)) !== -1
    },
    tags () {
      let arr = []
      if (this.height) arr.push(this.height + '厘米')
      if (this.degree) arr.push(this.degree)
      if (this.house) arr.push(this.house)
      if (this.car) arr.push(this.car + '车')
      if (this.school) arr.push(this.school)
      if (this.circleJoined.length !== 0) {
        this.circleJoined.forEach(circle => {
          arr.push(circle.name)
        })
      }
      return arr
      // return [, '年收入' + this.income + '元', this.degree, this.house, this.car + '车', this.school]
    },
    conditions () {
      return {
        '体重': `${this.spouseCondition.startweight} - ${this.spouseCondition.endweight}`,
        '身高': `${this.spouseCondition.startheight} - ${this.spouseCondition.endheight}`,
        '年龄': `${this.spouseCondition.startage} - ${this.spouseCondition.endage}`,
        // '学历': `${this.spouseCondition.startdegree} - ${this.spouseCondition.enddegree}`,
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
        // '学历': this.degree,
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
      uid: '',
      units: {},
      sex: '',
      introduction: '',
      // 个人信息
      avatar: '',
      album: '',
      nickname: '',
      livingPlace: '',
      age: '',
      height: '',
      income: '',
      degree: '',
      marriage: '',
      house: '',
      car: '',
      nation: '',
      weight: '',
      school: '',
      birthplace: '',
      faith: '',
      starsign: '',
      spouseCondition: {}, // 测试下是否会响应式 大概是不会, 除非用特别的赋值方式
      showPopup: false,
      circleJoined: []
    }
  }
}
</script>
