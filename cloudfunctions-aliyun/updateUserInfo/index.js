'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { _id, avatar, username, gender } = event
  const updateOptions = {}
  if (avatar) updateOptions.avatar = avatar
  if (username) updateOptions.username = username
  if (gender) updateOptions.gender = gender
  const clc = db.collection('users')
  const res = await clc.where({ _id }).get()
  const user = res.data[0]
  if (user) {
    try{
      await clc.doc(_id).update(updateOptions)
    }catch(e){
      //TODO handle the exception
      return {
        data: e,
        message: ''
      }
    }
  } else {
    console.log('不找到')
  }
	//返回数据给客户端
	return {
    data: null,
    message: ''
  }
};
