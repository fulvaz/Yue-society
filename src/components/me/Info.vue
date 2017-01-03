<template lang="html">
  <div class="container">
    <fz-input ref="nickname" v-model="nickname" label="昵称" type="nickname" :maxLength="10"></fz-input>
    <fz-textarea ref="introduction" v-model="introduction" label="自我介绍" type="introduction" :maxLength="100"></fz-textarea>
    <fz-input ref="realname" v-model="realname" label="真实姓名" type="realname" :maxLength="10"></fz-input>
    <fz-input ref="school" v-model="school" label="毕业学校" type="school" :maxLength="10"></fz-input>
    <!-- <fz-input ref="age" v-model="age" label="年龄" type="age" :maxLength="2" :regExp="'^\\d\\d$'"></fz-input> -->
    <fz-input ref="height" v-model="height" label="身高" type="height" :maxLength="3" :regExp="'^\\d\\d\\d$'"></fz-input>
    <fz-input ref="weight" v-model="weight" label="体重" type="weight" :maxLength="3" :regExp="'^\\d\\d$'"></fz-input>
    <fz-input ref="income" v-model="income" label="年收入" type="income" :maxLength="20" :regExp="'^\\d+$'"></fz-input>
    <address-picker label="出生地" v-model="birthplace"></address-picker>
    <address-picker label="居住地" v-model="livingPlace"></address-picker>
    <fz-singlepicler label="房子" :slotVals="selectHouse" v-model="house"></fz-singlepicler>
    <fz-datepicker label="生日" v-model="birthday"></fz-datepicker>
    <fz-singlepicler label="性别" :slotVals="selectSex" v-model="sex"></fz-singlepicler>
    <fz-singlepicler label="血型" :slotVals="selectBloodtype" v-model="bloodtype"></fz-singlepicler>
    <fz-singlepicler label="车" :slotVals="selectCar" v-model="car"></fz-singlepicler>
    <fz-singlepicler label="学历" :slotVals="selectDegree" v-model="degree"></fz-singlepicler>
    <fz-singlepicler label="信仰" :slotVals="selectFaith" v-model="faith"></fz-singlepicler>
    <fz-singlepicler label="生肖" :slotVals="selectLunar" v-model="lunar"></fz-singlepicler>
    <fz-singlepicler label="婚姻状况" :slotVals="selectMarriage" v-model="marriage"></fz-singlepicler>
    <fz-singlepicler label="民族" :slotVals="selectNation" v-model="nation"></fz-singlepicler>
    <fz-singlepicler label="星座" :slotVals="selectStarsign" v-model="starsign"></fz-singlepicler>
    <mt-button type="primary" class="submit-btn" @click="handleSubmit">提交</mt-button>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import validState from './valid-state.js'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import AddressPicker from '../common/AddressPicker'
import DatePicker from '../common/DatePicker'
import {Button} from 'mint-ui'
import Input from './input-valide'
import SinglePicker from '../common/SinglePicker'
import TextArea from './ValidTextArea'
export default {
  components: {
    'address-picker': AddressPicker,
    'fz-input': Input,
    'mt-button': Button,
    'fz-datepicker': DatePicker,
    'fz-singlepicler': SinglePicker,
    'fz-textarea': TextArea
  },
  mounted () {
  },
  created () {
    api.fetchMeInfo().then(response => {
      let originalData = {...this.$data}
      Object.keys(originalData).forEach(key => {
        this[key] = response[key]
      })

      // 副作用: 自定义对象需要重新赋初值
      this.ifValid = true

      return api.fetchSelectableItem()
    }).then(response => {
      this.selectBloodtype = utils.obj2arr(response.bloodtype)
      this.selectCar = utils.obj2arr(response.car)
      this.selectDegree = utils.obj2arr(response.degree)
      this.selectFaith = utils.obj2arr(response.faith)
      this.selectHouse = utils.obj2arr(response.house)
      this.selectLunar = utils.obj2arr(response.lunar)
      this.selectMarriage = utils.obj2arr(response.marriage)
      this.selectNation = utils.obj2arr(response.nation)
      this.selectSex = utils.obj2arr(response.sex)
      this.selectStarsign = utils.obj2arr(response.starsign)
      this.selectableItems = response
    }).catch(response => {
      console.error(response)
    })
  },
  methods: {
    handleSubmit () {
      this.ifValid = Object.values(validState).reduce((acc, curr) => {
        return acc && curr
      }, true)
      if (this.ifValid) {
        let data = {
          age: this.age,
          avatar: this.avatar,
          birthday: this.birthday,
          introduction: this.introduction,
          birthplace: this.birthplace,
          bloodtype: utils.value2Key(this.selectableItems.bloodtype, this.bloodtype),
          car: utils.value2Key(this.selectableItems.car, this.car),
          degree: utils.value2Key(this.selectableItems.degree, this.degree),
          faith: utils.value2Key(this.selectableItems.faith, this.faith),
          height: this.height,
          house: utils.value2Key(this.selectableItems.house, this.house),
          income: this.income,
          livingPlace: this.livingPlace,
          lunar: utils.value2Key(this.selectableItems.lunar, this.lunar),
          marriage: utils.value2Key(this.selectableItems.marriage, this.marriage),
          nation: utils.value2Key(this.selectableItems.nation, this.nation),
          nickname: this.nickname,
          realname: this.realname,
          school: this.school,
          sex: utils.value2Key(this.selectableItems.sex, this.sex),
          starsign: utils.value2Key(this.selectableItems.starsign, this.starsign),
          weight: this.weight
        }
        api.sendMeInfo(this.$store.state.MeState.uid, data).then(response => {
          // 跳转
        }).catch(response => {
          // TODO 错误处理
        })
      }
    }
  },
  data () {
    return {
      age: 0,
      introduction: '',
      album: '',
      avatar: '',
      birthday: '',
      birthplace: '',
      bloodtype: '',
      car: '',
      degree: '',
      faith: '',
      focused: '',
      height: 0,
      house: '',
      id: 0,
      income: '',
      livingPlace: '',
      lunar: '',
      marriage: '',
      nation: '',
      nickname: '',
      realname: '',
      school: '',
      sex: '',
      starsign: '',
      weight: '',
      ifValid: true,
      selectBloodtype: [],
      selectCar: [],
      selectDegree: [],
      selectFaith: [],
      selectHouse: [],
      selectLunar: [],
      selectMarriage: [],
      selectNation: [],
      selectSex: [],
      selectStarsign: [],
      selectableItems: []
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .container > * {
  }

  .container {
    .submit-btn {
      width: 100%;
    }
  }
</style>
