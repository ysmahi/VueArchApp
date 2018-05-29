import Vue from 'vue'
import Router from 'vue-router'
import ReadModifyInterface from '../components/ReadModifyInterface/ReadModifyInterface'
import ConnectionPage from '../ConnectionPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ReadModifyInterface',
      component: ReadModifyInterface
    },
    {
      path: '/connection',
      name: 'ConnectionPage',
      component: ConnectionPage
    }
  ]
})
