import * as api from '../api/index.js'
export default {
  data () {
    return {
      _avatarTmp: ''
    }
  },
  methods: {
    // 要求字段名为 avatar
    handleAvatarUpload () {
      this.openIndicator()
      api.wxAuth(['chooseImage', 'uploadImage']).then(res => {
        this.closeIndicator()
        return api.wxChooseImage(1)
      }).then(res => {
        this._avatarTmp = res.localIds[0]
        return api.wxUploadImage(res.localIds[0])
      }).then(res => {
        this.openIndicator()
        return api.uploadAvatarId({serverId: res.serverId})
      }).then(res => {
        this.handleSuccess('UPLOAD_IMAGE_SUCCES')
        this.$emit('avatar-uploaded', this._avatarTmp)
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
  }
}
