<template>
  <div class="container">
    <test-child ref="child"></test-child>
    <label @inputtest="updateValue">{{value}}</label>
  </div>
</template>

<script>
  import TestChild from './TestChild'
  export default {
    data () {
      return {
        value: ''
      }
    },
    components: {
      'test-child': TestChild
    },
    created () {
      this.$store.dispatch('fetchAjax')
      this.$on('inputtest', (val) => {
        console.log(val)
      })
    },
    methods: {
      updateValue (val) {
        this.value = val
      }
    }
  }
</script>

<style scoped lang="scss">
</style>