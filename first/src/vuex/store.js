import Vue from 'vue'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = true
import configurable from './modules/configurable/index'
import commAudit from './modules/comment/index'
import album from './modules/albumaudit/index'
export default new Vuex.Store({
  modules: {
    configurable,
    commAudit,
    album
  },
  strict: debug
})
