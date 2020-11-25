'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
  const { id: _id } = event
	const collection = db.collection('music-category-info')
  const result = await collection.where({ _id }).get()
  const data = result.data || []
	//返回数据给客户端
	return {
    data: data[0],
    message: '',
  }
};
