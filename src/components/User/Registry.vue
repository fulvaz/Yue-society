<template>
  <div class="container">
    <!-- 昵称 验证码 推荐人 用户类型 -->
    <fz-field label="昵称" name="nickname" v-model="nickname" disabled="true"></fz-field>
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

  export default {
    data () {
      return {
        verifySent: false,
        nickname: '',
        mobile: '',
        verifyCode: '',
        userType: '',
        userTypeSlot: [],
        userTypes: {},
        recommend: ''
      }
    },
    components: {
      'mt-button': Button,
      'fz-field': Input,
      'fz-single-picker': SinglePicker
    },
    created () {
      api.getReg().then(response => {
        let data = utils.response2Data(response)
        this.nickname = data.nickname
        this.userTypes = data.userType
        this.userType = data.userType[1]
        this.userTypeSlot = Object.values(data.userType)
      }).catch(response => {
      })
    },
    methods: {
      send () {
        this.openIndicator()
        this.$validator.validateAll().then(success => {
          if (success) {
            let data = {
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
