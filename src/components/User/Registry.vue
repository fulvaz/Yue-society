<template>
  <div class="container">
    <!-- 昵称 验证码 推荐人 用户类型 -->
    <fz-field label="昵称" name="nickname" v-model="nickname" disabled="true"></fz-field>
    <fz-avattar-uploader label="头像" v-model="avatar"
      v-validate="avatar"
      data-vv-rules="required"
      data-vv-name="avatar"
      data-vv-value-path="avatar"
      :hasError="errors.has('avatar')"
      :errMsg="errors.first('avatar')"
    ></fz-avattar-uploader>
    <fz-field
      label="手机号"
      v-model="mobile"
      placeholder="请输入手机号"
      v-validate
      data-vv-rules="required|digits:11"
      data-vv-name="mobile"
      data-vv-value-path="mobile"
      :hasError="errors.has('mobile')"
      :errMsg="errors.first('mobile')">
    </fz-field>
    <fz-field label="验证码" name="verifyCode" v-model="verifyCode" placeholder="请输入验证码"
      v-validate
      data-vv-rules="required|digits:6"
      data-vv-name="verifyCode"
      data-vv-value-path="verifyCode"
      :hasError="errors.has('verifyCode')"
      :errMsg="errors.first('verifyCode')"
    >
      <button v-if="verifySent" type="button" name="button" disabled>已经发送验证码</button>
      <button v-else type="button" name="button" @click="getVerifyCode">获取验证码</button>
    </fz-field>
    <fz-single-picker label="性别" :slotVals="selectSex" v-model="sex" class="field"
      v-validate="sex"
      :required="true"
      data-vv-rules="required"
      data-vv-name="sex"
      data-vv-value-path="sex"
      :hasError="errors.has('sex')"
      :errMsg="errors.first('sex')"
    ></fz-single-picker>
    <fz-field ref="height" v-model="height" label="身高" class="field" valAppend="厘米"
      v-validate
      :required="true"
      data-vv-rules="required|digits:3"
      data-vv-name="height"
      data-vv-value-path="height"
      :hasError="errors.has('height')"
      :errMsg="errors.first('height')"
    ></fz-field>
    <fz-field ref="weight" v-model="weight" label="体重" class="field" valAppend="公斤"
      v-validate
      :required="true"
      data-vv-rules="required|digits:2"
      data-vv-name="weight"
      data-vv-value-path="weight"
      :hasError="errors.has('weight')"
      :errMsg="errors.first('weight')">
    ></fz-field>
    <fz-single-picker label="婚姻状况" :slotVals="selectMarriage" v-model="marriage" class="field"
      v-validate="marriage"
      :required="true"
      data-vv-rules="required"
      data-vv-name="marriage"
      data-vv-value-path="marriage"
      :hasError="errors.has('marriage')"
      :errMsg="errors.first('marriage')"
    ></fz-single-picker>
    <fz-datepicker label="生日" v-model="birthday" class="field"></fz-datepicker>
    <fz-field label="推荐人" v-model="recommend" placeholder="无则留空"></fz-field>
    <fz-single-picker label="交友类型" v-model="userType" :slotVals="userTypeSlot"></fz-single-picker>
    <mt-button type="primary" class="send-btn" @click="send">提交</mt-button>
  </div>
</template>

<script>
  import * as api from '../../api/index.js'
  import * as utils from '../../utils/utils.js'
  import { Button } from 'mint-ui'
  import Input from '../common/InputField'
  import SinglePicker from '../common/SinglePicker'
  import AvatarField from '../common/AvatarField'
  import DataPicker from '../common/DatePicker'

  export default {
    data () {
      return {
        uid: '',
        verifySent: false,
        nickname: '',
        mobile: '',
        verifyCode: '',
        userType: '',
        userTypeSlot: [],
        userTypes: {},
        recommend: '',
        sex: '',
        height: '',
        weight: '',
        marriage: '',
        birthday: '1991-01-01',
        avatar: '',

        // select option
        selectSex: [],
        selectMarriage: [],

        selectDefinition: {}
      }
    },
    components: {
      'mt-button': Button,
      'fz-field': Input,
      'fz-single-picker': SinglePicker,
      'fz-avattar-uploader': AvatarField,
      'fz-datepicker': DataPicker
    },
    created () {
      api.getReg().then(response => {
        let data = utils.response2Data(response)
        this.nickname = data.nickname
        this.uid = data.uid
        this.userTypes = data.userType
        this.userType = data.userType[2]
        this.userTypeSlot = Object.values(data.userType)
      }).catch(response => {
      })
      api.fetchSelectableItem().then(res => {
        let data = res
        this.selectDefinition = data
        this.selectSex = utils.objVals(data.sex)
        this.selectMarriage = utils.objVals(data.marriage)
      })
    },
    methods: {
      send () {
        this.openIndicator()
        this.$validator.validateAll().then(success => {
          if (success) {
            let data = {
              uid: this.uid,
              sex: utils.value2Key(this.sex, this.selectDefinition.sex),
              height: this.height,
              weight: this.weight,
              marriage: utils.value2Key(this.marriage, this.selectDefinition.marriage),
              birthday: this.birthday,
              // avatar: '',
              verifyCode: this.verifyCode,
              mobile: this.mobile,
              nickname: this.nickname,
              userType: utils.value2Key(this.userTypes, this.userType),
              recommend: this.recommend
            }
            return api.sendReg(data)
          } else {
            let err = new Error()
            err.status = ''
            err.statusText = '信息填写有误'
            throw err
          }
        }).then(res => {
          this.handleSuccess('REG_SUCCESS')
          this.$router.push('/')
        }).catch(res => {
          this.handleFail(`${res.status} ${res.statusText}`, true)
        })
      },
      getVerifyCode () {
        api.getVerifyCode(this.mobile).then(res => {
          this.verifySent = true
        }).catch(res => {
          this.toastMsg(`[${res.status}] ${res.statusText}`, true)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .send-btn {
    width: 100%;
  }
</style>
