<template>
  <div class="reg-container">
    <fz-avattar-uploader label="" v-model="avatar" class="field"
      v-validate
      data-vv-rules="required"
      data-vv-name="avatar"
      data-vv-value-path="avatar"
      :hasError="errors.has('avatar')"
      :errMsg="errors.first('avatar')"
    >
      <p>请上传近期真实头像</p>
    </fz-avattar-uploader>
    <fz-field label="昵称" name="nickname" v-model="nickname" class="field"
      v-validate
      data-vv-rules="required"
      data-vv-name="nickname"
      data-vv-value-path="nickname"
      :hasError="errors.has('nickname')"
      :errMsg="errors.first('nickname')"
    ></fz-field>
    <!-- <fz-single-picker label="性别" :slotVals="selectSex" v-model="sex" class="field"
      v-validate="sex"
      data-vv-rules="required"
      data-vv-name="sex"
      data-vv-value-path="sex"
      :hasError="errors.has('sex')"
      :errMsg="errors.first('sex')"
    ></fz-single-picker> -->
    <radio :options="sexOptions" label="性别" v-model="sex" class="field"></radio>
    <address-picker label="居住地" v-model="location" class="field"
      v-validate="location"
      data-vv-rules="required"
      data-vv-name="location"
      data-vv-value-path="location"
      :hasError="errors.has('location')"
      :errMsg="errors.first('location')"
    ></address-picker>
    <div class="weight-height">
      <fz-field ref="height" v-model="height" label="身高 cm" class="field"
        v-validate
        data-vv-rules="required|digits:3"
        data-vv-name="height"
        data-vv-value-path="height"
        :hasError="errors.has('height')"
        :errMsg="errors.first('height')"
      ></fz-field>
      <fz-field ref="weight" v-model="weight" label="体重 kg" class="field"
        v-validate
        data-vv-rules="required|numeric|min:2|max:3"
        data-vv-name="weight"
        data-vv-value-path="weight"
        :hasError="errors.has('weight')"
        :errMsg="errors.first('weight')"
      ></fz-field>
    </div>
    <fz-single-picker label="婚姻状况" :slotVals="selectMarriage" v-model="marriage" class="field"
      v-validate="marriage"
      data-vv-rules="required"
      data-vv-name="marriage"
      data-vv-value-path="marriage"
      :hasError="errors.has('marriage')"
      :errMsg="errors.first('marriage')"
    ></fz-single-picker>
    <fz-datepicker label="生日" v-model="birthday" class="field"></fz-datepicker>
    <fz-field label="推荐人" v-model="recommend" placeholder="请输入推荐人手机号, 无则留空" class="field" :disabled="ifFromQR"></fz-field>
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
  import AddressPicker from '../common/AddressPicker'
  import DataPicker from '../common/DatePicker'
  import Radio from '../common/Radio'

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
        sex: 0,
        height: '',
        weight: '',
        marriage: '未婚',
        birthday: '1991-01-01',
        avatar: '',
        location: '',
        // select option
        selectSex: [],
        sexOptions: [],
        selectMarriage: [],
        verifyCodeSentText: '已发送验证码',
        selectDefinition: {},
        ifFromQR: false,
        recommenderMobile: '',
        recommenderName: ''
      }
    },
    computed: {
    },
    components: {
      'radio': Radio,
      'mt-button': Button,
      'fz-field': Input,
      'address-picker': AddressPicker,
      'fz-single-picker': SinglePicker,
      'fz-avattar-uploader': AvatarField,
      'fz-datepicker': DataPicker
    },
    created () {
      // hide tabbar 同时还要将#app的margin-bottom去掉. 用overflow: scroll影响渲染
      this.$root.$refs.tabbar.hide()
      this.$root.$el.style.marginBottom = '0'

      this.openIndicator()
      api.getReg().then(response => {
        let data = utils.response2Data(response)
        this.nickname = data.nickname
        // 如果来自二维码扫描, 则推荐人那栏显示的是名字, 提交的时候注意改成手机号
        if (data.recommenderName && data.recommenderMobile) {
          this.ifFromQR = true
          this.recommenderName = data.recommenderName
          this.recommenderMobile = data.recommenderMobile
          this.recommend = this.recommenderName
        }
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
        this.sexOptions = Object.keys(data.sex).map(key => {
          return {
            value: key + '',
            text: data.sex[key]
          }
        })
        this.sex = Object.keys(data.sex)[0]
        this.selectMarriage = utils.objVals(data.marriage)
      }).catch(response => {
        this.handleNetErrWithReload()
      })
    },
    beforeDestroy () {
      // 这是个单页应用, 改了全局变量就改回去
      console.log(this.$root.$refs.tabbar.open())
    },
    methods: {
      send () {
        this.openIndicator()
        this.$validator.validateAll().then(success => {
          if (!success) {
            let data = {
              uid: this.uid,
              sex: parseInt(this.sex),
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
              recommend: this.ifFromQR ? this.recommenderMobile : this.recommend
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
          // let remain = 60
          // let interval = setInterval(e => {
          //   this.verifyCodeSentText = `已发送验证码(${remain--})`
          //   if (remain === 0) {
          //     window.clearInterval(interval)
          //     this.verifySent = false
          //     this.verifyCodeSentText = '已发送验证码'
          //   }
          // }, 1000)
        }).catch(res => {
          this.toastMsg(`[${res.status}] ${res.statusText}`, true)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/index.scss";
  .reg-container {
    @include clearfix();
    background-color: $global-background-color;
  }

  .weight-height {
    display: flex;
    & > * {
      flex: 1;
    }
  }

  .field {
    border-bottom: 1px solid $list-border-color;
    background-color: white;
  }
  .verify-code-btn {
    position: relative;
    top: 0;
    height: 24px;
    font-size: $description-size;
  }

  .send-btn {
    margin: $horizontal-margin auto;
    display: block;
    font-size: $description-size;
    width: 80%;
  }
</style>
