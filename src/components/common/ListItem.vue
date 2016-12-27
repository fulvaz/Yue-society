<template>
  <div class="list-item">
    <img class="logo" :src="logo" >
    <div class="main">
      <h2 class="content-title">{{contentTitle}}</h2>
      <h3 class="content-subtitle">{{contentSubtitle}}</h3>
    </div>
  </div>
</template>

<script>
   export default {
     props: {
       'logo': '',
       'content-title': '',
       'content-subtitle': ''
     },
     computed: {
     }
   }
</script>

<style scoped lang="scss">
  .list-item {
    width: 100%;
    overflow: hidden;

    .logo {
      float: left;
      width: 50px;
      height: 50px;
    }

    .main {
      height: 50px;
      margin-left: 60px;

      .content-title {
        margin: 0;
        font-size: 17px;
        line-height: 18px;
        overflow: hidden;
      }

      .content-subtitle {
        bottom: 0;
        font-size: 12px;
        margin: 0;
        margin-top: 5px;
        color: #b3b3b3;
      }
    }
  }
</style>
