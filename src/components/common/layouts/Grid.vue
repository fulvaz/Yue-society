<template>
   <div class="grid">
       <h2 v-if="title.length !== 0" class="title">{{title}}</h2>
       <div class="content-container">
         <slot></slot>
       </div>
   </div>
</template>

<script>
    export default {
      components: {
      },
      props: {
        title: {
          type: String,
          default: ''
        }
      }
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/index.scss";

    .grid {
        background-color: white;
    }

    .title {
      @include section-title();
    }

    .content-container {
      overflow-y: scroll;
      @include clearfix;
    }

</style>
