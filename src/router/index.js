import Vue from 'vue'
import Router from 'vue-router'
import ConnectionPage from '../ConnectionPage'
import QueryInterface from '../components/QueryInterface/QueryInterface'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QueryInterface',
      component: QueryInterface
    },
    {
      path: '/connection',
      name: 'ConnectionPage',
      component: ConnectionPage
    }
  ]
})
