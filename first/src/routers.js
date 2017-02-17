
export default [
  {path: '/', redirect: '/test'},
  { /*  */
    path: '/test', name: '登录界面', component: (resolve) => { require.ensure([], () => { resolve(require('./views/test')) }, 'test') }
  },
  { /*  */
    path: '/configurable/system', name: '系统消息管理', component: (resolve) => { require.ensure([], () => { resolve(require('./views/configurable/system')) }, 'configurable.system') }
  },
  { /*  */
    path: '/configurable/anchor', name: '主播弹框消息管理', component: (resolve) => { require.ensure([], () => { resolve(require('./views/configurable/anchor')) }, 'configurable.anchor') }
  },
  { /*  */
    path: '/comment', name: '评论审核管理', component: (resolve) => { require.ensure([], () => { resolve(require('./views/comment/index')) }, 'comment.index') }
  },
  { /*  */
    path: '/comment/info/:id/:type', name: '评论审核后台', component: (resolve) => { require.ensure([], () => { resolve(require('./views/comment/info')) }, 'comment.info') }
  },
  { /*  */
    path: '/albumaudit', name: '相册审核', component: (resolve) => { require.ensure([], () => { resolve(require('./views/albumaudit/index')) }, 'reset') }
  }
]
