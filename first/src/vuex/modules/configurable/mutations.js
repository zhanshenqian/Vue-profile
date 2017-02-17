
const mutations = {
  FETCH_SYSEM_MSG_LIST_SUCC (state, data) { // 加载系统消息列表
    state.system.list = data.data
    state.system.count = data.count
  },
  FETCH_DETAIL_SUCC (state, data) { //
    state.detail = data.data
  }
}

export default mutations
