<template lang="html">
  <div class="editor-container" v-show="show">
    <layout>
      <div class="img-editor">
        <img :src="img">
      </div>
    </layout>
  </div>
</template>

<script>
let that
import layout from './layout/PopupEditorLayout'
export default {
  data () {
    return {
      show: false
    }
  },
  created () {
    that = this
  },
  props: {
    img: String
  },
  components: {
    layout: layout
  },
  beforeDestroyed () {
    that = ''

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
  .img-editor {
    width: 100vw;
    height: 100vw;
  }
  img {
    max-width: 100%;
  }
</style>
