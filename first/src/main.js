// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import routersConfig from './routers.js'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import store from './vuex/store'

import MainHeader from './components/mainHeader.vue'
import MainNav from './components/mainNav.vue'

// vue插件
Vue.use(ElementUI)
Vue.use(VueRouter)

// vue组件
Vue.component('main-header', MainHeader)
Vue.component('main-nav', MainNav)

// 路由
const router = new VueRouter({routes: routersConfig})

/* eslint-disable */ //标题
router.beforeEach((to, from, next) => {
	document.title = to.name
	next(true)
})

// 创建vue
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

