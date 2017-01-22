<template lang="html">
  <div v-show="show" class="post-editor-container">
    <header>
      <span class="title">发布动态</span>
      <button class="send-btn btn" @click="handleSend">发布</button>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="editor">
      <textarea name="content" placeholder="正文" class="content" v-model="content" v-validate data-vv-rules="required"></textarea>
      <span class="errMsg" v-show="errors.has('content')">{{ errors.first('content') }}</span>
    </section>
    <section class="functions">
      <el-button class="img-upload-btn" @click="handleImgUpload">
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
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import SinglePicker from '../common/SinglePicker'
import Icon from 'vue-awesome/components/Icon'
import Grid from '../common/layouts/Grid'
import GridItem from '../common/layouts/GridItem'
import CoverImg from '../common/ImageCover'
import 'vue-awesome/icons/photo'
let that
export default {
  components: {
    'fz-picker': SinglePicker,
    'icon': Icon,
    'grid': Grid,
    'grid-item': GridItem,
    'cover-img': CoverImg
  },
  props: {
    category: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      show: false,
      title: '',
      content: '',
      type: '',
      imgs: [],
      serverIds: [],
      imgLimit: 9,
      imgCurrent: 0
    }
  },
  computed: {
    slotVal () {
      return utils.obj2arr(this.category)
    }
  },
  created () {
    that = this // 给全局函数使用
  },
  watch: {
    category () {
      if (this.category.length === 0) return
      this.type = utils.obj2arr(this.category)[0]
    }
  },
  methods: {
    handleSend (e) {
      let data = {
        content: this.content,
        uid: this.$store.state.MeState.uid,
        circleId: parseInt(this.$route.params.id),
        // date: (new Date()).toString(),
        serverIds: this.serverIds
      }
      let momentDisplay = {
        uid: this.$store.state.MeState.uid,
        avatar: this.$store.state.MeState.avatar,
        nickname: this.$store.state.MeState.nickname,
        content: this.content,
        imgs: this.imgs,
        date: (new Date()).toString()
      }
      this.$validator.validateAll().then(success => {
        if (!success) return
        this.openIndicator()
        api.newCircleMoments(data).then(response => {
          this.closeIndicator()
          this.toast(this.$text.NEW_MOMENT_SUCCESS)
          this.$emit('input', momentDisplay)
          // 清空输入框
          this.title = ''
          this.content = ''
          this.close()
        }).catch(response => {
          console.error(response)
          this.handleFail('NEW_POST_FAIL')
        })
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
    },
    close () {
      this.show = false
    }
  },
  open () {
    that.show = true
  },
  close () {
    that.show = false
  }
}
</script>


<style lang="scss" scoped>
  @import '../../assets/index.scss';
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

    @include clearfix()
    .title {
      z-index: -1;
      position: absolute;
      display: block;
      padding: 14px 0;
      width: 100%;
      height: 17px;
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
