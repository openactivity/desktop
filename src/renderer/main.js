// TODO：如果不用，记得注释掉，否则travis 和 appveyor 构建会失败
// import devtools from '@vue/devtools'
import Vue from 'vue'

// 引入所有的请求
import * as $http from "./api/meeting";

import App from './App'
import router from './router/index'
import store from './store'
import i18n from './i18n/'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = $http;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')

// if (process.env.NODE_ENV === 'development') {
//     devtools.connect('localhost', '9080')
// }
