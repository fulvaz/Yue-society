<template lang="html">

</template>

<script>
import config from '../config/setting.js'
export default {
  data () {
    return {
      from: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    let redirect = window.encodeURIComponent(from.path)
    console.log(config.authPath + '?redirectUrl=' + redirect)
    setTimeout(e => {
      window.location = config.authPath + '?redirectUrl=' + redirect + '&timestamp=' + Math.random()
    }, 5000)
  }
}
</script>

<style lang="css">
</style>
