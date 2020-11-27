const mutations = {
  updateUserInfo(state, info = null) {
    console.log('设置用户信息：', info)
    state.userinfo = info
  },
  updateMusicDetailInfo(state, info = {}) {
    console.log('设置歌曲详情信息：', info)
    state.musicDetailInfo = {
      ...state.musicDetailInfo,
      ...info,
    }
  },
  updateErrorList(state, info = null) {
    console.log('设置用户信息：', info)
    state.errorList.push(info)
  },
}

export default mutations
