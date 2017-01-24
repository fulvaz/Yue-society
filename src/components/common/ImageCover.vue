<template lang="html">
  <div class="fz-cover-image" :style="style" @click="handleClick">

  </div>
</template>

<script>
// background-image 方式显示图片
export default {
  // 只要父容器有宽度, 就会自动生成正方形, 当然也可以自己修改样式
  props: {
    img: String
    // width: {
    //   type: String,
    //   default: '100%'
    // },
    // height: {
    //   type: String,
    //   default: '33.33vw'
    // }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.img)
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

<style lang="scss">
  .fz-cover-image {
    // 默认是正方形
    // 宽度依赖容器宽度
    width: 100%;
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
  }

</style>
