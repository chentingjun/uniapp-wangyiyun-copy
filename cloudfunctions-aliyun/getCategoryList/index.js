'use strict';
// 音乐列表文档对象
const clcMusicList = require('collection-for-music-list')

const db = uniCloud.database()

const getCategoryMusicList = async (options) => {
	//event为客户端上传的参数
  const { id: categoryId, limit = 0 } = options
  const filter = { categoryId }
  const result = await clcMusicList.where(filter).limit(limit).get()
  const info = result.data || []
  return info
};

exports.main = async (event, context) => {
  // 默认取所有的匹配的 music
  const { musicListLimit } = event
	//event为客户端上传的参数
	const collection = db.collection('music-category-info')
  const result = await collection.get()
  const categoryList = result.data || []
  const searchInfoPromise = categoryList.map(async item => {
    const { _id } = item
    const musicList = await getCategoryMusicList({
      id: _id,
      limit: musicListLimit,
    })
    return {
      ...item,
      musicList,
    }
  })
  const returnData = await Promise.all(searchInfoPromise)
  return {
    data: returnData,
    message: '',
  }
};
