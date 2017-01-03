<script>
/*
  !deplicated 太复杂, 已经重构, 见info.vue



  warning!!!! 因为引入了vuex, 架构变得复杂很多. 其实使用eventbus就足够了
*/
  import {mapState} from 'vuex'
  import * as type from '../../store/mutation-types.js'
  // import store from '../../store/index.js'
  import {Field, Picker, Button, Cell, Popup, DatetimePicker} from 'mint-ui'

  const address = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
    '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
    '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
    '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
    '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
    '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
    '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
    '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
    '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
    '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
    '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
    '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
    '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
    '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
    '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
    '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
    '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
    '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
    '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
  }

  /**
    生成可选择项和设定默认位置
  */
  function updatePicker (pickerConfig, values, value) {
    if (pickerConfig.length !== values.length) throw new Error('updatePicker: length is not matched')
    let i = 0
    return pickerConfig.map((config) => {
      let index = values[i].indexOf(value)
      let defaultIndex = index >= 0 ? index : 0
      // 因为mint-ui的defaultIndex不能自动更新, 所以只好强行调整数组顺序
      if (defaultIndex !== 0) {
        let tmp = values[i].splice(defaultIndex, 1)
        values[i].unshift(tmp[0])
      }
      return {
        ...config,
        values: values[i++],
        defaultIndex: 1
      }
    })
  }

  function value2Key (obj, val) {
    return Object.keys(obj).filter((key) => {
      return obj[key] === val
    })[0]
  }

  export default {
    props: {
    },
    data () {
      return {
        sexPopupVisible: false,
        addressPopupVisible: false,
        lunarPopupVisible: false,
        bloodtypePopupVisible: false,
        nationPopupVisible: false,
        marriagePopupVisible: false,
        housePopupVisible: false,
        faithPopupVisible: false,
        degreePopupVisible: false,
        starssignPopupVisible: false,
        statePopupVisible: false,
        carPopupVisible: false,
        statssignPopupVisible: false,
        birthplacePopupVisible: false,
        birthdayPopupVisible: false,
        birthdayPicker: [
          {
            flex: 1,
            values: [],
            className: 'sexPicker',
            textAlign: 'center',
            defaultIndex: 1
          },
          {
            divider: true,
            content: '-'
          },
          {
            flex: 1,
            values: [],
            className: 'sexPicker',
            textAlign: 'center',
            defaultIndex: 1
          },
          {
            divider: true,
            content: '-'
          },
          {
            flex: 1,
            values: [],
            className: 'sexPicker',
            textAlign: 'center',
            defaultIndex: 1
          }
        ],
        sexPicker: [
          {
            flex: 1,
            values: [],
            className: 'sexPicker',
            textAlign: 'center',
            defaultIndex: 1
          }
        ],
        addressPicker: [
          {
            flex: 1,
            values: Object.keys(address),
            className: 'addressPicker',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-'
          },
          {
            flex: 1,
            values: ['北京'],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        birthplacePicker: [
          {
            flex: 1,
            values: Object.keys(address),
            className: 'addressPicker',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-'
          },
          {
            flex: 1,
            values: ['北京'],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        lunarPicker: [
          {
            flex: 1,
            values: [],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        degreePicker: [
          {
            flex: 1,
            values: [],
            className: 'degreePicker',
            textAlign: 'center'
          }
        ],
        bloodtypePicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        marriagePicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        nationPicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        housePicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        faithPicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        starssignPicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ],
        carPicker: [
          {
            flex: 1,
            values: [1, 2, 3, 4, 5],
            className: 'addressPicker',
            textAlign: 'center'
          }
        ]
      }
    },
    computed: {
      ...mapState({
        nickname: state => state.MeInfo.nickname,
        sex: state => state.MeInfo.sex,
        uid: state => state.MeInfo.id,
        realname: state => state.MeInfo.realname,
        birthday: state => state.MeInfo.birthday,
        livingPlace: state => state.MeInfo.livingPlace,
        height: state => state.MeInfo.height,
        weight: state => state.MeInfo.weight,
        age: state => state.MeInfo.age,
        income: state => state.MeInfo.income,
        school: state => state.MeInfo.school,
        degree: state => state.MeInfo.degree,
        lunar: state => state.MeInfo.lunar,
        bloodtype: state => state.MeInfo.bloodtype,
        nation: state => state.MeInfo.nation,
        marriage: state => state.MeInfo.marriage,
        house: state => state.MeInfo.house,
        car: state => state.MeInfo.car,
        birthplace: state => state.MeInfo.birthplace,
        faith: state => state.MeInfo.faith,
        starssign: state => state.MeInfo.starssign,
        isvip: state => state.MeInfo.isvip,
        looked: state => state.MeInfo.looked,
        focused: state => state.MeInfo.focused,
        balance: state => state.MeInfo.balance,
        perfection: state => state.MeInfo.perfection,
        avatar: state => state.MeInfo.avatar,
        album: state => state.MeInfo.album,
        recommender: state => state.MeInfo.recommender,
        account_status: state => state.MeInfo.account_status
      }),
      test () {
        return this.$store.state.MeInfo.lunar
      }
    },
    components: {
      'input-field': Field,
      'input-picker': Picker,
      'input-button': Button,
      'mt-popup': Popup,
      'mt-datetime-picker': DatetimePicker,
      'input-cell': Cell
    },
    created () {
      // 防止用户直接访问这个路径, 所以获取一次数据
      this.$store.dispatch('fetchSelectableItem').then((res) => {
        this.lunarPicker = updatePicker(this.lunarPicker, [Object.values(res.lunar)], this.lunar)
        this.degreePicker = updatePicker(this.degreePicker, [Object.values(res.degree)], this.degree)
        this.bloodtypePicker = updatePicker(this.bloodtypePicker, [Object.values(res.bloodtype)], this.bloodtype)
        this.sexPicker = updatePicker(this.sexPicker, [Object.values(res.sex)], this.sex)
        this.nationPicker = updatePicker(this.nationPicker, [Object.values(res.nation)], this.nation)
        this.marriagePicker = updatePicker(this.marriagePicker, [Object.values(res.marriage)], this.marriage)
        this.housePicker = updatePicker(this.housePicker, [Object.values(res.house)], this.house)
        this.faithPicker = updatePicker(this.faithPicker, [Object.values(res.faith)], this.faith)
        this.starssignPicker = updatePicker(this.starssignPicker, [Object.values(res.starssign)], this.starssign)
        this.carPicker = updatePicker(this.carPicker, [Object.values(res.car)], this.car)
      })
    },
    methods: {
      open (picker) {
        this.$refs[picker].open()
      },
      onSexChange (picker, values) {
        // 这里修改页面显示的数据就可以了
        this.$store.state.MeInfo.degree = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onAddressChange (picker, values) {
        picker.setSlotValues(1, address[values[0]])
        this.$store.state.MeInfo.livingPlace = `${values[0]}-${values[1]}` // 为了让页面上显示数据, 实际上不会修改state
      },
      onDegreeChange (picker, values) {
        this.$store.state.MeInfo.degree = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onLunarChange (picker, values) {
        this.$store.state.MeInfo.lunar = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onBloodtypeChange (picker, values) {
        this.$store.state.MeInfo.bloodtype = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onNationChange (picker, values) {
        this.$store.state.MeInfo.nation = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onMarriageChange (picker, values) {
        this.$store.state.MeInfo.marriage = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onHouseChange (picker, values) {
        this.$store.state.MeInfo.house = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onFaithChange (picker, values) {
        this.$store.state.MeInfo.faith = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onStarssignChange (picker, values) {
        this.$store.state.MeInfo.starssign = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onCarChange (picker, values) {
        this.$store.state.MeInfo.car = values[0] // 为了让页面上显示数据, 实际上不会修改state
      },
      onbirthplaceChange (picker, values) {
        picker.setSlotValues(1, address[values[0]])
        this.$store.state.MeInfo.birthplace = `${values[0]}-${values[1]}` // 为了让页面上显示数据, 实际上不会修改state
      },
      // 日期选择器是另一个控件 . 结构更复杂了
      onbirthdayChange (values) {
        let reg = /^\d$/
        let y = values.getFullYear().toString()
        let m = (values.getMonth() + 1).toString()
        let d = values.getDate().toString()
        m = reg.test(m) ? '0' + m : m
        d = reg.test(d) ? '0' + d : d
        let birthday = parseInt(y + m + d)
        this.$store.state.MeInfo.birthday = parseInt(birthday)
      },
      sendRegData () {
        let MeInfo = this.$store.state.MeInfo
        let MeSelectable = this.$store.state.MeSelectable
        // save in store
        this.$store.commit(type.SAVE_ME_INFO, {...MeInfo})

        let convertedData = {
          degree: value2Key({...MeSelectable.degree}, MeInfo.degree),
          lunar: value2Key({...MeSelectable.lunar}, MeInfo.lunar),
          bloodtype: value2Key({...MeSelectable.bloodtype}, MeInfo.bloodtype),
          sex: value2Key({...MeSelectable.sex}, MeInfo.sex),
          nation: value2Key({...MeSelectable.nation}, MeInfo.nation),
          marriage: value2Key({...MeSelectable.marriage}, MeInfo.marriage),
          house: value2Key({...MeSelectable.house}, MeInfo.house),
          faith: value2Key({...MeSelectable.faith}, MeInfo.faith),
          starssign: value2Key({...MeSelectable.starssign}, MeInfo.starssign),
          car: value2Key({...MeSelectable.car}, MeInfo.car)
        }
        // debug
        // console.log(MeInfo)
        // console.log({...MeSelectable})
        //
        // console.log(MeInfo.degree)
        // console.log(MeSelectable.degree)
        //
        // console.log(value2Key({1: 1}, 1))
        // console.log(convertedData)

        // send to server
        let dataBeSent = {
          ...MeInfo,
          ...convertedData
        }
        this.$store.dispatch('sendMeInfo', dataBeSent)
        this.$router.push('/me')
      },
      setState (key, val) {
        this.$store.dispatch('editProperty', {key, val})
      }
    }
  }
</script>

<template>
  <div class="container">
    <input-field label="昵称" placeholder="输入昵称" type="text" :value="nickname" @input.native="setState('nickname', $event.target.value)"></input-field>
    <input-field label="性别" placeholder="选择性别" type="sex" :value="sex" @click.native="sexPopupVisible = true" disabled></input-field>
    <input-field label="现居地" placeholder="选择现居地" :value="livingPlace" @click.native="addressPopupVisible = true" disabled></input-field>
    <input-field label="真实姓名" placeholder="输入真实姓名" :value="realname" type="text" @input.native="setState('realname', $event.target.value)"></input-field>
    <input-field label="生日" placeholder="点击选择生日" @click.native="$refs.birthday.open()" :value="birthday" disabled></input-field>
    <input-field label="身高" placeholder="输入身高" :value="height" type="number" @input.native="setState('height', $event.target.value)"></input-field>
    <input-field label="体重" placeholder="输入体重" :value="weight" type="number" @input.native="setState('weight', $event.target.value)"></input-field>
    <input-field label="年龄" placeholder="输入年龄" :value="age" type="number" @input.native="setState('age', $event.target.value)"></input-field>
    <input-field label="收入" placeholder="输入收入" :value="income" type="number" @input.native="setState('income', $event.target.value)"></input-field>
    <input-field label="毕业学校" placeholder="输入毕业学校" :value="school" type="text" @input.native="setState('school', $event.target.value)"></input-field>
    <input-field label="学历" placeholder="输入学历" :value="degree"  @click.native="degreePopupVisible = true" disabled></input-field>
    <input-field label="生肖" placeholder="输入生肖" :value="lunar" @click.native="lunarPopupVisible = true" disabled></input-field>
    <input-field label="血型" placeholder="输入血型" :value="bloodtype" @click.native="bloodtypePopupVisible = true" disabled></input-field>
    <input-field label="民族" placeholder="输入民族" :value="nation" @click.native="nationPopupVisible = true" disabled></input-field>
    <input-field label="婚姻状况" placeholder="输入婚姻状况" :value="marriage" @click.native="marriagePopupVisible = true" disabled></input-field>
    <input-field label="房产" placeholder="输入房产" :value="house" @click.native="housePopupVisible = true" disabled></input-field>
    <input-field label="车" placeholder="输入车" :value="car" @click.native="carPopupVisible = true" disabled></input-field>
    <input-field label="出生地" placeholder="输入出生地" :value="birthplace" @click.native="birthplacePopupVisible = true" disabled></input-field>
    <input-field label="信仰" placeholder="输入信仰" :value="faith" @click.native="faithPopupVisible = true" disabled></input-field>
    <input-field label="星座" placeholder="输入星座" :value="starssign" @click.native="statssignPopupVisible = true" disabled></input-field>
    <input-button type="primary" class="btn-confirm" @click.native="sendRegData">更新</input-button>


    <mt-popup
            ref="sex-picker"
            class="popup-sex popup"
            position="bottom"
            v-model="sexPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="sexPicker" @change="onSexChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            ref="address-picker"
            class="popup-address popup"
            position="bottom"
            v-model="addressPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="addressPicker" @change="onAddressChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-lunar popup"
            position="bottom"
            v-model="lunarPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="lunarPicker" @change="onLunarChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-bloodtype popup"
            position="bottom"
            v-model="bloodtypePopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="bloodtypePicker" @change="onBloodtypeChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-nation popup"
            position="bottom"
            v-model="nationPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="nationPicker" @change="onNationChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-marriage popup"
            position="bottom"
            v-model="marriagePopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="marriagePicker" @change="onMarriageChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-house popup"
            position="bottom"
            v-model="housePopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="housePicker" @change="onHouseChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-faith popup"
            position="bottom"
            v-model="faithPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="faithPicker" @change="onFaithChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-starssign popup"
            position="bottom"
            v-model="starssignPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="starssignPicker" @change="onStarssignChange">
      </input-picker>
    </mt-popup>



    <mt-popup
            class="popup-car popup"
            position="bottom"
            v-model="carPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="carPicker" @change="onCarChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-degree popup"
            position="bottom"
            v-model="degreePopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="degreePicker" @change="onDegreeChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-degree popup"
            position="bottom"
            v-model="statssignPopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="starssignPicker" @change="onStarssignChange">
      </input-picker>
    </mt-popup>

    <mt-popup
            class="popup-degree popup"
            position="bottom"
            v-model="birthplacePopupVisible"
            popup-transition="popup-fade">
      <input-picker :slots="birthplacePicker" @change="onbirthplaceChange">
      </input-picker>
    </mt-popup>

    <mt-datetime-picker
      ref="birthday"
      type="date"
      :startDate="new Date(1900, 0, 1)"
      :endDate="new Date(2006, 11, 31)"
      @confirm = 'onbirthdayChange'
      >
    </mt-datetime-picker>
  </div>
</template>

<style scoped lang="scss">
  .head {
    display: flex;
    height: 70px;
    background-color: #fff;
  }

  .btn-confirm {
    margin: 20px 0;
    width: 100%;
  }

  .popup {
    width: 100%;
  }
</style>
