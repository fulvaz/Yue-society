<template lang="html">
  <div v-show="show" class="container">
    <header>
      <span class="title">圈子发言</span>
      <button class="send-btn btn" @click="handleSend">发布</button>
      <button class="close-btn btn" @click="close">关闭</button>
    </header>
    <section class="editor">
      <input type="text" name="title" v-model="title" class="title" placeholder="标题">
      <textarea name="content" placeholder="正文" class="content" v-model="content"></textarea>
    </section>
    <section class="functions">

    </section>
  </div>
</template>

<script>
import * as api from '../../api/index.js'
let that
export default {
  props: {
  },
  data () {
    return {
      show: false,
      title: '',
      content: ''
    }
  },
  created () {
    that = this
  },
  methods: {
    handleSend (e) {
      let data = {
        title: this.title,
        content: this.content,
        uid: this.$store.state.MeState.uid,
        circleId: this.$route.params.id,
        date: (new Date()).toString(),
        type: '交友' // TODO 应该可以选!
      }
      api.newPost(data).then(response => {
        // TODO 提示信息
        this.$emit('input', data)
        this.close()
      }).catch(response => {
        console.error(response)
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
  @import '../../assets/util.scss';
  .container {
    position: fixed;
    box-sizing: border-box;
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
  }
</style>
