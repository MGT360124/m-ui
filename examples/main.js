// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import M from '../packages/index.js';
import './assets/styles/docs.css';
import './assets/styles/highlight-colorbrewer.scss';
import '../theme-chalk/index.scss';
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
Vue.use(VueRouter);
Vue.config.productionTip = false

import CodeBlock from './demos/CodeBlock.vue' // 展示代码块的组件
Vue.component('code-block', CodeBlock);
Vue.use(M);
// console.log("M",M)
require('es6-promise').polyfill();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
