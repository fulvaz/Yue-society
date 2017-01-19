<template lang="html">
  <div class="container">
    <address-picker label="出生地" v-model="birthplace" class="field"></address-picker>
    <address-picker label="居住地" v-model="livingPlace" class="field"></address-picker>
    <num-range-picker v-model="ageRange" label="年龄范围" valAppend="岁" :slotVal="ageList" class="field"></num-range-picker>
    <num-range-picker v-model="weightRange" label="体重范围" valAppend="公斤" :slotVal="weightList" class="field"></num-range-picker>
    <num-range-picker v-model="heightRange" label="身高范围" valAppend="厘米" :slotVal="heightList" class="field"></num-range-picker>
    <!-- 代码凌乱的原因是我老是在改架构却不肯重构 update: 总算没那么乱了 -->
    <num-range-picker v-model="revenueRange" label="年收入范围"  valAppend="万元" :slotVal="revenuelist" class="field"></num-range-picker>
    <num-range-picker v-model="degreeRange" label="学历范围" :slotVal="degreeList" class="field"></num-range-picker>
    <mt-button type="primary" class="btn-confirm class" @click.native="sendRegData">更新</mt-button>
  </div>
</template>

<script>
import {fetchSelectableItem, fetchSpouse, updateSpouse} from '../../api/index.js'
import {Field, Button} from 'mint-ui'
import * as utils from '../../utils/utils.js'
import NumRangePicker from '../common/NumRangePicker'
import AddressPicker from '../common/AddressPicker'
// import {value2Id} from '../../utils/utils.js'

const ageList = utils.rangeArr(18, 60)
const weightList = utils.rangeArr(30, 100)
const heightList = utils.rangeArr(120, 200)
// const revenuelist = {
//   1000: ['1000', '3000', '5000', '7000', '8000', '9000', '10000'],
//   3000: ['5000', '7000', '8000', '9000', '10000']
// }
const revenuelist = ['0', '5', '10', '15', '20', '25', '30', '40', '50', '60', '100']

// 这么处理的原因是发生了一个神奇的bug

export default {
  components: {
    'mt-button': Button,
    'num-range-picker': NumRangePicker,
    'mt-field': Field,
    'address-picker': AddressPicker
  },
  data () {
    return {
      id: 0,
      startage: 0,
      endage: 0,
      livingPlace: '',
      startheight: 0,
      endheight: 0,
      startweight: 0,
      endweight: 0,
      startdegree: '',
      enddegree: '',
      startrevenue: 0,
      endrevenue: 0,
      birthplace: '',
      selectableItem: {},
      ageList: ageList,
      weightList: weightList,
      heightList: heightList,
      revenuelist: revenuelist,
      degreeSelect: {}
    }
  },
  computed: {
    weightRange: {
      get () {
        return [this.startweight, this.endweight]
      },
      set (val) {
        this.startweight = val[0]
        this.endweight = val[1]
      }
    },
    ageRange: {
      get () {
        return [this.startage, this.endage]
      },
      set (val) {
        this.startage = val[0]
        this.endage = val[1]
      }
    },
    heightRange: {
      get () {
        return [this.startheight, this.endheight]
      },
      set (val) {
        this.startheight = val[0]
        this.endheight = val[1]
      }
    },
    revenueRange: {
      get () {
        return [this.startrevenue, this.endrevenue]
      },
      set (val) {
        this.startrevenue = val[0]
        this.endrevenue = val[1]
      }
    },
    degreeRange: {
      get () {
        return [this.startdegree, this.enddegree]
      },
      set (val) {
        this.startdegree = val[0]
        this.enddegree = val[1]
      }
    },
    degreeList: {
      get () {
        // convert to array-licked obj
        // convert to array
        // let arr = Object.keys(this.selectableItem.degree).map(key => {
        //   return this.selectableItem.degree[key]
        // })
        // console.log(arr)
        // return arr
        let length = Object.keys(this.degreeSelect).length
        return [].slice.apply({
          ...this.degreeSelect,
          length
        })
      }
    }
  },
  methods: {
    sendRegData () {
      let data = {
        id: this.id,
        startage: this.startage,
        endage: this.endage,
        livingPlace: this.livingPlace === '不限-不限' ? '' : this.livingPlace,
        startheight: this.startheight,
        endheight: this.endheight,
        startweight: this.startweight,
        endweight: this.endweight,
        startdegree: this.startdegree,
        enddegree: this.enddegree,
        startrevenue: this.startrevenue,
        endrevenue: this.endrevenue,
        birthplace: this.birthplace === '不限-不限' ? '' : this.birthplace
      }
      updateSpouse(this.id, data).then(res => {
        this.handleSuccess('EDIT_CONDITION_SUCCESS')
        this.$router.push('/me')
      }).catch(res => {
        this.handleFail('EDIT_CONDITION_FAIL')
        console.err(res)
      })
    }
  },
  watch: {
  },
  beforeRouteEnter (to, from, next) {
    let lastData = null
    fetchSelectableItem().then((res) => {
      lastData = res
      return fetchSpouse(res)
    }).then((res) => {
      next(vm => {
        // vm.selectableItem.degree = lastData
        vm.selectableItem = lastData
        let length = Object.keys(lastData.degree).length
        vm.degreeSelect = [].slice.apply({
          ...lastData.degree,
          length
        })

        vm.id = res.id
        vm.startage = res.startage
        vm.endage = res.endage
        vm.livingPlace = res.livingPlace
        vm.startheight = res.startheight
        vm.endheight = res.endheight
        vm.startweight = res.startweight
        vm.endweight = res.endweight
        vm.startdegree = res.startdegree
        vm.enddegree = res.enddegree
        vm.startrevenue = res.startrevenue
        vm.endrevenue = res.endrevenue
        vm.birthplace = res.birthplace

        vm.ageRange = [vm.startage, vm.endage]
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  .container {
    background-color: white;
  }

  .btn-confirm {
    width: 100%;
  }

  .field {
    @include mt-list-border;
  }
</style>
