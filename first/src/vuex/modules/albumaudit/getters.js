export const fetchAlbumList = state => {
  return {
    albumList: state.albumList,
    count: state.count,
    albumSearchList: state.albumSearchList
  }
}
