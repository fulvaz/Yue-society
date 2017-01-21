<template lang="html">
  <div class="moment-container">
    <ul>
      <li v-for="moment in moments" class="moment-cell-wrapper">
        <moment-cell
          :avatar="moment.avatar"
          :nickname="moment.nickname"
          :content="moment.content"
          :imgs="moment.imgs"
          :date="moment.date"
        ></moment-cell>
      </li>
    </ul>
  </div>
</template>

<script>
import MomentCell from './MomentCell'
export default {
  components: {
    'moment-cell': MomentCell
  },
  props: {
    moments: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
.moment-container {
  width: 100%;

}

.moment-cell-wrapper {
  &:first-child {
    margin-top: 0;
  }
  margin-top: $horizontal-margin;
}
</style>
