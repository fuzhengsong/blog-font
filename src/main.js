// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'
import './assets/less/format.less'
import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css';
import store from './store/index'
import elementUi from 'element-ui'
import './icons/index';
import './filters/index';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'
import '@/assets/font/iconfont.js';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(elementUi);
Vue.use(mavonEditor);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
})
