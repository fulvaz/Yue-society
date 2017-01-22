<template lang="html">
  <div class="image" :style="style">

  </div>
</template>

<script>
// background-image 方式显示图片
export default {
  props: {
    img: '',
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '33.33vw'
    }
  },
  computed: {
    style () {
      return {
        'background-image': `url(${this.img})`
        // width: this.width,
        // height: this.height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    width: 100%;
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
  }
</style>
