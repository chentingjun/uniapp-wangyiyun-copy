'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('music-list')
  const list = []
  const tags = [[''], ['SQ'], ['独家'], ['SQ','独家']]
  for (let i = 0; i < 100; i++) {
    const key = i + 1
    const tagIndex = Math.floor(Math.random() * 4)
    const item = {
      categoryId: '5fbb68a474defa0001afcc21',
      title: `晚风轻起时-${key}`,
      author: `于翔北/房东的猫-${key}`,
      src: 'https://img.tukuppt.com/newpreview_music/09/00/52/5c89300e8b4d831999.mp3',
      tags: tags[tagIndex],
      posters: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606131717601&di=86555676c31481b8f7f5826dbcde2284&imgtype=0&src=http%3A%2F%2Fi04.c.aliimg.com%2Fimg%2Fibank%2F2014%2F354%2F717%2F1388717453_1380939660.jpg'
    }
    list.push(item)
  }
  await collection.add(list)
	//返回数据给客户端
	return
};
