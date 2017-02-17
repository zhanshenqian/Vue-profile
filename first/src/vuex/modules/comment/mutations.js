
const mutations = {
  FETCH_CHANNEL_COMMAUDIT_LIST_SUCC (state, data) { // 加载系统消息列表
    state.commAudit.list = data.data
    state.commAudit.count = data.count
  },
  FETCH_CHANNEL_COMMDETAIL_LIST_SUCC (state, data) { // 加载系统消息列表
    state.info.list = data.data
    state.info.count = data.count
  }
}
export default mutations
