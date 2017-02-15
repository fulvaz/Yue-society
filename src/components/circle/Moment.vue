<template lang="html">
  <div class="moment-container">
    <ul>
      <li v-for="moment in moments" class="moment-cell-wrapper">
        <moment-cell
          :id="moment.id"
          :uid="moment.uid"
          :avatar="moment.avatar"
          :nickname="moment.nickname"
          :content="moment.content"
          :imgs="moment.imgs"
          :date="moment.date"
          :likes="moment.likes"
          :ifLiked="moment.ifLiked"
          @liked="handleLiked"
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
    value: {
      type: Array,
      default: []
    }
  },
  computed: {
    moments () {
      return this.value
    }
  },
  created () {
  },
  methods: {
    handleLiked (id) {
      for (let i = 0; i < this.moments.length; i++) {
        if (this.moments[i].id === id) {
          this.moments[i].likes.push(parseInt(this.$store.state.MeState.uid))
          this.moments[i].ifLiked = true
        }
      }
      this.$emit('input', this.moments)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
.moment-container {

}

.moment-cell-wrapper {
  &:first-child {
    margin-top: 0;
  }
  padding: ($horizontal-margin / 2) 0;
  border-bottom: 1px solid $list-border-color;
}
</style>
