'use strict';
// 音乐列表文档对象
const clcMusicList = require('collection-for-music-list')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
  const { id: _id } = event
  const filter = { _id }
  console.log(filter)
  const res = await clcMusicList.where(filter).limit(1).get()
  const data = res.data[0] || null
	//返回数据给客户端
	return {
    data,
    message: ''
  }
};
