'use strict';
const cheerio = require('cheerio')
const http = require('./http')
const clearTable = require('./clearTable')

const db = uniCloud.database()

async function spider(url) {
  try{
    const html = await http(url)
    const $ = cheerio.load(html)
    const musicList = []
    const list = Array.from($('.SoundBox'))
    list.forEach((item) => {
      const src = $(item).find('.SoundDiskBox').attr('data-mp3')
      const title = $(item).find('.SoundTitle').text()
      musicList.push({
        title,
        src: `http://img.51miz.com/${src}`,
      })
    })
    return musicList
  }catch(e){
    //TODO handle the exception
    console.log('spider e: ', e)
  }
  return []
}

exports.main = async (event, context) => {
  // 清空表
  await clearTable('spider-music-list')
  //event为客户端上传的参数
  const target = 'https://www.51miz.com/sound/?utm_term=1683055&utm_source=baidu&bd_vid=11482282509769348539'
  const musicList = await spider(target)
  const clc = db.collection('spider-music-list')
  const res = await clc.add(musicList)
  //返回数据给客户端
  return res
};
