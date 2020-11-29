'use strict';
// 音乐列表文档对象
const clcMusicList = require('collection-for-music-list')
const db = uniCloud.database()
const clearTable = require('./clearTable')
const spideXimalaya = require('./spide-ximalaya.js')
exports.main = async (event, context) => {
  // 清空表
  await clearTable('music-list-for-ximalaya')
	const fetchRes = await clcMusicList.limit(500).get()
  const musicList = Array.from(fetchRes.data)
  const spiderList = await spideXimalaya()
  for (let i = 0; i < musicList.length; i++) {
    const spiderItem = spiderList[i]
    musicList[i] = {
      ...musicList[i],
      ...spiderItem
    }
  }
  const clc = db.collection('music-list-for-ximalaya')
  const res = await clc.add(musicList)
  return  {
    data: res,
    message: ''
  }
};
