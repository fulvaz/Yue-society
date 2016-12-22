<template>
  <div class="container">
    <input type="text" :value="value" @click="inputs">
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      value: ''
    },
    components: {
    },
    created () {
    },
    methods: {
      inputs ($event) {
        console.log('child click')
        this.$emit('input', $event.target.value)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
