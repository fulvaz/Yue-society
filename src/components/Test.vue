<template lang="html">
  <vue-core-image-upload
  crop-ratio="1:1"
  v-bind:class="['pure-button','pure-button-primary','js-btn-crop']"
  v-bind:crop="true"
  url="./crop.php"
  extensions="png,gif,jpeg,jpg"
  text="修改头像"
  class="upload-sign"
  >
</vue-core-image-upload>
</template>

<script>
import VueCoreImageUpload from './common/external/vue-core-image-upload/src/index.js'
export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  }
}
</script>

<style lang="css">
</style>
