'use strict';
const db = uniCloud.database()

/**
 * loginType: 0 账号密码登录
 * wx: 微信登录
 */
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const { username, password, loginType = 0, ...otherInfo } = event
  const collection = db.collection('users')
  const userInfo = {
    username,
    password,
    loginType,
    ...otherInfo,
  }
  const filter = {username}
  if (!loginType) {
    filter.password = password
  }
  const res = await collection.where(filter).get()
  if (res.data.length) {
    const data = res.data[0]
    return {
      data,
      message: ''
    }
  }
  if (loginType === 'wx') {
    // 添加 wx 用户信息
    userInfo.createTime = new Date().getTime()
    await collection.add(userInfo)
    return {
      data: {
        username, ...otherInfo,
      },
      message: ''
    }
  }
  console.log('登录错误：logintype=', loginType)
	//返回数据给客户端
  return  {
    data: null,
    message: '错误的用户名或密码'
  }
};
