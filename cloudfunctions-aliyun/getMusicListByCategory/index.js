'use strict';
// 音乐列表文档对象
const clcMusicList = require('collection-for-music-list')
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const { id: categoryId, limit = 0, offset = 0 } = event
  const filter = { categoryId }
  
  const collectionFilter = await clcMusicList.where(filter)
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
