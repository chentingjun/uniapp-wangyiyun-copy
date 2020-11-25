'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const { username, password } = event
  const collection = db.collection('users')
  const res = await collection.where({ username, password }).get()
  if (res.data.length) {
    const data = res.data[0]
    return {
      data,
      message: ''
    }
  }
	//返回数据给客户端
  return  {
    data: null,
    message: '错误的用户名或密码'
  }
};
