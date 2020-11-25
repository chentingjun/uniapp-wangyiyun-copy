'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const { username, password, repassword } = event
  if (!password) {
    return {
      data: null,
      message: '密码不能为空'
    }
  }
  if (password !== repassword) {
    return {
      data: null,
      message: '两次输入的密码不一致'
    }
  }
	console.log('注册云函数 registe : ', event)
  const collection = db.collection('users')
  const res = await collection.add({
    username, password
  })
	//返回数据给客户端
	return {
    data: res,
    message: '',
  }
};
