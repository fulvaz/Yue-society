const faker = require('faker')
const f = faker
faker.locale = "zh_CN"

let activitiesNum = r(15, 30)
let circleRecNum = r(15, 25)
let rNum = r(10, 20)
let circlesNum = r(50, 100)

function genAppointmentPage () {
	return {
	  price: 2.99,
	  userType:"common",
	  category:{
	    1: '唱k',
	    2: '旅游',
	    3: '逛街',
	    4: '看电影'
	  },
	  red: [
	    {
	      circleId:1,
	      redId:1,
	      redName: '小张'
	    },
	    {
	      circleId:2,
	      redId:2,
	      redName: '小明'
	    },
	  ]
	}
}

function genActivity () {
	let arr = []
	for (let i=0; i<r(30, 40); i++) {
		arr.push({
			id: i,
			type: 'activities',
			circleId: r(0, 3), // 可以不要
			title: faker.commerce.product(),
			content: faker.lorem.sentences(),
			attendance: r(1000, 2999),
			logo: faker.image.image(r(50, 100), r(50, 100)),
			durationstart: '2016-12-5',
			durationend: '2016-12-20',
			location: f.address.state()
		})
	}
	return arr
}

function genAlbum () {
	let album = {}
	for (let i=0; i<r(20, 30); i++) {
		album['uid'] = i
		album['introduction'] = f.lorem.sentence()
		album.nickname = f.internet.userName()
		let images = []
		for (let j=0; j<r(10, 30); j++) {
			images.push('http://app.resontek.com/static/test.jpg')
		}
		album.images = images
	}
	return album
}

function genAUserList () {
	let arr = []
	for (let i=0; i<r(30, 50); i++) {
		arr.push({
			uid: i,
			avatar: f.image.avatar(r(200, 300), r(200, 300)),
			nickname: f.internet.userName(),
			introduction: f.lorem.sentence()
		})
	}
	return arr
}

function genChat () {
	let msgs = []
	let fromName = f.internet.userName()
	let fromAvatar = f.image.avatar(r(200, 300), r(200, 300))
	let meName = f.internet.userName()
	let meAvatar = f.image.avatar(r(200, 300), r(200, 300))

	for (let i=0; i<r(100, 200); i++) {
		let meMsg = {
				content: f.lorem.sentence(),
				date: f.date.recent(),
				from: {
					id: 1,
					nickname: fromName,
					avatar: fromAvatar
				},
				to: {
					id: 1111,
					nickname: meName,
					avatar: meAvatar
				},
			}

		let otherMsg = {
				content: f.lorem.sentence(),
				date: f.date.recent(),
				from: {
					id: 1111,
					nickname: meName,
					avatar: meAvatar
				},
				to: {
					id: 1,
					nickname: fromName,
					avatar: fromAvatar
				},
			}
		if (r(0, 1)) msgs.push(otherMsg)
		else msgs.push(meMsg)
	}
	return msgs
}

function genMsgList () {
	let msgList = []
	for (let i=0; i<5; i++) {
		msgList.push({
			uid: i,
			nickname: f.internet.userName(),
			avatar: f.image.avatar(100, 100),
			lastMsg: f.lorem.sentences(),
			unread: i,
			date: f.date.recent()
		})
	}
	return msgList
}

function genStateInfo () {
	return {
		'uid': 1111,
		'mobileAuth': true,
		'ifAvailable': true,
		'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/timgthomas/128.jpg',
		'joinedCircles': [1, 2, 3, 4, 5],
		'joinedActivities': [1, 2, 3, 4, 5],
		'appliedCircles': [],
		'unreadMsg': 45,
		nickname: f.internet.userName(),
		balance: r(300, 1000),
		focused: r(100, 200),
		looked: r(100, 300),
		focus: [1000, 1001, 1002, 1003]
	}
}

function genUsers ()  {
	let users = []
	let album = []
	for (let i=0; i<r(10, 20); i++) {
		// album.push(f.image.image(r(200, 300), r(200, 300)))
		album.push('http://app.resontek.com/static/test.jpg')
	}
	for (var i=0; i < r(20, 30); i++) {
		let spouseCondition = genSpouse()
		let tmp = {
			id: i,
			uid: i,
			album: album,
			circleJoined: [{id: 0, name: '圈常常常常常常常常'}, {id: 0, name: '圈常常'}, {id: 0, name: '圈常常圈常常圈常常圈常常圈常常'}],
			introduction: f.lorem.sentence(),
			nickname: f.internet.userName(),
			realname: f.name.lastName(),
			birthday: 19900101,
			livingPlace: '',
			height: r(150, 190),
			weight: r(100, 200),
			age: r(20, 100),
			income: r(100000, 4000000),
			school: '蓝翔',
			degree: '硕士',
			lunar: '羊',
			bloodtype: 'A',
			sex: '男',
			nation: '回族',
			marriage: '未婚',
			house: '租房',
			car: '有',
			birthplace: '山东-临沂',
			faith: '伊斯兰教',
			starsign: '处女座',
			isvip: 1,
			avatar: f.image.avatar(300, 300),
			spouseCondition
		}
		users.push(tmp)
	}
	return users
}

function r (min, max) {
	return f.random.number({min: min, max: max})
}

function genCircleTags () {
	return {
		'行业': ['IT', '金融', '前端', '后端', '运维', '农民工', '钱多行业'],
		'地域': ['广州', '珠海', '深圳', '佛山', '惠州', '东莞', '茂名', '中山']
	}
}

function genSearchResult () {
	let users = []
	for (let i=0; i<r(5, 10); i++) {
		users.push({
			id: i,
			name: faker.name.lastName(),
			location: faker.address.state(),
			avatar: faker.image.avatar(200, 200),
			age:faker.random.number({min: 20, max: 30})
		})
	}

	let circles = []
	for (let i=0; i<r(5, 10); i++) {
		let tmp = {
			id: i,
			type: 'circles',
			name: faker.name.jobType(),
			location: faker.address.state(),
			introduction: faker.lorem.sentences(),
			logo: faker.image.image(50, 50)
		}
		circles.push(tmp)
	}
	return [{
		id: 'test',
		users,
		circles
	}]
}

function genSpouse () {
	return {
		id: 1111,
		startage: 18,
		endage: 30,
		livingPlace: '',
		startheight: 180,
		endheight: 200,
		startweight: 50,
		endweight: 100,
		startdegree: '高中',
		enddegree: '博士',
		startrevenue: 1000,
		endrevenue: 8000,
		birthplace: '广东-广州'
	}
}

function genCircleDetail () {
	let arr = []
	for (let i=0; i<r(40, 70); i++) {
		arr.push({
			id: i,
			name: f.lorem.word(),
			location: f.address.state(),
			category: '金融',
			tags: ['高颜值', '吃吃喝喝', '高收入'],
			introduction: f.lorem.sentence(),
			logo: f.image.image(),
			ifHot: r(0, 1) ? true : false
		})
	}
	return arr
}


function genUserDetail () {
	let arr = []
	for (let i=0; i<r(30, 50); i++) {
		arr.push({
			uid: i,
			focused: r(10, 100),
			photoNum: r(20, 30),
			nickname: f.lorem.word(),
			sex: r(0, 1) ? '男' : '女',
			livingplace: f.address.state(),
			height: 999,
			weight: 999,
			age:  27, // 用age加与我同年
			income: r(0, 1) ? '5-10' : '20-100', // 大于10w收入稳定
			school: '蓝翔',// 与我是校友tag
			house: '已购房', // 已购房
			car: '有', // 有车
			birthplace: '山东-临沂',// 与我同乡
			introduction: f.lorem.sentence(),
			avatar: f.image.image(200, 200)
		})
	}
	return arr
}

// 从这里开始有文档 见另外JSON文档
function genMe () {
  "use strict";
   return {
     id: 1111,
		 account_status: 0,
		 introduction: f.lorem.sentence(),
     nickname: f.internet.userName(),
     realname: f.name.lastName(),
     birthday: '1991-01-1',
     livingPlace: '山东-临沂',
     height: r(150, 190),
     weight: r(100, 200),
     age: 27,
     income: r(100000, 4000000),
     school: '蓝翔',
     degree: '硕士',
     lunar: '羊',
     bloodtype: 'A',
     sex: '男',
     nation: '回族',
     marriage: '未婚',
     house: '租房',
     car: '有',
     birthplace: '北京-北京',
     faith: '伊斯兰教',
     starsign: '处女座',
     isvip: 1,
     looked: r(20, 30),
     focused: r(30, 50),
     balance: 999,
     perfection: r(20, 100),
     avatar: f.image.avatar(50, 50),
     album: '',
     recommender: '你大爷',
     account_status: ''
   }
}

function genMeSelectable () {
  return {
    degree: {
      0: '高中',
      1: '本科',
			2: '硕士',
			3: '博士'
    },
    lunar: {
      1: '猴',
      2: '猪',
      3: '羊'
    },
    bloodtype: {
      1: 'A',
      2: 'B'
    },
    sex: {
      0: '无',
      1: '男',
      2: '女'
    },
    nation: {
      0: '汉',
      1: '回'
    },
    marriage: {
      0: '未婚',
      1: '已婚'
    },
    house: {
      0: '有',
      1: '无'
    },
    faith: {
      0: '无',
      1: '共产',
      2: '伊斯兰教'
    },
    starsign: {
      0: '摩羯',
      1: '水瓶',
      2: '天秤'
    },
    car: {
      0: '有',
      1: '无'
    }
  }
}


function genMyInfo() {
}

// /registry/:openId
function genWXData() {
  let WXData = []
  let WXDataNum = r(5, 10)
  for (let i=0; i<WXDataNum; i++) {
    WXData.push({
      id: i,
      city: f.address.city(),
      headimgurl: f.image.avatar(50, 50),
      nickname: f.internet.userName(),
      province: f.address.state(),
      sex: '1'
    })
  }
  return WXData
}

module.exports = function() {
	let randomName = faker.name
	let data  = {}
	data.recommend = []
	data.my = []
	data.posts = []
	data.circles = []
	data.replies = []
  data.users = []

	// 生成/recommend?type=circle
	let circleRecommend = []


	for (let i=0; i<circleRecNum; i++) {
		let tmp = {
			id: i,
			type: 'circles',
			name: '圈' + faker.name.jobType(),
			location: faker.address.state(),
			introduction: faker.lorem.sentences(),
			logo: faker.image.image(50, 50)
		}
		circleRecommend.push(tmp)
	}
	data.recommend = data.recommend.concat(circleRecommend)

	// /recommend?type=activities
	let activityRecommend = []

	for (let i=0; i<activitiesNum; i++) {
		let tmp = {
			id: i,
			type: 'activities',
			circleId: r(1, 10), // 可以不要
			title: '活' + faker.commerce.product(),
			content: faker.lorem.sentences(),
			attendance: r(1000, 2999),
			logo: faker.image.image(50, 50),
			durationstart: '2016-12-5',
			durationend: '2016-12-20'
		}
		activityRecommend.push(tmp)
	}
	data.recommend = data.recommend.concat(activityRecommend)

	// /recommend?type=users
	let userRecommend = []
	userNum = r(50, 100)
	for (let i=0; i<userNum; i++) {
		let tmp = {
			id: i,
			type: 'users',
			name: faker.name.lastName(),
			location: faker.address.state(),
			avatar: faker.image.avatar(200, 200),
			age:faker.random.number({min: 20, max: 30})
		}
		userRecommend.push(tmp)
	}
	data.userRecommends = userRecommend
	// data.userRecommends = []

	// /myCircles
	let myCircle = []

	for (let i=0; i<rNum; i++) {
		let tmp = {
			id: i,
			name: faker.name.jobType(),
			memberNum: r(1000, 10000),
			logo: faker.image.image(50, 50)
		}
		myCircle.push(tmp)
	}
	data.myCircles = myCircle

	// /posts
	let posts = []
  let postCategory = {1: '交友', 2: '其他'}
	rNum = r(3000, 5000)
	repliesId = 0
	for (let i=0; i<rNum; i++) {
		let tmp = {
			id: i,
			circleId: r(0, 10),
      type: postCategory[r(0, 2)],
			author: f.internet.userName(),
			authorAvator: f.image.people(),
			date: f.date.recent(),
			title: f.lorem.sentence(),
			content: f.lorem.paragraphs(),
		}
		tmp.replies = []
		let postId = i
		let trNum = r(10, 50)
		let reply
		for (let j=0; j<trNum; j++) {
			reply = {
				id: postId * 10 + repliesId++,
				postId: postId,
				author:f.internet.userName(),
				authorAvator: f.image.people(),
				date: f.date.recent(),
				content: f.lorem.paragraph()
			}
			tmp.replies.push(reply)
			// 顺便再这里生成 /replies
			data.replies.push(reply)
		}
		posts.push(tmp)
	}
	data.posts = data.posts.concat(posts)

	// /circles
	let circles = []
	for (let i=0; i<circlesNum; i++) {
		let tmp = {
			id: i,
      name: f.lorem.word(),
			'news': f.lorem.paragraph(),
			postCategory: { 2: '交友', 3: '其他'},
			logo: faker.image.image(50, 50),
			memberNum: r(100, 500),
		}
		let service = []
		trNum = r(2, 4)
		// 添加红娘
		for (let j=0; j<trNum; j++) {
			service.push({
				id: r(0, 1000),
				circleId: i,
				name: f.internet.userName()
			})
		}
		tmp['service'] = service
		circles.push(tmp)
	}
	data.circles = data.circles.concat(circles)

	function genActivitiesJoined () {
		let arr = []
		for (let i=0; i<r(10, 20); i++) {
			let tmp = {
				id: i,
				type: 'activities',
				circleId: r(1, 10), // 可以不要
				name: faker.commerce.product(),
				introduction: faker.lorem.sentences(),
				attendance: r(1000, 2999),
				logo: faker.image.image(50, 50),
				durationstart: '2016-12-5',
				durationend: '2016-12-20'
			}
			arr.push(tmp)
		}
		return arr
	}

	function genConsumeHistory () {
		let arr = []
		for (let i=0; i<r(10, 20); i++) {
			let tmp = {
				name: f.lorem.word(),
				date: f.date.recent(),
				price: r(1, 10)
			}
			arr.push(tmp)
		}
		return arr
	}

	function genImages () {
		let arr = []
		for (let i=0; i<r(10, 30); i++) {
			arr.push(f.image.image(320, 142))
		}
		return arr
	}

	function genMoments () {
		let arr = []
		let img = []
		for (let i=0; i<r(20, 30); i++) {
			for (let j=0; j<r(0, 4); j++) {
				img.push(f.image.image(500, 500))
			}
			let obj = {
				id: i,
				circleId: i,
				avatar: f.image.avatar(100, 100),
				nickname: f.internet.username()
				uid: i,
				content: f.lorem.sentences()
				imgs: img,
				date: f.date.recent()
			}
			arr.push(obj)
		}
		return arr
	}

  // /weixin
  data.weixin = genWXData()
	data.WXConfig = {
		debug: true,
		"signature": "FD92C8EFE1637E8F7CAD1056929054ABA4540AB1",
		"timestamp": 1483073052,
		"appid": "wx0e267f61b1b011b7",
		"nonceStr": "tdd52zdHKQgn7pPBzibyusojXRKmc4tF",
		"url": "http://www.resontek.com/#/abc",
		"jsApiList": ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'chooseWXPay']
	}
  data.me = genMe()
	// data.me = {"birthday":"1990-1-1","income":0,"nation":null,"faith":null,"account_status":0,"house":null,"isvip":0,"bloodtype":null,"livingPlace":"广东-广州","school":null,"car":"无","focusd":0,"marriage":null,"nickname":"张小明","id":20,"recommender":null,"lunar":null,"introduction":null,"height":0,"looked":0,"album":["http://app.resontek.com/album/20/yzy_1484158231.jpg","http://app.resontek.com/album/20/yzy_1484158210.jpg","http://app.resontek.com/album/20/yzy_1484151077.jpg","http://app.resontek.com/album/20/yzy_1484151076.jpg"],"sex":"男","degree":null,"weight":0,"avatar":"http://wx.qlogo.cn/mmopen/OshmP2dkrSAmOY4EeFiaLd8XANNG9nVhq6ialo4r8GUlAJ9xxq9gqA6MTBu82ibMo4TJSPVFemPicEcnqJUqxcdb5JUTkxBvdZED/0","balacne":0.0,"realname":null,"starsign":null,"birthplace":null,"age":27,"perfection":0}
  data.users = [genMe(), ...genUsers()]
  // /meSelectable
  data.meSelectable = genMeSelectable()
	data.spouse = genSpouse()
	data.search = genSearchResult()
	data.circleTags = genCircleTags()
	data.tags =	data.myCircles
	data.stateInfo = genStateInfo()
	data.msgList = genMsgList()
	data.chat = genChat()
	data.focused = genAUserList()
	data.looked = genAUserList()
	data.meRecommend = genAUserList()
	data.album = genAlbum()
	data.activities = genActivity()
	data.right = {right: true}
	data.activitiesJoined = genActivitiesJoined()
	data.consumeHistory = genConsumeHistory()
	data.vipPage = [
	  {
	    id:1,
	    month:3,
	    price:1.99
	  },
	  {
	    id:2,
	    month:6,
	    price:6.99
	  }
	]
	// 用来测试提交数据是否成功提交
	data.postData = []
	data.appointmentPage = genAppointmentPage()
	data.register =
	{
    uid:1,
    nickname:"hei",
    avatar: f.image.avatar(),
    location:"广东-广州",
    userType:
		{
	    1: '交友',
	    2: '相亲',
	    3: '闲逛'
		}
	}
	data.getVerify = {
		errcode: 0,
    errmsg:"验证码发送成功"
	}
	data.images = genImages()
	data.sliderContent = {
		h_img: ['http://app.resontek.com/static/img/home_img1.jpg', 'http://app.resontek.com/static/img/home_img2.jpg']
	}
	data.userDetail = genUserDetail()  // 用来做推荐用户列表
	data.circleDetail = genCircleDetail() // 用来做详细列表的, 并非圈子api
	data.qrCode = {qrcode: 'static/qrcode.png'}
	data.moments = genMoments()
	return data;
}
