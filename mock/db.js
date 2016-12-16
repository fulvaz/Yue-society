const faker = require('faker')
const f = faker
faker.locale = "zh_CN"

let activitiesNum = r(15, 30)
let circleRecNum = r(15, 25)
let rNum = r(10, 20)
let circlesNum = r(50, 100)

function r (min, max) {
	return f.random.number({min: min, max: max})
}

// 从这里开始有文档

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
			name: faker.commerce.product(),
			location: faker.address.state(),
			introduction: faker.lorem.sentences(),
			logo: faker.image.image(50, 50)
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
			avator: faker.image.people(200, 200),
			age:faker.random.number({min: 20, max: 30})
		}
		userRecommend.push(tmp)
	}
	data.userRecommends = userRecommend

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
				date: f.date.recent,
				content: f.lorem.paragraph
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


	return data;
}
