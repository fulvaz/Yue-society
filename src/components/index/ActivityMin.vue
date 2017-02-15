<template lang="html">
  <div class="activity-list-container">
    <slot name="heading">
      <h2 v-if="title.length !== 0" class="title">{{title}}</h2>
    </slot>
    <cell
      v-for="act in activities"
      :id="act.id"
      :title="act.title"
      :content="act.content"
      :publisher="act.publisher"
      :date="dateFormat(act.durationend)"
      class="act-cell"
    ></cell>
  </div>
</template>

<script>
import Cell from './MinActivityCell'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'cell': Cell
  },
  props: {
    activities: Array,
    title: String
  },
  methods: {
    dateFormat (dateString) {
      return utils.date2MMDDHHMM(dateString)
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/index.scss";
  .activity-list-container {
    background: white;
  }
  .heading {
      margin-top: 0;
      background: $main-pink;
      @include item-description;
      color: white;
  }
  .act-cell {
      margin-left: $narrow-horizontal-margin;
  }
</style>
