<template>
    <div class="container">
        <h2>{{title}}</h2>
        <ul>
            <slot></slot>
        </ul>
    </div>
</template>

<script>
  export default {
    props: {
      title: ''
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/util.scss";
    .container {
        padding: 0 15px;
        background-color: #fff;
        overflow: hidden;

        h2 {
            margin: 15px 0;
            font-size: 15px;
            font-weight: normal;
            color: #aaa;
        }
        @include clearfix;
    }


    
    ul {
        margin: 0;
        padding: 0;
    }
</style>