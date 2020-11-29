const db = uniCloud.database()

function clc() {
  const clc = db.collection('music-list')
  return clc
}

// 音乐列表文档对象
module.exports = clc
