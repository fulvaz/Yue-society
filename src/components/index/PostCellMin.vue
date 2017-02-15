<template>
    <div class="slider-item">
        <img class="logo" :src="avatar" >
        <div class="main">
            <h2 class="title">{{title}}</h2>
            <p class="info"><span class="author">{{author}}</span><span class="date">{{date}}</span></p>
        </div>
    </div>
</template>

<script>
   export default {
     props: {
       'avatar': '',
       'title': '',
       'date': '',
       'author': ''
     }
   }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .slider-item {
        width: 100%;
        padding: 0 $narrow-horizontal-margin;
        background-color: #fff;
        box-sizing: border-box;

        .logo {
            position: relative;
            top: 2px;
            float: left;
            width: 16px;
            height: 16px;
            border-radius: 100%;
        }

        .main {
            margin-left: 25px;

            .title {
                margin: 0;
                @include item-title;
                max-height: calc(1em + 2px);
                overflow: hidden;
            }

            .info {
              @include item-description;
              margin: 0;
              margin-top: $section-margin;
              @include clearfix;
            }

            .date {
                float: right;
                margin: 0;
            }

            .author {
                float: left;
                margin: 0;
            }

            @include clearfix()
        }




    }
</style>
