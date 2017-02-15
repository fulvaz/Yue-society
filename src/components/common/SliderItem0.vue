<template>
    <router-link class="slider-item" :to="to" :style="{width: elWidth}">
        <img class="logo" :src="logo" >
        <div class="main">
            <h2 class="content-title">{{contentTitle}}</h2>
            <h3 class="content-subtitle">{{contentSubtitle}}</h3>
            <p class="content">{{content}}</p>
        </div>
    </router-link>
</template>

<script>
   export default {
     props: {
       'logo': '',
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
       elWidth () {
         return (100 / this.itemsNum) + '%'
       }
     }
   }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .slider-item {
        float: left;
        padding: 0 5px;
        border-right: 1px solid #E7E7E7;
        box-sizing: border-box;
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
                margin: 0;
                @include item-description();
            }

            .content {
                margin: 0;
                max-height: 2.2em;
                overflow: hidden;
                @include item-description();
            }
        }
    }
</style>
