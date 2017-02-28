import * as http from '../../../utils/common'
// 获取系统消息 type=&index=&size=
export const fetchSystemMsg = ({ commit }, {type, index, size, vue}) => {
  http.post({
    url: '?v=' + Math.random(),
    data: {type, index, size},
    succ (json) {
      if (json.result === 1) {
        commit('FETCH_SYSEM_MSG_LIST_SUCC', json)
        vue.loading = false
      } else {
        alert(json.message)
      }
    }
  })
}
// 新增AddLiveConfigInfo
export const AddLiveConfigInfo = ({ commit }, {value, type, vue}) => {
  http.post({
    url: '/Manager/Live/AddLiveConfigInfo?v=' + Math.random(),
    data: {value, type},
    succ (json) {
      if (json.result === 1) {
        vue.loadmsg()
      } else {
        vue.$notify.error({
          title: '失败',
          message: json.message
        })
      }
    }
  })
}
// 编辑UpdateLiveConfigInfo
export const UpdateLiveConfigInfo = ({ commit }, {gid, value, vue}) => {
  http.post({
    url: '' + Math.random(),
    data: {gid, value},
    succ (json) {
      if (json.result === 1) {
        vue.$notify.info({
          title: '操作信息反馈',
          message: json.message
        })
        vue.loadmsg()
      } else {
        vue.$notify.error({
          title: '失败',
          message: json.message
        })
      }
    }
  })
}
// 删除DeleteLiveConfigInfo
export const DeleteLiveConfigInfo = ({ commit }, {gid, value, vue}) => {
  http.post({
    url: '?v=' + Math.random(),
    data: {gid},
    succ (json) {
      if (json.result === 1) {
        vue.$notify.info({
          title: '操作信息反馈',
          message: json.message
        })
        vue.loadmsg()
      } else {
        vue.$notify.error({
          title: '失败',
          message: json.message
        })
      }
    }
  })
}
