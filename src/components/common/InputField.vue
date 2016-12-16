<template>
  <div class="container">
    <label>{{title}}</label>
    <input v-if="needInputField" :placeholder="placeholder">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'fz-input',
    data () {
    },
    props: {
      title: '',
      needInputField: true,
      placeholder: ''
    },
    components: {
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  .container {
    display: flex;
  }
</style>