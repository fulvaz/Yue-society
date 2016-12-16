<template>
  <div class="container">
    <header class="profile">
      <img :src="headimgurl" class="avator">
      <div class="detail">
        <span class="nickname">{{nickname}}</span>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        headimgurl: '',
        nickname: '',
        balance: 0
      }
    },
    props: {

    },
    components: {
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  .profile {
    margin-bottom: 15px;
    height: 124px;
    background-color: #4b4b4b;
    .avator {
      margin: 20px 0 0 20px;
      width: 74px;
      height: 74px;
    }
  }
</style>