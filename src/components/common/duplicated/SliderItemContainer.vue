<template>
    <div class="slider-item" :style="{width: elWeight}">
      <slot></slot>
    </div>
</template>

<script>
   export default {
     props: {
       'logo': '',
       'title': '',
       'content-title': '',
       'content-subtitle': '',
       'content': '',
       to: {
         type: String,
         default: '#'
       }
     },
     data () {
       return {
         itemsNum: 0
       }
     },
     created () {
     },
     mounted () {
       this.itemsNum = this.$parent.$children.length
     },
     computed: {
       contentLess () {
         return this.content.slice(0, 20) + '...'
       },
       elWeight () {
         return (100 / this.itemsNum) * 0.9 + '%'
       }
     }
   }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .slider-item {
        float: left;
        margin-right: 10px;
        border-right: 1px solid #E7E7E7;
        height: 100%;
        .logo {
            float: left;
            width: 50px;
            height: 50px;
        }

        .main {
            margin-left: 60px;

            .content-title {
                margin: 0;
                overflow: hidden;
                @include item-title();
            }

            .content-subtitle {
                font-size: 12px;
                margin: .5em 0;
                color: #b3b3b3;
            }

            .content {
                font-size: 15px;
                margin: .5em 0;
                color: #888;
            }
        }



    }
</style>
