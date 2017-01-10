<template>
  <div class="container">

  </div>
</template>

<script>
  import { Button } from 'mint-ui'
  import Input from '../common/InputField'
  import SinglePicker from '../common/SinglePicker'

  export default {
    data () {
      return {
        nickname: '',
        verifyCode: '',
        userType: ''
      }
    },
    components: {
      'mt-button': Button,
      'fz-field': Input,
      'fz-single-picker': SinglePicker
    },
    created () {
      this.getReg()
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
  .head {
    display: flex;
    height: 70px;
    background-color: #fff;
  }

  .btn-confirm {
    width: 100%;
  }

  .popup {
    width: 100%;
  }
</style>
