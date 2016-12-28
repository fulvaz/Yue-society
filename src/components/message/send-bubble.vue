<template lang="html">
  <div class="bubbel-container">
    <p class="date">{{date}}</p>
    <section class="msg">
      <img :src="from.avatar" alt="from.nickname" class="avatar">
      <div class="content">
        <p>{{content}}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    date: String,
    content: String,
    avatar: String,
    from: Object,
    to: Object
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
  }
  .date {
    font-size: 12px;
    color: #acacac;
    text-align: center;
  }
  img {
    float: left;
    width: 40px;
    height: 40px;
  }
  .content {
    position: relative;
    padding: 7px 10px;
    margin: 12px 35px 0px 50px;
    display: block;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 10px;
    background-color: white;
    font-size: 15px;

    &:before {
      content: "";
      position: absolute;
      top: 9px;
      left: -16px;
      border-top: 8px solid transparent;
      border-left: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid rgb(220, 220, 220);
    }

    &:after {
      content: "";
      position: absolute;
      top: 10px;
      left: -13px;
      border-top: 7px solid transparent;
      border-left: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-right: 7px solid white;
    }
  }
</style>
