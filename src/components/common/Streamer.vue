<template>
   <div class="streamer">
       <h2 class="title">—— {{title}} ——</h2>
       <div class="content-container">
            <card v-for="item in items" class="card" :user="item"></card>
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

        .card {
            float: left;
            margin: 15px;
            width: calc(50% - 30px);
        }
    }

</style>
