import Vue from 'vue'
import Router from 'vue-router'
import ConnectionPage from '../ConnectionPage'
import GlobalInterface from '../components/GlobalInterface'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GlobalInterface',
      component: GlobalInterface
    },
    {
      path: '/connection',
      name: 'ConnectionPage',
      component: ConnectionPage
    }
  ]
})
