const db = uniCloud.database()
/**
 * @param {Object} table 表名
 * @param {Object} offset 开始位置，默认0
 * @param {Object} limit 每次获取数量，默认100
 * @param {Object} maxLimit 获取上限，默认不限
 */
async function getAllList(table, offset = 0, limit = 100, maxLimit) {
    if (!table) return '缺少 table'
    const res = await db.collection(table).skip(offset).limit(limit).get()
    const list = res.data || []
    if (list.length < limit || (maxLimit && list.length < maxLimit)) {
      return list
    }
    const lastList = await getAllList(table, offset + limit, limit)
    return [
      ...list,
      ...lastList,
    ]
}
  
module.exports = getAllList
