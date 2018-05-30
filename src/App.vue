<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
import { getToken } from './Utils/GithubApiCall'
import Vue from 'vue'

Vue.use(VueCookie)

export default {
  name: 'App',
  beforeCreate () {
    let hasToken = this.$cookie.get('token')
    let searchUrl = document.location.pathname
    console.log('connect befororooro', !hasToken)

    if (searchUrl === '/redirect' && !hasToken) {
      getToken().then((token) => {
        this.$cookie.set('token', token, {path: '/'})
        this.$router.go('/')
      })
    } else if (searchUrl !== '/redirect' && !hasToken) {
      console.log('connexion')
      this.$router.push('/connection')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
