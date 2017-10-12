import Vue from 'vue';
import Router from 'vue-router';
import Ready from '@/components/Ready';
import Pin from '@/components/Pin';
import ActionSelection from '@/components/ActionSelection';
import AccountSelection from '@/components/AccountSelection';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ready',
      component: Ready
    },
    {
      path: '/pin',
      name: 'pin',
      component: Pin
    },
    {
      path: '/action-selection',
      name: 'action-selection',
      component: ActionSelection
    },
    {
      path: '/account-selection',
      name: 'account-selection',
      component: AccountSelection
    }
  ]
})
