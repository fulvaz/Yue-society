<script>
/*
  下拉可以动态绑定 可以
  默认项也可以动态绑定 不可 但是可以使用其他方法解决

  使用了eventHub, 使用时在Vue中声明一个eventHub, 否则无效
**/
import {Field, Picker, Popup} from 'mint-ui'
export default {
  components: {
    'mt-field': Field,
    'mt-picker': Picker,
    'mt-popup': Popup
  },
  props: {
    label: '',
    value: '',
    valueKey: '',
    placeholder: ''
  },
  data () {
    return {
      slot: [
        {
          flex: 1,
          // values: {0: '2015-01', 1: '2015-02', 2: '2015-03', 3: '2015-04', 4: '2015-05', 5: '2015-06'},
          values: [1, 2, 3, 4],
          textAlign: 'center',
          className: 'slot',
          defaultIndex: 1
        }
      ],
      key: 2,
      popupVisible: false,
      valueInner: this.value
    }
  },
  methods: {
    handleChange (picker, values) {
    },
    handleClick () {
      this.slot = [
        {
          flex: 1,
          // values: {0: '2015-01', 1: '2015-02', 2: '2015-03', 3: '2015-04', 4: '2015-05', 5: '2015-06'},
          values: [1, 2, 5, 6, 7, 8],
          textAlign: 'center',
          className: 'slot',
          defaultIndex: 1
        }
      ]
      this.popupVisible = true
    }
  }
}
</script>

<style lang="scss">
  .slot {
    width: 100%
  }
</style>
<template lang="html">
  <div class="container">
    <mt-field :label="label" :placeholder="placeholder" :value="value" @click.native="handleClick" disabled></mt-field>

    <mt-popup
            class="popup"
            position="bottom"
            v-model="popupVisible"
            popup-transition="popup-fade">
      <mt-picker :slots="slot" @change="handleChange" :valueKey="valueKey">
      </mt-picker>
    </mt-popup>
  </div>
</template>
