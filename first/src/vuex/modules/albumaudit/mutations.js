
const mutations = {
  FETCH_GETALBUMLOADLIST_SUCC (state, data) {
    state.albumList = data.re
    state.count = data.count
  },
  FETCH_GETALBUMSEARCHLIST_SUCC (state, data) {
    state.albumSearchList = data.re
  },
  FETCH_REMOVEALBUMSEARCHLIST_SUCC (state, data) {
    state.albumSearchList = []
  }
}

export default mutations
