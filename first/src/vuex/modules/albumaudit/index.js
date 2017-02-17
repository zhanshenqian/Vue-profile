/**
 * Created by daijiawei on 2016/11/9.
 */
 import * as actions from './actions'
 import * as getters from './getters'
 import mutations from './mutations'

 const state = {
   albumList: [],
   albumSearchList: [],
   count: 0
 }

 export default {
   state,
   getters,
   actions,
   mutations
 }
