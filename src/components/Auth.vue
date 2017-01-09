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
    let dest = config.authPath + '?redirectUrl=' + redirect + '&timestamp=' + Math.random()
    // if (process.env.NODE_ENV === 'development') dest = config.authPath + '?test=yzy' + '&redirectUrl=' + redirect + '&timestamp=' + Math.random()
    console.log(dest)
    setTimeout(e => {
      window.location = dest
    }, 5000)
  }
}
</script>

<style lang="css">
</style>
