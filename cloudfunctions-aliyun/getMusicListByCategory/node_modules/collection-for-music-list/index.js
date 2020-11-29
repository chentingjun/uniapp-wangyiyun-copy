const db = uniCloud.database()

function getClc() {
	// 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common
  // const clc = db.collection('music-list')
  const clc = db.collection('music-list-for-ximalaya') // 数据来源于喜马拉雅
	return clc
}

// 音乐列表文档对象
module.exports = getClc()
