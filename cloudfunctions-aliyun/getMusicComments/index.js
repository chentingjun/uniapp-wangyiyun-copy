'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const { id: musicId, limit = 10 } = event
  const collection = db.collection('music-comments')
  const res = await collection.where({ musicId }).orderBy('createTime', 'desc').limit(limit).get()
  const data = res.data || []
	
	//返回数据给客户端
	return {
    data,
    message: ''
  }
};
