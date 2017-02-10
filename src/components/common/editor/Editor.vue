<template lang="html">
  <div v-show="show" class="post-editor-container">
    <header>
      <button class="send-btn btn" @click="handleSend">{{confirmBtnText}}</button>
      <span class="title">{{head}}</span>
      <button class="close-btn btn" @click="close">{{cancelBtnText}}</button>
    </header>
    <section class="editor">
      <input v-if="requireTitle" type="text" name="title" v-model="contentTitle" class="title" placeholder="标题" v-validate data-vv-rules="required">
      <span v-if="requireTitle" class="errMsg" v-show="errors.has('title')">{{ errors.first('title') }}</span>
      <textarea name="content" placeholder="正文" class="content" v-model="content" v-validate data-vv-rules="required"></textarea>
      <span class="errMsg" v-show="errors.has('content')">{{ errors.first('content') }}</span>
    </section>
    <section class="functions">
      <el-button v-if="requireImgs" class="img-upload-btn" @click="handleImgUpload">
        <icon name="photo"></icon>
      </el-button>
    </section>
    <grid>
      <grid-item v-for="img in imgs">
        <cover-img :img="img" ></cover-img>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import * as api from '../../../api/index.js'
// import * as utils from '../../utils/utils.js'
import Icon from 'vue-awesome/components/Icon'
import Grid from '../../common/layouts/Grid'
import GridItem from '../../common/layouts/GridItem'
import CoverImg from '../../common/ImageCover'
import 'vue-awesome/icons/photo'
export default {
  components: {
    'icon': Icon,
    'grid': Grid,
    'grid-item': GridItem,
    'cover-img': CoverImg
  },
  props: {
    head: String,
    confirmBtnText: {
      type: String,
      default: '发布'
    },
    cancelBtnText: {
      type: String,
      default: '关闭'
    },
    requireTitle: {
      type: Boolean,
      default: true
    },
    requireImgs: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      content: '',
      contentTitle: '',
      // type: '',
      imgs: [],
      serverIds: [],
      imgLimit: 9,
      imgCurrent: 0,
      _resolve: '',
      _reject: ''
    }
  },
  computed: {
  },
  created () {
  },
  watch: {
  },
  methods: {
    clearAllData () {
      this.content = ''
      this.contentTitle = ''
      this.imgs = []
      this.serverIds = []
      this._resolve = ''
      this._reject = ''
    },
    handleSend (e) {
      this.$validator.validateAll().then(success => {
        if (!success) return
        let data = {
          content: this.content
        }
        if (this.requireTitle) data.contentTitle = this.contentTitle
        if (this.requireImgs) data.imgs = this.serverIds
        this._resolve(data)
      })
    },
    close () {
      this.show = false
    },
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this._resolve = resolve
        this._reject = reject
      })
    },
    handleImgUpload () {
      // 最多只能传9张
      if (this.imgLimit - this.imgCurrent <= 0) {
        this.toast('最多只能选9张图')
        return
      }
      api.wxChooseImage(this.imgLimit - this.imgCurrent).then(res => {
        let localIds = res.localIds
        this.imgCurrent = this.imgs.length + localIds.length
        // 必须要这样处理localIds, 直接赋值给this.imgs不会有作用
        this.imgs.push(...res.localIds)
        return api.wxUploadImages(localIds)
      }).then(serverIds => {
        this.serverIds = serverIds
      }).catch(res => {
        this.closeIndicator()
        this.handleAllFail(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/index.scss';
.post-editor-container {
  z-index: 1000;
  position: fixed;
  box-sizing: border-box;
  background-color: white;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  height: 100%;
  overflow-y: scroll;
}

header {
  border-bottom: 1px solid #F2F2F2;
  display: flex;

  @include clearfix()
  .title {
    flex: 1;
    padding: 14px 0;
    line-height: 17px;
    font-size: 17px;
    text-align: center;
  }

  .send-btn {
    float: left;
  }

  .close-btn {
    float: right;
  }

  .btn {
    padding: 14px 18px;
    color: #42bd56;
    line-height: 17px;
    font-size: 17px;
    border: none;
    background-color: transparent;
  }
}

.editor {
  padding: 0px 18px;
  font-size: 17px;
  .title {
    width: 100%;
    line-height: 45px;
    border-bottom: 1px solid #F2F2F2;
    &::-webkit-input-placeholder {
      font-size: 17px;
      font-weight: 500;
      color: #C1C1C1;
    }
  }
  .content {
      padding: 15px 0;
      width: 100%;
      height: 200px;
      font-size: 17px;
      &::-webkit-input-placeholder {
        font-size: 17px;
        color: #C1C1C1;
      }
  }
}

.functions {
    padding: 0 $horizontal-margin;
    height: 45px;
    border-bottom: 1px solid #F2F2F2;
    border-top: 1px solid #F2F2F2;
    display: flex;

    .img-upload-btn {
      border: none;
      padding: 0;
    }

    .fa-icon {
      width: 1em;
      height: 1em;
      color: $douban-green;
    }

    .type {
      border: $list-border;
    }
}

.errMsg {
  @include errMsg;
}
</style>
