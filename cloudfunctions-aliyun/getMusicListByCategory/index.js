'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const { id: categoryId, limit = 0, offset = 0 } = event
	const collection = db.collection('music-list')
  const filter = { categoryId }
  
  const collectionFilter = await collection.where(filter)
  const countRes = await collectionFilter.count()
  const count = countRes.total
  const result = await collectionFilter.limit(limit).skip(offset).get()
  const list = result.data || []
  return {
    data: {
      count,
      list,
    },
    message: '',
  }
};
