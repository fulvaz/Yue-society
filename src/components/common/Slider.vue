<template>
    <div class="slider">
        <slot name="heading">
          <h2 v-if="title.length !== 0" class="title">{{title}}</h2>
        </slot>
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
       this.itemsNum = this.$children.length - 1
     },
     props: {
       'title': {
         type: String,
         default: ''
       }
     },
     components: {
       'item': SliderItem
     }
   }
</script>

<style scoped lang="scss">
    .slider {
        @import "../../assets/index.scss";
        @include clearfix;

        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        background: white;

        .title {
            margin-top: 0;
            @include item-description;
        }

        .slide {
            width: 100%;
            height: 100%;
            overflow-x: scroll;
            overflow-y: hidden;

            .slide-container {
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>
