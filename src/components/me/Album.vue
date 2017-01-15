<template lang="html">
  <div v-if="onLoad" class="container">
    <header>
      <!-- <h1 class="title">{{nickname}}</h1> -->
      <!-- <p class="subtitle">{{introduction}}</p> -->
      <div class="btns" v-if="mode === 'normal'">
          <button class="upload-btn btn" @click="handleUploadBtn">上传</button>
          <button class="upload-btn btn" @click="changeToDeleteMode">删除</button>
      </div>
      <div class="btns" v-if="mode === 'delete'">
          <button class="upload-btn btn" @click="changeToNormalMode">取消</button>
          <button class="upload-btn btn" @click="handleDelete">删除</button>
      </div>
    </header>
    <fz-grid @click.native="handlePreviewImage">
      <fz-grid-item v-for="(img, index) in images" class="grid-item" @click.native="handleImgSelect">
        <input v-show="mode === 'delete'" type="checkbox" :value="index" class="image-select">
        <fz-cover-img :img="img" class="cover-img"></fz-cover-img>
      </fz-grid-item>
    </fz-grid>
  </div>
</template>

<script>
// 这个Album是个管理界面其实

import wx from 'weixin-js-sdk'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import Grid from '../common/layouts/Grid'
import GridItem from '../common/layouts/GridItem'
import CoverImg from '../common/ImageCover'
import { Indicator } from 'mint-ui'
export default {
  components: {
    'fz-grid': Grid,
    'fz-grid-item': GridItem,
    'fz-cover-img': CoverImg
  },
  data () {
    return {
      onLoad: true,
      images: [],
      uid: 0,
      nickname: '',
      introduction: '',
      mode: 'normal',
      imgToDelete: []
    }
  },
  computed: {
    ifMe () {
      return this.uid === this.$store.state.MeState.uid
    }
  },
  created () {
    let vm = this
    Indicator.open('加载中...')
    // console.log(wx)
    api.getWXConfig(window.location.pathname + window.location.hash).then(response => {
      let wxConfig = utils.response2Data(response)
      wxConfig.jsApiList = [
        'chooseImage',
        'previewImage',
        'uploadImage'
      ]
      // wxConfig.debug = process.env.NODE_ENV
      wx.config(wxConfig)
      wx.ready(function (res) {
        vm.onLoad = true
        Indicator.close()
      })
      wx.error(function (res) {
        console.log('auth failed')
      })
    })
    api.getAlbum(this.$store.state.MeState.uid).then(response => {
      let data = utils.response2Data(response)
      this.images = data.images
      this.uid = data.uid
      this.introduction = data.introduction
      this.nickname = data.nickname
    }).catch(response => {
      console.error(response)
    })
  },
  beforeDestroy () {
    Indicator.close()
  },
  methods: {
    handleImgSelect (e) {
      if (e.target.nodeName.toLowerCase() !== 'input') return
      console.log(e.target.value)
      this.imgToDelete.push(e.target.value)
    },
    changeToNormalMode () {
      this.mode = 'normal'
      // this.imgToDelete = []
    },
    changeToDeleteMode () {
      this.mode = 'delete'
    },
    handleUploadBtn () {
      let that = this
      wx.chooseImage({
        count: 9, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // console.log(res.localIds)
          that.uploadImage(res.localIds)
        }
      })
    },
    handleDelete () {
      let data = this.imgToDelete.map(key => {
        return this.images[key]
      })
      this.openIndicator()
      api.deletePhoto(data).then(res => {
        this.imgToDelete.forEach(key => {
          this.images.splice(key, 1)
        })
        this.changeToNormalMode()
        this.handleSuccess('DELETE_IMAGE_SUCCESS')
      }).catch(res => {
        this.handleFailWithCode(res.status, res.statusText)
        this.changeToNormalMode()
      })
    },
    handlePreviewImage (event) {
      if (!event.target.classList.contains('cover-img')) return
      let img = event.target.style.backgroundImage.slice(5, -2)
      api.wxPreviewImage(img, this.images)
    },
    uploadImage (localIds) {
      let that = this
      let i = 0
      this.openIndicator()
      function uploadToWX (id) {
        wx.uploadImage({
          localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success: function (res) {
            // console.log(res.serverId)
            api.uploadImageId(res.serverId).then(response => {
              // 更新数组, 触发响应
              that.images.unshift(id)
              ++i
              // console.log(that.images)
              // console.log(i)
              // console.log(localIds.length)

              // 上传完毕
              if (i >= localIds.length) {
                console.log(i)
                that.handleSuccess('UPLOAD_IMAGE_SUCCESS')
                return
              }
              uploadToWX(localIds[i])
            }).catch(response => {
              that.handleFail('UPLOAD_IMAGE_FAIL')
              console.error(response)
            })
          }
        })
      }
      uploadToWX(localIds[0])
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .btn {
    padding: 5px 20px;
    height: 30px;
    font-size: 12px;
    border: 1px solid rgb(66, 189, 86);
    border-radius: 5px;
    color: rgb(66, 189, 86);
    background-color: transparent;
  }

  header {
    margin: $horizontal-margin 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      margin: 40px 0 15px 0;
      font-size: 24px;
    }

    .subtitle {
      margin: 0;
      margin-bottom: 20px;
      font-size: 12px;
    }
  }

  .grid-item {
    position: relative;
    width: 33%;
    .image-select {
      position: absolute;
      z-index: 1;
    }
  }
</style>
