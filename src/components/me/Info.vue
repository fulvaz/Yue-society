<template lang="html">
  <div class="container">
    <fz-input ref="nickname" v-model="nickname" label="昵称" type="nickname" :maxLength="10"></fz-input>
    <fz-input ref="age" v-model="age" label="年龄" type="age" :maxLength="2" :regExp="'^\\d\\d$'"></fz-input>
    <address-picker label="出生地" v-model="birthplace"></address-picker>
    <address-picker label="居住地" v-model="livingPlace"></address-picker>
    <fz-datepicker label="生日" v-model="birthday"></fz-datepicker>
    <fz-singlepicler label="血型" :slotVals="selectBloodtype" v-model="bloodtype"></fz-singlepicler>
    <fz-singlepicler label="车" :slotVals="selectCar" v-model="car"></fz-singlepicler>
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
export default {
  components: {
    'address-picker': AddressPicker,
    'fz-input': Input,
    'mt-button': Button,
    'fz-datepicker': DatePicker,
    'fz-singlepicler': SinglePicker
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
    }).catch(response => {
      console.error(response)
    })
  },
  methods: {
    handleSubmit () {
      this.ifValid = Object.values(validState).reduce((acc, curr) => {
        return acc && curr
      }, true)
    }
  },
  data () {
    return {
      age: 0,
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
      selectStarsign: []
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .container > * {
    margin: 1px;
  }

  .container {
    .submit-btn {
      width: 100%;
    }
  }
</style>
