<template>
    <div class="card">
        <div class="avatar" v-lazy:background-image="logo"></div>
        <div class="info">
            <p>
              <span class="name">{{title}}</span>
            </p>
            <p>
              <span class="location">{{content}}</span>
            </p>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      logo: String,
      title: String,
      content: String
    },
    computed: {
      style () {
        return {'background-image': `url(${this.user.avatar})`}
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/index.scss";
    .card {
        position: relative;
    }

    .avatar {
        box-sizing: border-box;
        background-size: cover;
        background-position: center;
        z-index: -1;
        overflow: hidden;
        border: 1px solid $card-border-color;

        &:after {
            margin-bottom: 100%;
            content: '';
            display: block;
        }
    }

    .info {
        margin-top: -3px;
        width: 100%;
        // height: 16px;
        box-sizing: border-box;
        background: white;
        border: 1px solid $card-border-color;

        p {
            margin: 0 0;
            // padding: .5em 0;
            width: 100%;
            line-height: 14px;
            text-align: center;
            height: 1em;
            overflow: hidden;

            .name {
              @include item-description;
              color: black;
            }

            .location {
                color: $description-color;
                font-size: $description-size;
            }

            .age {
                color: $description-color;
                font-size: $description-size;
            }
        }
    }


</style>
