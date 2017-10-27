// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import store from './store/store.js';
import VModal from 'vue-js-modal';
import ATM_FSM_Manager from './fsm/atm_fsm_manager.js';

import customer_component from './components/Customer.vue';
import queryDialog from './components/QueryDialog.vue';

Vue.config.productionTip = false;

Vue.component('customer', customer_component);
Vue.component('query-dialog', queryDialog);

Vue.prototype.$fsm_manager = new ATM_FSM_Manager(router);

Vue.use(VModal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
