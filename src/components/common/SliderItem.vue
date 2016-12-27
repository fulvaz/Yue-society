<template>
    <div class="slider-item" :style="{width: elWeight}">
        <img class="logo" :src="logo" >
        <div class="main">
            <h2 class="content-title">{{contentTitle}}</h2>
            <h3 class="content-subtitle">{{contentSubtitle}}</h3>
            <p class="content">{{contentLess}}</p>
        </div>
    </div>
</template>

<script>
   export default {
     props: {
       'logo': '',
       'title': '',
       'content-title': '',
       'content-subtitle': '',
       'content': ''
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
    .slider-item {
        float: left;
        margin-right: 10px;
        border-right: 1px solid #E7E7E7;
        .logo {
            float: left;
            width: 50px;
            height: 50px;
        }

        .main {
            margin-left: 60px;

            .content-title {
                margin: 0;
                font-size: 17px;

                overflow: hidden;
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
