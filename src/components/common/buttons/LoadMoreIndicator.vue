<template lang="html">
  <div v-show="show" type="button" name="button" class="Indicator-container">
    <icon name="circle-o-notch" spin></icon>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/circle-o-notch'
export default {
  components: {
    'icon': Icon
  },
  props: {
    show: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/index.scss";
.Indicator-container {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1em 0;
  font-size: $description-size;
  color: $description-color;
  background: white;
  appearance: none;
}
</style>
