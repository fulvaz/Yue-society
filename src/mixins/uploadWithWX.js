import * as api from '../api/index.js'
let avaTmp = ''
export default {
  methods: {
    // 要求字段名为 avatar
    handleAvatarUpload () {
      this.openIndicator()
      api.wxAuth(['chooseImage', 'uploadImage']).then(res => {
        this.closeIndicator()
        return api.wxChooseImage(1)
      }).then(res => {
        avaTmp = res.localIds[0]
        return api.wxUploadImage(res.localIds[0])
      }).then(res => {
        this.openIndicator()
        return api.uploadAvatarId({serverId: res.serverId})
      }).then(res => {
        this.avatar = avaTmp
        this.handleSuccess('UPLOAD_IMAGE_SUCCES')
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
      })
    }
  }
}
