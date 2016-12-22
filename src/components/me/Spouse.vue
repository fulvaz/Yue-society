<template lang="html">
  <div class="container">
    <mt-field label="出生地" v-model="birthplace"></mt-field>
    <mt-field label="居住地" v-model="livingPlace"></mt-field>
    <picker v-model="ageRange" label="年龄范围" :picker="agePicker.picker" :slotVal="agePicker.data"></picker>
    <picker v-model="weightRange" label="体重范围" :picker="weightPicker.picker" :slotVal="weightPicker.data"></picker>
    <picker v-model="heightRange" label="身高范围" :picker="heightPicker.picker" :slotVal="heightPicker.data"></picker>
    <picker v-model="revenueRange" label="收入范围" :picker="revenuePicker.picker" :slotVal="revenuePicker.data"></picker>
    <picker v-model="degreeRange" label="学历范围" :picker="degreePicker.picker" :slotVal="degreePicker.data"></picker>
  </div>
</template>

<script>
import {fetchSelectableItem, fetchSpouse} from '../../api/index.js'
import {Field} from 'mint-ui'
import * as utils from '../../utils/utils.js'
import Picker from '../common/RangePicker'
// import {value2Id} from '../../utils/utils.js'

const ageList = utils.genAgeObj(18, 60)
const weightList = utils.genAgeObj(30, 100)
const heightList = utils.genAgeObj(120, 200)
const revenuelist = {
  1000: ['1000', '3000', '5000', '7000', '8000', '9000', '10000'],
  3000: ['5000', '7000', '8000', '9000', '10000']
}
// 这么处理的原因是发生了一个神奇的bug

export default {
  components: {
    picker: Picker,
    'mt-field': Field
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
      selectsbleItem: {},
      ageRange: [],
      agePicker: {
        picker: utils.pickerHelper([Object.keys(ageList), ageList[Object.keys(ageList)[0]]]),
        data: {...ageList}
      },
      weightPicker: {
        picker: utils.pickerHelper([Object.keys(weightList), weightList[Object.keys(weightList)[0]]]),
        data: {...weightList}
      },
      heightPicker: {
        picker: utils.pickerHelper([Object.keys(heightList), heightList[Object.keys(heightList)[0]]]),
        data: {...heightList}
      },
      revenuePicker: {
        picker: utils.pickerHelper([Object.keys(revenuelist), revenuelist[Object.keys(revenuelist)[0]]]),
        data: {...revenuelist}
      }
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
    degreePicker () {
      let degree = this.selectsbleItem.degree
      let obj = {}
      let keys = Object.keys(degree)
      for (let i = 0; i < keys.length; i++) {
        let t = []
        for (let j = i; j < keys.length; j++) {
          t.push(degree[j])
        }
        obj[degree[i]] = t
      }
      console.log(obj)
      return {
        picker: utils.pickerHelper([Object.keys(obj), obj[Object.keys(obj)[0]]]),
        data: {...obj}
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
    }
  },
  methods: {
  },
  watch: {
    ageRange: function (newRange) {
      this.startage = newRange[0]
      this.endage = newRange[1]
    }
  },
  beforeRouteEnter (to, from, next) {
    let lastData = null
    fetchSelectableItem().then((res) => {
      lastData = res
      return fetchSpouse(res)
    }).then((res) => {
      next(vm => {
        vm.selectsbleItem = lastData
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

<style lang="scss">
  .container {
    background-color: white;
  }
</style>
