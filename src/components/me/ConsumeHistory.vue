<template lang="html">
  <list :title="'消费记录'" class="circle-my">
      <li v-for="history in historys">
        <list-item
          :item="history.name"
          :date="date2YMDHMM(history.date)"
          :price="history.price">
        </list-item>
      </li>
  </list>
</template>

<script>
import List from '../common/List'
import ListItem from '../common/ConsumeItem'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
export default {
  components: {
    'list': List,
    'list-item': ListItem
  },
  data () {
    return {
      historys: []
    }
  },
  methods: {
    date2YMDHMM (date) {
      return utils.date2YMDHMM(date)
    }
  },
  created () {
    api.getConsumeHistory().then(res => {
      this.historys = utils.response2Data(res)
    })
  }
}
</script>

<style lang="scss" scoped>
  li {
    position: relative;
    padding: 15px 0;
    border-bottom: 1px solid #dfdfdf;
  }
</style>
