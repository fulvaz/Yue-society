<template>
  <div class="container">
    <fz-field label="昵称" name="nickname" v-model="nickname" class="field"
      v-validate
      data-vv-rules="required"
      data-vv-name="nickname"
      data-vv-value-path="nickname"
      :hasError="errors.has('nickname')"
      :errMsg="errors.first('nickname')"
    ></fz-field>
    <fz-avattar-uploader label="头像" v-model="avatar" class="field"
      v-validate
      data-vv-rules="required"
      data-vv-name="avatar"
      data-vv-value-path="avatar"
      :hasError="errors.has('avatar')"
      :errMsg="errors.first('avatar')"
    >
      <p>请上传近期真实头像，平台将审核</p>
    </fz-avattar-uploader>
    <fz-single-picker label="性别" :slotVals="selectSex" v-model="sex" class="field"
      v-validate="sex"
      data-vv-rules="required"
      data-vv-name="sex"
      data-vv-value-path="sex"
      :hasError="errors.has('sex')"
      :errMsg="errors.first('sex')"
    ></fz-single-picker>
    <fz-field ref="height" v-model="height" label="身高" class="field" valAppend="厘米"
      v-validate
      data-vv-rules="required|digits:3"
      data-vv-name="height"
      data-vv-value-path="height"
      :hasError="errors.has('height')"
      :errMsg="errors.first('height')"
    ></fz-field>
    <fz-field ref="weight" v-model="weight" label="体重" class="field" valAppend="公斤"
      v-validate
      data-vv-rules="required|numeric|min:2|max:3"
      data-vv-name="weight"
      data-vv-value-path="weight"
      :hasError="errors.has('weight')"
      :errMsg="errors.first('weight')"
    ></fz-field>
    <fz-single-picker label="婚姻状况" :slotVals="selectMarriage" v-model="marriage" class="field"
      v-validate="marriage"
      data-vv-rules="required"
      data-vv-name="marriage"
      data-vv-value-path="marriage"
      :hasError="errors.has('marriage')"
      :errMsg="errors.first('marriage')"
    ></fz-single-picker>
    <fz-datepicker label="生日" v-model="birthday" class="field"></fz-datepicker>
    <fz-field label="推荐人" v-model="recommend" placeholder="请输入推荐人手机号, 无则留空" class="field"></fz-field>
    <fz-field
      class="field"
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
    <fz-field label="验证码" name="verifyCode" v-model="verifyCode" placeholder="请输入验证码" class="field"
      v-validate
      data-vv-rules="required|digits:6"
      data-vv-name="verifyCode"
      data-vv-value-path="verifyCode"
      :hasError="errors.has('verifyCode')"
      :errMsg="errors.first('verifyCode')"
    >
      <mt-button class="verify-code-btn" v-if="verifySent" type="default" name="button" size="small" disabled>{{verifyCodeSentText}}</mt-button>
      <mt-button class="verify-code-btn" v-else type="default" name="button" size="small" @click="getVerifyCode">获取验证码</mt-button>
    </fz-field>
    <fz-single-picker label="交友类型" v-model="userType" :slotVals="userTypeSlot" class="field"></fz-single-picker>
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
        userTypeSlot: [],
        userType: '',
        userTypes: {},
        recommend: '',
        sex: '男',
        height: '',
        weight: '',
        marriage: '未婚',
        birthday: '1991-01-01',
        avatar: '',
        location: '',
        // select option
        selectSex: [],
        selectMarriage: [],
        verifyCodeSentText: '已发送验证码',
        selectDefinition: {}
      }
    },
    computed: {
    },
    components: {
      'mt-button': Button,
      'fz-field': Input,
      'fz-single-picker': SinglePicker,
      'fz-avattar-uploader': AvatarField,
      'fz-datepicker': DataPicker
    },
    created () {
      this.openIndicator()
      api.getReg().then(response => {
        let data = utils.response2Data(response)
        this.nickname = data.nickname
        this.uid = data.uid
        this.location = data.location
        this.userTypes = data.userType
        this.userType = data.userType[2]
        this.userTypeSlot = Object.values(data.userType)
        return api.fetchSelectableItem()
      }).then(res => {
        this.closeIndicator()
        let data = res
        this.selectDefinition = data
        this.selectSex = utils.objVals(data.sex)
        this.selectMarriage = utils.objVals(data.marriage)
      }).catch(response => {
        this.handleNetErrWithReload()
      })
    },
    methods: {
      send () {
        this.openIndicator()
        this.$validator.validateAll().then(success => {
          if (success) {
            let data = {
              uid: this.uid,
              sex: utils.value2Key(this.selectDefinition.sex, this.sex),
              height: this.height,
              weight: this.weight,
              marriage: utils.value2Key(this.selectDefinition.marriage, this.marriage),
              birthday: utils.Date2YMD(this.birthday),
              location: this.location,
              // avatar: '',
              verifyCode: this.verifyCode,
              mobile: this.mobile,
              nickname: this.nickname,
              userType: utils.value2Key(this.userTypes, this.userType),
              recommend: this.recommend
            }
            console.log(data)
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
        if (!this.$validator.validate('mobile', this.mobile)) {
          return
        }
        api.getVerifyCode(this.mobile).then(res => {
          this.verifySent = true
          let remain = 60
          setInterval(e => {
            this.verifyCodeSentText = `已发送验证码(${remain--})`
          }, 1000)
        }).catch(res => {
          this.toastMsg(`[${res.status}] ${res.statusText}`, true)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .field {
    border-top: 1px solid $mt-border-color;
    &:first-child {
      border-top: none;
    }

    background-color: white;

    // .mint-cell .mint-cell-wrapper {
    //   background-image: none !important;
    // }
  }
  .verify-code-btn {
    font-size: $description-size;

  }

  .send-btn {
    width: 100%;
  }
</style>
