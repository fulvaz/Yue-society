<template>
  <div class="mint-indicator" v-show="visible" transition="mint-indicator" >
    <div class="mint-indicator-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
      <span class="mint-indicator-text" v-show="text">{{ text }}</span>
    </div>
    <div class="mint-indicator-mask" @touchmove.stop.prevent></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false
      }
    },
    components: {
    },
    computed: {
      convertedSpinnerType() {
        switch (this.spinnerType) {
          case 'double-bounce':
            return 1;
          case 'triple-bounce':
            return 2;
          case 'fading-circle':
            return 3;
          default:
            return 0;
        }
      }
    },
    props: {
      text: String,
      spinnerType: {
        type: String,
        default: 'snake'
      }
    }
  };
</script>
