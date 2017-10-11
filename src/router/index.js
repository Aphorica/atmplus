import Vue from 'vue'
import Router from 'vue-router'
import Ready from '@/components/Ready'
import Pin from '@/components/Pin'

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
    }
  ]
})
