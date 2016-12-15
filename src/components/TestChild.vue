<template>
  <div class="container">
    <input v-model="value" @input="inputs($event.target.value)">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    props: {
    },
    components: {
    },
    created () {
    },
    methods: {
      inputs (val) {
        this.$parent.$emit('inputtest', val)
        this.value = val
      }
    }
  }
</script>

<style scoped lang="scss">
</style>