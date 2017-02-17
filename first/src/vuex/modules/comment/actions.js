import * as http from '../../../utils/common'
// 获取消息 channel_id=房间号&state=状态
export const fetchChannelCommAudit = ({ commit }, {channel_id, state, starttime, endtime, pageindex, pagesize, vue}) => {
  http.post({
    url: '/Manager/ChannelCommAudit/GetChannelCommAudit?v=' + Math.random(),
    data: {channel_id, state, starttime, endtime, pageindex, pagesize},
    succ (json) {
      if (json.result === 1) {
        commit('FETCH_CHANNEL_COMMAUDIT_LIST_SUCC', json)
        vue.loading = false
      } else {
        vue.$notify.error({
          title: '失败',
          message: json.message
        })
      }
    }
  })
}
// updataState
export const updataState = ({ commit }, {channel_id, state, vue}) => {
  http.post({
    url: '/Manager/ChannelCommAudit/UpdateAuditState?v=' + Math.random(),
    data: {channel_id, state},
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
// fetchGetChannelConmmList 获取详情
export const fetchGetChannelConmmList = ({ commit }, {channel_id, liveid, content, pageindex, pagesize, vue}) => {
  http.post({
    url: '/Manager/ChannelCommAudit/GetChannelConmmListByChannelId?v=' + Math.random(),
    data: {channel_id, liveid, content, pageindex, pagesize},
    succ (json) {
      if (json.result === 1) {
        commit('FETCH_CHANNEL_COMMDETAIL_LIST_SUCC', json)
        vue.loading = false
      } else {
        vue.$notify.error({
          title: '失败',
          message: json.message
        })
      }
    }
  })
}
// deleteMsg 删除评论
export const deleteMsg = ({ commit }, {channel_id, msgids, vue}) => {
  http.post({
    url: '/Manager/ChannelCommAudit/DeleteChannelConmm?v=' + Math.random(),
    data: {channel_id, msgids},
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
// ShieldUser
export const ShieldUser = ({ commit }, {uid, reason, vue}) => {
  http.get({
    url: '/Manager/User/ShieldUser?v=' + Math.random(),
    data: {uid, reason},
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
// 新增AddLiveConfigInfo
// export const AddLiveConfigInfo = ({ commit }, {value, type, vue}) => {
//   http.post({
//     url: '/Manager/Live/AddLiveConfigInfo?v=' + Math.random(),
//     data: {value, type},
//     succ (json) {
//       if (json.result === 1) {
//         vue.loadmsg()
//       } else {
//         vue.$notify.error({
//           title: '失败',
//           message: json.message
//         })
//       }
//     }
//   })
// }
