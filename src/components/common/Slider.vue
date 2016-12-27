<template>
    <div class="slider">
        <h2 class="title">{{title}}</h2>
        <div class="slide">
            <div class="slide-container" :style="{width: `${itemsNum*100}%`}">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
   import SliderItem from './SliderItem'

   export default {
     data () {
       return {
         'itemsNum': 0
       }
     },
     updated () {
       this.itemsNum = this.$children.length
     },
     props: {
       'title': ''
     },
     components: {
       'item': SliderItem
     },
     computed: {
       heightStyle () {
         return `height: ${this.height}px`
       }
     }
   }
</script>

<style scoped lang="scss">
    .slider {
        @import "../../assets/util.scss";
        @include clearfix;

        width: 100%;
        padding: 1rem;
        overflow: hidden;
        box-sizing: border-box;

        .title {
            margin-top: 0;
            text-align: center;
            font-size: 1.2rem;
        }

        .logo {
            width: 50px;
            height: 50px;
        }


        .slide {
            width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;

            .slide-container {
                height: 100%;
                overflow: hidden;
            }

            a {
                float: left;
                width: 18%;
            }
        }
    }
</style>
