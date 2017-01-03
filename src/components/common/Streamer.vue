<template>
   <div class="streamer">
       <h2 class="title">—— {{title}} ——</h2>
       <div class="content-container">
            <router-link v-for="item in items" :to="'/users/' + item.id"><card class="card" :user="item"></card></router-link>
       </div>
   </div>
</template>

<script>
    // 重构一下就是个流式布局的可复用组件
    import Card from './UserCard'
    export default {
      components: {
        'card': Card
      },
      props: {
        title: '',
        items: Array
      }
    }
</script>

<style scoped lang="scss">
    .streamer {
        margin: 10px 0;
        padding: 10px;
        background-color: white;
    }

    .title {
        font-size: 1.2rem;
        text-align: center;
    }

    .content-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        a {
          display: block;
          width: calc(50% - 30px);
          margin: 15px;
        }

        .card {
            float: left;
            width: 100%;
        }
    }

</style>
