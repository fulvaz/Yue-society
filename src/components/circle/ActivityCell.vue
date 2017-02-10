<template>
    <div class="slider-item">
        <!-- <img class="logo" :src="avatar" > -->
        <router-link :to="`/activities/${id}`" class="main">
            <h2 class="title">{{title}}</h2>
            <p class="info">
              <span class="author">发起人: {{publisher}}</span>
              <span class="date">截止日期: {{date}}</span>
            </p>
            <p class="content">活动介绍: {{content}}</p>
        </router-link>
    </div>
</template>

<script>
  // 标题 内容 发布人 时间
  export default {
    props: {
    //  'avatar': '',
      id: Number,
      'title': String,
      'date': String,
      'publisher': String,
      content: String
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .slider-item {
        width: 100%;
        margin-right: 10px;
        background-color: #fff;
        box-sizing: border-box;
        border-bottom: 1px solid $list-border-color;

        .main {
            margin-left: $horizontal-margin;
            margin-bottom: 0.5em;
            margin-top: 0.5em;

            .title {
                margin: 0;
                @include item-title;
                line-height: $item-size;
                // max-height: ($item-title * 2);
                overflow: hidden;
            }

            .content {
              margin: 0;
              // margin-top: 0.2em;
              @include item-description;
              line-height: $description-size;
              max-height: (2 * $description-size);
              overflow: hidden;
            }

            .info {
              @include item-description;
              margin: 0;
              margin-top: 0.5em;
              @include clearfix;
            }

            .date {
                // float: right;
                display: block;
                margin: 0;
            }

            .author {
                // float: left;
                display: block;
                margin: 0;
            }

            @include clearfix()
        }




    }
</style>
