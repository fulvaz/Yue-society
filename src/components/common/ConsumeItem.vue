<template>
  <div class="list-item">
    <div class="main">
      <h2 class="content-title">{{item}}</h2>
      <h3 class="content-subtitle">{{date}}</h3>
      <h3 class="content-subtitle price">{{price}} 元</h3>
    </div>
  </div>
</template>

<script>
   export default {
     props: {
       'price': '',
       'item': '',
       'date': ''
     },
     computed: {
     }
   }
</script>

<style scoped lang="scss">
  .list-item {
    width: 100%;
    overflow: hidden;

    .main {
      position: relative;
      height: 50px;
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

      .price {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
</style>
