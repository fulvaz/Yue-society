const faker = require('faker')
const f = faker
faker.locale = "zh_CN"

let activitiesNum = r(15, 30)
let circleRecNum = r(15, 25)
let rNum = r(10, 20)
let circlesNum = r(50, 100)

function genChat () {
	let msgs = []
	let fromName = f.internet.userName()
	let fromAvatar = f.image.avatar()
	let meName = f.internet.userName()
	let meAvatar = f.image.avatar()

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
	for (let i=0; i<10; i++) {
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
		'avatar': 'https://s3.amazonaws.com/uifaces/faces/twitter/timgthomas/128.jpg',
		'joinedCircles': [1, 2, 3, 4, 5],
		'unreadMsg': 45,
		nickname: f.internet.userName(),
		balance: r(300, 1000),
		focused: r(100, 200),
		looked: r(100, 300)
	}
}

function genUsers ()  {
	let users = []
	for (var i=0; i < r(20, 30); i++) {
		let tmp = {
			id: 1000 + i,
			account_status: 0,
			nickname: f.internet.userName(),
			realname: f.name.lastName(),
			birthday: 19900101,
			livingPlace: '山东-临沂',
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
			birthplace: '北京-北京',
			faith: '伊斯兰教',
			starsign: '处女座',
			isvip: 1,
			looked: r(20, 30),
			focused: r(30, 50),
			avatar: f.image.avatar(50, 50),
			album: '',
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
			avator: faker.image.avatar(200, 200),
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
		livingPlace: '广东-广州',
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

// 从这里开始有文档 见另外JSON文档
function genMe () {
  "use strict";
   return {
     id: 1111,
		 account_status: 0,
     nickname: f.internet.userName(),
     realname: f.name.lastName(),
     birthday: '1990-01-01',
     livingPlace: '山东-临沂',
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

function genUser() {

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
			name: faker.name.jobType(),
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
			title: faker.commerce.product(),
			content: faker.lorem.sentences(),
			attendance: r(1000, 2999),
			logo: faker.image.image(50, 50),
			durantionstart: '2016-12-5',
			durantionend: '2016-12-20'
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
			avator: faker.image.avatar(200, 200),
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
  let postCategory = {0: '活动', 1: '交友', 2: '其他'}
	rNum = r(3000, 5000)
	repliesId = 0
	for (let i=0; i<rNum; i++) {
		let tmp = {
			id: i,
			circleId: r(0, circlesNum),
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
			postCategory: {1: '活动', 2: '交友', 3: '其他'},
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

	// /users

  // /weixin
  data.weixin = genWXData()
  data.me = genMe()
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
	return data;
}
