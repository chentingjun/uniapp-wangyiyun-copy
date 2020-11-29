const http = require('./http')
// 获取音乐类目列表 --- https://www.ximalaya.com/yinyue/qingyinyue/mr15t151r132t2722/
async function getMusicKindList() {
  console.log('获取音乐各类列表...')
  const url = 'https://www.ximalaya.com/revision/category/queryCategoryPageAlbums?category=yinyue&subcategory=qingyinyue&meta=15_151-132_2722&sort=0&page=1&perPage=1'
  try {
    const result = await http(url)
    const { data } = JSON.parse(result)
    const list = data.albums || []
    return list
  } catch (error) {
    return []    
  }
}

// 获取某类音乐下的音乐
async function getKindMusicSubList(musicKindItem) {
  const { albumId, title, anchorName } = musicKindItem
  console.log(`获取 ${title} 下音乐列表...`)
  const url = `https://www.ximalaya.com/revision/play/v1/show?id=${albumId}&num=1&sort=-1&size=100&ptype=0`
  try {
    const result = await http(url)
    const { data } = JSON.parse(result)
    const list = data.tracksAudioPlay || []
    return list
  } catch (error) {
    return []
  }
}

// 获取音乐详情
async function getMusicSource(musicItem, musicKindItem) {
  const { trackId, trackName, trackCoverPath, trackUrl } = musicItem
  const { albumId, anchorName } = musicKindItem
  // console.log(`获取 ${trackName} 专辑信息`)
  const url = `https://www.ximalaya.com/revision/play/v1/audio?id=${trackId}&ptype=1`
  try {
    const result = await http(url)
    const { data } = JSON.parse(result)
    const musicInfo = {
      albumId,
      trackId,
      title: trackName,
      author: anchorName,
      src: data.src,
      trackUrl: `https://www.ximalaya.com${trackUrl}`,
      posters: `http://imagev2.xmcdn.com/${trackCoverPath}`
    }
    // const p = `spidefetch/${trackId}.json`
    // console.log('create file ', p)
    // await fs.writeFileSync(p, JSON.stringify(musicInfo))
    return musicInfo
  } catch (error) {
    console.log('error ==> ', error)
    return {}    
  }
}

module.exports = async function spideXimalaya() {
  const kindList = await getMusicKindList()
  const fetchMusicListInfo = kindList.map(async kindItem => {
    const musicList = await getKindMusicSubList(kindItem)
    const fetchMusicList = musicList.map(async musicItem => await getMusicSource(musicItem, kindItem))
    const detailList = await Promise.all(fetchMusicList)
    return detailList
  })
  const list = await Promise.all(fetchMusicListInfo)
  const musicDetailList = []
  list.forEach(item => {
    musicDetailList.push(...item)
  })
  return musicDetailList
}
