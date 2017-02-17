export const fetchComAudit = state => {
  return {
    list: state.commAudit.list,
    count: state.commAudit.count
  }
}
export const fetchComAuditInfo = state => {
  return {
    list: state.info.list,
    count: state.info.count
  }
}

