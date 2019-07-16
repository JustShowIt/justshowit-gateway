import Vue from 'vue'
import Router from 'vue-router'

import JustShowMeAddressInput from './views/JustShowMeAddressInput.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'JustShowMeAddressInput',
      component: JustShowMeAddressInput
    }
  ]
})
