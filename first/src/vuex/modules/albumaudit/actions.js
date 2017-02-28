
import * as http from '../../../utils/common'
// 加载
export const getAlbumLoadList = ({ commit }, {pi, ps, vue}) => {
  http.get({
    url: '?v=' + Math.random(),
    data: {pi, ps},
    succ (json) {
      if (json.rc === 1) {
        commit('FETCH_GETALBUMLOADLIST_SUCC', json)
        vue.type = true
      } else {
        vue.$notify({
          title: '失败',
          message: json.message,
          type: 'error'
        })
      }
    }
  })
}

// 搜索
export const getAlbumSearchList = ({ commit }, {uid, vue}) => {
  http.get({
    url: '?v=' + Math.random(),
    data: {uid},
    succ (json) {
      if (json.rc === 1) {
        commit('FETCH_GETALBUMSEARCHLIST_SUCC', json)
        vue.type = false
        vue.input = ''
      } else {
        // 如果没有在input里输入id 清除页面上渲染的数据
        commit('FETCH_REMOVEALBUMSEARCHLIST_SUCC', json)
        vue.$notify({
          title: '失败',
          message: json.message,
          type: 'error'
        })
      }
    }
  })
}

// 当页全部通过/manager/PhotoAlbumAudit/CheckPass?ids=1,2,3
export const getAlbumAdopt = ({ commit }, {ids, vue}) => {
  http.get({
    url: '?v=' + Math.random(),
    data: {ids},
    succ (json) {
      if (json.rc === 1) {
        console.log(7891, ids)
        vue.$notify({
          title: '成功',
          message: json.message,
          type: 'success'
        })
      } else {
        vue.$notify({
          title: '失败',
          message: json.message,
          type: 'error'
        })
      }
    }
  })
}

// 重置
export const getAlbumReset = ({ commit }, {ids, vue}) => {
  http.get({
    url: '?v=' + Math.random(),
    data: {ids},
    succ (json) {
      if (json.rc === 1) {
        if (vue.type === true) {
          vue.albumLoad()
        }
        if (vue.type === false) {
          vue.albumSearchReset()
          console.log(7894, vue.searchId)
        }
        vue.$notify({
          title: '成功',
          message: json.message,
          type: 'success'
        })
      } else {
        vue.$notify({
          title: '失败',
          message: json.message,
          type: 'error'
        })
      }
    }
  })
}
