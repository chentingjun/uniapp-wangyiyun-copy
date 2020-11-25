const mutations = {
  updateUserInfo(state, info = null) {
    console.log('设置用户信息：', info)
    state.userinfo = info
  },
  updateErrorList(state, info = null) {
    console.log('设置用户信息：', info)
    state.errorList.push(info)
  },
}

export default mutations
