<template>
  <div class="tabbar-item-wrapper" @click="handleClick">
    <router-link :to="to" class="icons" :class="{selected: selected}">
      <slot name="icon" class="icon" ></slot>
      <label class="name" :class="{selected: selected}">{{label}}</label>
    </router-link>
  </div>
</template>

<script>
  import config from '../../config/setting.js'
  export default {
    data () {
      return {
      }
    },
    props: {
      label: '',
      icon: '',
      to: '',
      id: Number,
      isSelected: false
    },
    computed: {
      idSelected () {
        return this.$store.state.TabState.idSelected
      },
      selected () {
        let ifClicked = this.id === this.idSelected
        let ifRoute = this.id === config.tabbarItems[this.$route.path] // 高优先级
        // console.log(ifRoute || ifClicked)
        return ifRoute || ifClicked
      }
    },
    components: {
    },
    created () {
      // this.eventHub.$on('tabbar-item-click', (id) => {
      //   if (id === this.id) this.selected = true
      //   else this.selected = false
      // })
    },
    methods: {
      handleClick () {
        // this.eventHub.$emit('tabbar-item-click', this.id)
        this.$store.dispatch('itemClicked', this.id)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/util.scss";
  .tabbar-item-wrapper {
    .icons {
      display: block;
      height: 100%;
      @include reseta(#888);
      .icon {
        display: block;
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
