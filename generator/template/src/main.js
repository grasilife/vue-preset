<%_ if (options.application === 'mobile') { _%>
import 'lib-flexible';
<%_ } _%>
import Vue from 'vue';
import App from './App.vue';
import store from "./store/index";
import router from './router'
import './components/global';
import './common/errorPlugin';
import './icons';
import './filters';
import './services';
<%_ if (options['ui-framework'] === 'element-ui') { _%>
import './vendor/element';
<%_ } else if (options['ui-framework'] === 'iview') { _%>
import './vendor/iview';
<%_ } else if (options['ui-framework'] === 'ant') { _%>
import './vendor/ant';
<%_ } _%>

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
