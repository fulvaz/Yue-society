<template lang="html">
  <div class="fz-ta-container">
    <div class="wrapper">
      <div class="labels">
        <label class="label template" for="select">模板</label>
        <label class="label" for="select">{{label}}</label>
      </div>
      <div class="input">
        <select class="select template" @change="handleTemplateChange">
          <option v-for="intro in introTemps">{{intro}}</option>
        </select>
        <textarea class="textarea" name="introduction" :value="value" v-on:blur="handleChange" :class="{error: maxErr || nullErr || otherErr}"></textarea>
      </div>
    </div>
      <span class="errMsg" v-if="hasError">{{errMsg}}</span>
  </div>
</template>

<script>
// 依赖valid-state.js以检查状态
// import * as utils from '../../utils/utils.js'
let introTemps = [
  '爱情，需要相濡以沫，不要为了一个人而活，一个人去承担两个人的爱情是很痛苦的，只有两颗心去真心经营爱情，那才是真正的爱情。',
  '有时候望着地平线的方向，我在想，自己一路走来，明天又将去向哪里呢。快乐过也失落过，一个人旅途太漫长，如果你愿意，我希望能拉着你的手，一起奔跑，一起去寻找我们的幸福。',
  '遇见你我便变得很低很低，一直低到尘埃里去，但我的心是欢喜的。并且在那里开出一朵花来。',
  '你当我是个风筝，要不把我放了，要不然收好带回家，别用一条看不见的情思拴着我，让我心伤。',
  '我喜欢爬山、旅游。我在业余时间最大的消遣是逛街购物。我憧憬的生活是和心爱的人一起漫步人生',
  '来到这里是个偶然，遇见你也许也是偶然，但是，过去的已然过去，未来的还没有到来，我们都不知道下一颗巧克力的味道，无数个偶然或许就是生活送给我们最美的礼物，你的偶然出现或许就是我生命中最美的必然',
  '女人的贬值，不是年龄的贬值，是自我身价与姿态的贬值；一个女人的衰老不是容颜的衰老，是进取心的衰老。一个女人的不自信，不是自卑心作怪，是过于贬低自己不相信自己',
  '在错的时间遇见对的人，那叫青春；在对的时间遇见对的人，那叫爱情；在错的时间遇见错的人，那叫婚姻。也许这世界上有爱情，或许没有，可是最后能和你相携一生的可能的确是那个“错的人”',
  '“缘分里难求的，是两情永恒；感情中难得的，是两心真诚。并非是情深缘浅，而是缘分善变；并非是曲短情长，而是人心难测。心是有温度的，你真别人才能真；情是相互的，你守别人才会守',
  '一个人走得久了，会累，有个人，陪你在冬日的午后晒太阳，为你递上一杯热气腾腾的绿茶，和心爱的人慢慢变老，还有什么比这更幸福呢？',
  '人生不止，寂寞不已。寂寞人生爱无休，寂寞是爱永远的主题。我和我的影子独处，它说它有悄悄话想跟我说，它说它很想念你。原来，我和我的影子，都在想你'
]
export default {
  props: {
    // type: {
    //   required: true
    // },
    value: '',
    label: '',
    hasError: false,
    errMsg: '',
    // maxLength: {
    //   default: 10,
    //   required: true
    // },
    regExp: {
      default: '.*'
    }
  },
  data () {
    return {
      nullErr: false,
      maxErr: false,
      otherErr: false,
      introTemps: []
    }
  },
  created () {
    this.introTemps = introTemps
  },
  methods: {
    handleChange (event) {
      this.$emit('input', event.target.value)
    },
    handleTemplateChange (e) {
      this.$emit('input', e.target.value)
    }
    // validate (event) {
    //   if (this.value.length === 0) this.nullErr = true
    //   else this.nullErr = false
    //   if (this.value.length > this.maxLength) this.maxErr = true
    //   else this.maxErr = false
    //   if (this.regExp && (new RegExp(this.regExp)).test(this.value)) this.otherErr = false
    //   else this.otherErr = true
    //
    //   // 修改全局状态 这里就不要用vuex了, 不作死, 上次的代码已经没法维护了
    //   let ifErr = this.nullErr || this.maxErr
    //   if (ifErr) validState.nickname = false
    //   else validState.nickname = true
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/index.scss";
  // 重置移动设备默认样式
  .select {
    -webkit-appearance: none;
    border: none;
  }

  .fz-ta-container {
    width: 100%;
    padding: 10px 0;
    padding-bottom: 0px;
    background: white;
    font-size: $description-size;
    .error {
      border: 1px solid red;
    }

    .errMsg {
      position: relative;
      left: 115px;
      color: red;
      font-size: 12px;
    }

  }

  .wrapper {
    display: flex;
    align-items: flex-start;
    margin: 0 $horizontal-margin;
    height: 100%;

    .template {
      margin-bottom: 5px;
    }

    .label {
      display: block;
      width: 105px;
    }

    .input {
      flex: 1;
      & > * {
        width: 100%;
      }
      .select {
        border: none;
        background: transparent;
      }

    }
  }
</style>
