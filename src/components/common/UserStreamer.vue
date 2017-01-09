<template>
   <div class="streamer">
       <h2 v-if="title.length !== 0" class="title">{{title}}</h2>
       <div class="content-container">
            <router-link v-for="item in items" :to="'/users' + '/' + item.id">
              <card class="card" :user="item"></card>
            </router-link>
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
        title: {
          type: String,
          default: ''
        },
        items: Array
      }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .streamer {
        background-color: white;
    }

    .title {
      @include section-title();
    }

    .content-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        a {
          margin-right: $horizontal-margin;
          margin-bottom: $horizontal-margin;
          flex: 1 1 40%;
          display: block;
          width: calc(50% - 30px);

          &:nth-child(even) {
            margin-right: 0;
          }
        }

        .card {
            float: left;
            width: 100%;
        }
    }

</style>
