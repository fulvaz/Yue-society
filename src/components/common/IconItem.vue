<template>
  <div class="tabbar-item-wrapper" >
    <router-link :to="to" class="icons" :append="append">
      <div class="icons-wrapper">
        <img v-if="icon" :src="icon">
        <div class="icon"><slot name="icon" ></slot></div>
        <label class="name" >{{label}}</label>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'fz-icon-item',
    data () {
      return {
        selected: this.isSelected
      }
    },
    props: {
      label: '',
      icon: '',
      to: '',
      id: '',
      isSelected: false,
      append: false
    },
    components: {
    },
    created () {
    },
    methods: {
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/util.scss";
  .tabbar-item-wrapper {
    .icons {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      border-bottom: 1px solid #F0F0F0;
      @include reseta(#888);

      .icon {
        text-align: center;
        margin-bottom: 5px;
      }
      .name {
        display: block;
        margin: 0;
        text-align: center;
        color: #888;
        font-size: 12px;
      }
      @include clearfix
    }
    @include clearfix
  }
</style>
