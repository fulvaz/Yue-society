<template lang="html">
    <div class="fz-waterfall-container">
    </div>
</template>

<script>
export default {
  props: {
    images: Array,
    numOfCols: {
      default: 2,
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
    images () {
      this.reRenderPage()
    }
  },
  mounted () {
    this.addImages()
  },
  methods: {
    reRenderPage () {
      while (this.$el.firstChild) this.$el.removeChild(this.$el.firstChild)
      this.addImages()
    },
    addImages () {
      // console.log(this.$el.clientWidth)
      let colWidth = Math.floor((this.$el.clientWidth - 18) / this.numOfCols) // 58是margin
      let cols = []
      for (let i = 0; i < this.numOfCols; i++) {
        let col = document.createElement('div')
        col.classList.add('fz-waterfall-col')
        col.style.float = 'left'
        col.style.width = colWidth + 'px'
        this.$el.appendChild(col)
        cols.push(col)
      }
      let count = 0
      for (let i = 0; i < this.images.length; i++) {
        let img = document.createElement('img')
        img.src = this.images[i]
        img.style.width = colWidth + 'px'
        img.classList.add('fz-waterfall-img')
        cols[count++ % this.numOfCols].appendChild(img)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/util.scss";
  .fz-waterfall-container {
    @include clearfix();
    margin: 0 18px;
    .fz-waterfall-col {
      margin-right: 18px;
      width: 160px;

      &:last-child {
        margin-right: 0;
      }
    }
    .fz-waterfall-img {
      margin-bottom: 25px;
      width: 160px;
    }

  }
</style>
