<template lang="html">
  <div class="activity-list-container">
    <cell
      v-for="act in activities"
      :id="act.id"
      :title="act.title"
      :content="act.content"
      :publisher="act.publisher"
      :date="dateFormat(act.durationend)"
    ></cell>
  </div>
</template>

<script>
import Cell from './ActivityCell'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'cell': Cell
  },
  props: {
    activities: Array
  },
  methods: {
    dateFormat (dateString) {
      return utils.date2MMDDHHMM(dateString)
    }
  }
}
</script>

<style lang="scss">

</style>
