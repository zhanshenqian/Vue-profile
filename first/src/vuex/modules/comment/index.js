/**
 * Created by weigangqiang on 2016/12/29.
 */
 import * as actions from './actions'
 import * as getters from './getters'
 import mutations from './mutations'

 const state = {
   commAudit: {
     list: [],
     count: 0
   },
   info: {
     list: [],
     count: 0
   }
 }

 export default {
   state,
   getters,
   actions,
   mutations
 }
