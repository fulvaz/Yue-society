<template lang="html">
    <user-list title="我关注的人" :users="users"></user-list>
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
    api.getWhomIFocus().then(response => {
      console.log(response)
      this.users = utils.response2Data(response)
    })
  }
}
</script>

<style lang="css">
</style>
