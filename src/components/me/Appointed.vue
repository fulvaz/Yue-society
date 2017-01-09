<template lang="html">
  <div class="container">
    <user-list title="约过我的人" :users="users"></user-list>
  </div>
</template>

<script>
import UserList from '../common/UserList'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'user-list': UserList
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    api.getAppointed().then(response => {
      this.users = utils.response2Data(response)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .container {
  }
</style>
