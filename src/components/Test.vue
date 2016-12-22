<template>
  <div class="container">
    <test-child v-on:haha="hi" v-model="a"></test-child>
    <p>zheliyou: {{a}}</p>
    <select>
      <option value="">ggg</option>
      <option value="">ggg</option>
      <option value="">ggg</option>
    </select>
  </div>
</template>

<script>
  import TestChild from './TestChild'
  export default {
    data () {
      return {
        a: ''
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
      hi () {
        console.log('jo')
      },
      updateValue (val) {
        this.value = val
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
