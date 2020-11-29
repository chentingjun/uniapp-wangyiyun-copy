'use strict';
// 音乐列表文档对象
const clcMusicList = require('collection-for-music-list')
const db = uniCloud.database()
const clearTable = require('clear-collection')
const spideXimalaya = require('./spide-ximalaya.js')


exports.main = async (event, context) => {
  // 清空表
  await clearTable('music-list-for-ximalaya')
  const spiderList = await spideXimalaya()
  const categoryClc = db.collection('music-category-info')
  const { data } = await categoryClc.get()
  const categoryIds = data.map(item => item._id)
  const musicList = []
  const promiseList = categoryIds.map(async (idItem, itemI) => {
    const itemMusicList = []
    for (let j = itemI * 100; j < itemI * 100 + 100; j++) {
      itemMusicList.push({
        ...spiderList[j],
        categoryId: idItem
      })
    }
    const clc = db.collection('music-list-for-ximalaya')
    const res = await clc.add(itemMusicList)
    return res
  })
  await Promise.all(promiseList)
  console.log('运行完毕')
};
