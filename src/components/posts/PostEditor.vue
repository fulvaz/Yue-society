<template lang="html">
  <div v-show="show" class="post-editor-container">
    <header>
      <span class="title">圈子发言</span>
      <button class="send-btn btn" @click="handleSend">发布</button>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="editor">
      <input type="text" name="title" v-model="title" class="title" placeholder="标题" v-validate data-vv-rules="required">
      <span class="errMsg" v-show="errors.has('title')">{{ errors.first('title') }}</span>
      <textarea name="content" placeholder="正文" class="content" v-model="content" v-validate data-vv-rules="required"></textarea>
      <span class="errMsg" v-show="errors.has('content')">{{ errors.first('content') }}</span>
    </section>
    <section class="functions">
      <fz-picker class="type" label="帖子类型" v-model="type" :slotVals="slotVal"></fz-picker>
    </section>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import SinglePicker from '../common/SinglePicker'
let that
export default {
  components: {
    'fz-picker': SinglePicker
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
      type: ''
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
        title: this.title,
        content: this.content,
        uid: this.$store.state.MeState.uid,
        circleId: parseInt(this.$route.params.id),
        date: (new Date()).toString(),
        type: parseInt(utils.value2Key(this.category, this.type))
      }
      this.$validator.validateAll().then(success => {
        if (!success) return
        this.openIndicator()
        api.newPost(data).then(response => {
          this.handleSuccess('NEW_POST_SUCCESS')
          this.$emit('input', data)
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
    height: 100vh;
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
      height: 45px;
      border-bottom: 1px solid #F2F2F2;
      border-top: 1px solid #F2F2F2;

      .type {
        border: $list-border;
      }
  }

  .errMsg {
    @include errMsg;
  }
</style>
