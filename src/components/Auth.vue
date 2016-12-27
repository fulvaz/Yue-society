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
    let redirect = window.encodeURI(from.path)
    window.location = config.authPath + '?redirect=' + redirect
  }
}
</script>

<style lang="css">
</style>
