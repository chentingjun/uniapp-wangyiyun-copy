import http from '../plugins/http.js'
  
const actions = {
  async updateMusicListByCategory({
    state,
    commit
  }, {
    id,
    offset = 0,
    limit = 10,
  } = {}) {
    if (!id) return console.error('缺少参数 id')
    const res = await http.getMusicListByCategory({
      id,
      offset,
      limit,
    })
    if (res) {
      return {
        offset: offset + limit,
        total: res.count,
        list: res.list,
      }
    }
    return {}
  }
}

export default actions
