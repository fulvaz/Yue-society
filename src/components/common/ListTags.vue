<template lang="html">
  <div class="container">
    <router-link v-for="tag in tags" :to="'/tags/' + tag" ><span class="tag">{{tag}}</span></router-link>
  </div>
</template>

<script>
const colors = ['#FF2944', '#0673DE', '#FF992E', '#2BAF4B', '#696AD7', '#FF6D3B']
export default {
  props: {
    tags: Array
  },
  components: {
  },
  methods: {
    randColor () {
      return colors[Math.floor(colors.length * Math.random())]
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag {
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    padding: 0px 12px;
    font-size: 15px;
    line-height: 28px;
    border-radius: 5px;
    background-color: rgb(230, 230, 230);
  }
</style>
