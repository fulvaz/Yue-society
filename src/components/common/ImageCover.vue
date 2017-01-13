<template lang="html">
  <div class="image" :style="style">

  </div>
</template>

<script>
export default {
  props: {
    img: '',
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '90px'
    }
  },
  computed: {
    style () {
      return {
        'background-image': `url(${this.img})`,
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .image {
    background-size: cover;
    background-position: center;
  }
</style>
