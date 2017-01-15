<template>
   <div class="streamer">
       <h2 v-if="title.length !== 0" class="title">{{title}}</h2>
       <div class="content-container">
            <router-link v-for="item in items" :to="'/users' + '/' + item.uid">
              <card class="card" :user="item"></card>
            </router-link>
       </div>
   </div>
</template>

<script>
    // 重构一下就是个流式布局的可复用组件 Update: 重构过了, 现在是gird layout
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
        align-items: center;

        a {
          float: left;
          margin-right: 10px;
          margin-bottom: 10px;
          display: block;
          width: calc((100% - 20px) / 3);
          // width: calc(50% - 30px);
          &:nth-child(3n) {
            margin-right: 0;
          }
        }

        .card {
            // float: left;
            // width: 100%;
        }
    }

</style>
