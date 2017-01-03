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
    @import "../../assets/util.scss";
    .slider-item {
        padding: 10px 18px 20px 26px;
        width: 100%;
        margin-right: 10px;
        background-color: #fff;
        box-sizing: border-box;

        &:last-child {
          border: none;
        }

        .logo {
            float: left;
            width: 16px;
            height: 16px;
            border-radius: 100%;
        }

        .main {
            margin-left: 30px;

            .title {
                margin: 0;
                font-size: 17px;
                color: #494949;
                overflow: hidden;
            }

            .info {
              margin: 0;
              margin-top: 6px;
            }

            .date {
                float: right;
                margin: 0;
                font-size: 12px;
                color: #ccc;
            }

            .author {
                float: left;
                margin: 0;
                font-size: 14px;
                color: #aaa;
            }

            @include clearfix()
        }




    }
</style>
