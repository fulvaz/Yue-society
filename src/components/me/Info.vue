<template lang="html">
  <div class="container">
    <fz-input
      v-model="nickname"
      label="昵称"
      class="field"
      v-validate
      data-vv-rules="required"
      data-vv-name="nickname"
      data-vv-value-path="nickname"
      :hasError="errors.has('nickname')"
      :errMsg="errors.first('nickname')"
      >
    </fz-input>
    <fz-singlepicler label="性别" :slotVals="selectSex" v-model="sex" class="field"
      v-validate="sex"
      data-vv-rules="required"
      data-vv-name="sex"
      data-vv-value-path="sex"
      :hasError="errors.has('sex')"
      :errMsg="errors.first('sex')"
    ></fz-singlepicler>
    <fz-input ref="height" v-model="height" label="身高" class="field" valAppend="厘米"
      v-validate
      data-vv-rules="required|digits:3"
      data-vv-name="height"
      data-vv-value-path="height"
      :hasError="errors.has('height')"
      :errMsg="errors.first('height')"
    ></fz-input>
    <fz-input ref="weight" v-model="weight" label="体重" class="field" valAppend="公斤"
      v-validate
      data-vv-rules="required|numeric|min:2|max:3"
      data-vv-name="weight"
      data-vv-value-path="weight"
      :hasError="errors.has('weight')"
      :errMsg="errors.first('weight')"
    ></fz-input>
    <address-picker label="出生地" v-model="birthplace" class="field"
      v-validate="birthplace"
      data-vv-rules="required"
      data-vv-name="birthplace"
      data-vv-value-path="birthplace"
      :hasError="errors.has('birthplace')"
      :errMsg="errors.first('birthplace')"
    ></address-picker>
    <fz-singlepicler label="婚姻状况" :slotVals="selectMarriage" v-model="marriage" class="field"
      v-validate="marriage"
      data-vv-rules="required"
      data-vv-name="marriage"
      data-vv-value-path="marriage"
      :hasError="errors.has('marriage')"
      :errMsg="errors.first('marriage')"
    ></fz-singlepicler>
    <fz-datepicker label="生日" v-model="birthday" class="field"></fz-datepicker>
    <address-picker label="居住地" v-model="livingPlace" class="field"></address-picker>
    <fz-textarea v-model="introduction" label="自我介绍" class="field"
      v-validate="introduction"
      data-vv-rules="required|min:30"
      data-vv-name="introduction"
      data-vv-value-path="introduction"
      :hasError="errors.has('introduction')"
      :errMsg="introErrMsg"
      >
    </fz-textarea>
    <fz-input ref="realname" v-model="realname" label="真实姓名" type="realname" :maxLength="10" class="field"></fz-input>
    <fz-input ref="school" v-model="school" label="毕业学校" type="school" :maxLength="10" class="field"></fz-input>
    <!-- <fz-input ref="age" v-model="age" label="年龄" type="age" :maxLength="2" :regExp="'^\\d\\d$'"></fz-input> -->
    <!-- <fz-input ref="income" v-model="income" label="年收入" type="income" :maxLength="20" :regExp="'^\\d+$'" class="field" valAppend="万元"></fz-input> -->
    <fz-singlepicler label="年收入" :slotVals="selectIncome" v-model="income" class="field" appendVal="万元"></fz-singlepicler>
    <fz-singlepicler label="房子" :slotVals="selectHouse" v-model="house" class="field"></fz-singlepicler>
    <fz-singlepicler label="血型" :slotVals="selectBloodtype" v-model="bloodtype" class="field"></fz-singlepicler>
    <fz-singlepicler label="车" :slotVals="selectCar" v-model="car" class="field"></fz-singlepicler>
    <fz-singlepicler label="学历" :slotVals="selectDegree" v-model="degree" class="field"></fz-singlepicler>
    <fz-singlepicler label="信仰" :slotVals="selectFaith" v-model="faith" class="field"></fz-singlepicler>
    <!-- <fz-singlepicler label="生肖" :slotVals="selectLunar" v-model="lunar" class="field"></fz-singlepicler> -->
    <fz-singlepicler label="民族" :slotVals="selectNation" v-model="nation" class="field"></fz-singlepicler>
    <!-- <fz-singlepicler label="星座" :slotVals="selectStarsign" v-model="starsign" class="field"></fz-singlepicler> -->
    <mt-button type="primary" class="submit-btn" @click="handleSubmit">提交</mt-button>
  </div>
</template>

<script>
// import {mapState} from 'vuex'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import AddressPicker from '../common/AddressPicker'
import DatePicker from '../common/DatePicker'
import {Button} from 'mint-ui'
import Input from '../common/InputField'
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
      let data = utils.response2Data(response)
      Object.keys(data).forEach(key => {
        if (data[key] && this[key] !== undefined) {
          this[key] = data[key]
        }
      })
      // 额外对属性进行转换 嗯, 进行函数操作前必须先验证数据
      if (this.birthday.length !== 0) {
        this.birthday = utils.normalizeDate(data.birthday)
      }
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
      this.selectIncome = ['0 - 5', '5 - 10', '10 - 20', '20 - 30', '30 - 50', '50以上']
      this.selectableItems = response
    }).catch(response => {
      console.error(response)
    })
  },
  methods: {
    handleSubmit () {
      let data = {
        age: this.age,
        avatar: this.avatar,
        birthday: utils.Date2YMD(this.birthday),
        introduction: this.introduction,
        birthplace: this.birthplace,
        bloodtype: this.bloodtype,
        car: utils.value2Id(this.selectableItems.car, this.car),
        degree: utils.value2Id(this.selectableItems.degree, this.degree),
        faith: utils.value2Id(this.selectableItems.faith, this.faith),
        height: this.height,
        house: utils.value2Id(this.selectableItems.house, this.house),
        income: this.income,
        livingPlace: this.livingPlace,
        // lunar: utils.value2Id(this.selectableItems.lunar, this.lunar),
        marriage: utils.value2Id(this.selectableItems.marriage, this.marriage),
        nation: utils.value2Id(this.selectableItems.nation, this.nation),
        nickname: this.nickname,
        realname: this.realname,
        school: this.school,
        sex: utils.value2Id(this.selectableItems.sex, this.sex),
        // starsign: utils.value2Id(this.selectableItems.starsign, this.starsign),
        weight: this.weight
      }
      this.$validator.validateAll().then(success => {
        if (success) {
          this.openIndicator()
          api.sendMeInfo(this.$store.state.MeState.uid, data).then(response => {
            this.handleSuccess('EDIT_BASIC_SUCCESS')
            this.$router.push('/me')
          }).catch(response => {
            console.error(response)
            this.handleFail('EDIT_BASIC_FAIL')
          })
        } else {
          this.toast('您的信息填写有误 请修正')
        }
      })
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
      selectIncome: [],
      selectableItems: []
    }
  },
  computed: {
    introErrMsg () {
      if (!this.errors.has('introduction')) return
      let err = this.errors.collect('introduction', false, false)[0] // 只有一个inroduction 放心用
      if (err.rule === 'min') {
        return err.msg.slice(0, -3) + '个字'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .field {
    border-top: 1px solid $list-border-color;
    &:first-child {
      border-top: none;
    }

    background-color: white;

    // .mint-cell .mint-cell-wrapper {
    //   background-image: none !important;
    // }
  }

  .container {
    .submit-btn {
      width: 100%;
    }
  }
</style>
