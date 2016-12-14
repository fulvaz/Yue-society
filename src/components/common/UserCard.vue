<template>
    <div class="card">
        <div class="info">
            <p>
                <span class="name">{{user.name}}</span>
                <span class="location">{{user.location}}</span>
                <span class="age">{{user.age}}岁</span>
            </p>
        </div>
        <div class="avator" v-lazy:background-image="user.avator"></div>
    </div>
</template>

<script>
  export default {
    props: {
      user: Object
    },
    computed: {
      style () {
        return {'background-image': `url(${this.user.avator})`}
      }
    }
  }
</script>

<style scoped lang="scss">
    .card {
        position: relative;
    }

    .avator {
        box-sizing: border-box;

        background: #888;
        background-size: cover;
        background-position: center;
        z-index: -1;
        overflow: hidden;
        border: 1px solid #b3b3b3;


        &:after {
            margin-bottom: 100%;
            content: '';
            display: block;
        }
    }

    .info {
        position: absolute;
        bottom: 0;

        width: 100%;
        height: 2.5em;

        box-sizing: border-box;
        background: white;
        border: 1px solid #b3b3b3;

        p {
            position: absolute;
            bottom: 0;
            margin: 0;
            margin-bottom: 5px;

            width: 100%;
            line-height: 1;
            text-align: center;

            .name {
                font-size: 1.1rem;
            }

            .location {
                color: #888;
                font-size: .9rem;
            }

            .age {
                color: #888;
                font-size: .9rem;
            }
        }
    }


</style>