import * as api from '../api/index.js'
export default {
  methods: {
    // 要求字段名为 avatar
    handleAvatarUpload () {
      this.openIndicator()
      api.wxAuth(['chooseImage', 'uploadImage']).then(res => {
        this.closeIndicator()
        return api.wxChooseImage(1)
      }).then(res => {
        this.avatar = res.localIds[0]
        return api.wxUploadImage(res.localIds[0])
      }).then(res => {
        this.openIndicator()
        return api.uploadAvatarId({serverId: res.serverId})
      }).then(res => {
        this.handleSuccess('UPLOAD_IMAGE_SUCCES')
      }).catch(res => {
        console.log(res)
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
  }
}
