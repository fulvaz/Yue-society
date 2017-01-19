<template lang="html">
  <p>进入认证中</p>
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
    let dest = config.authPath + '?redirectUrl=' + redirect
    // if (process.env.NODE_ENV === 'development') dest = config.authPath + '?test=yzy' + '&redirectUrl=' + redirect + '&timestamp=' + Math.random()
    console.log(dest)
    window.location = dest
  }
}
</script>

<style lang="css">
</style>
