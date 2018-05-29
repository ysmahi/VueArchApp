<template>
  <div>
    <button class="mdl-button mdl-js-button mdl-button--raised"
    @click="redirectToGithub">
      Connect with Github
    </button>
  </div>
</template>

<script>
const githubAppId = 'bc56b290623c1533b9ac'

export default {
  name: 'ConnexionPage',
  methods: {
    redirectToGithub: () => {
      document.location.replace('https://github.com/login/oauth/authorize?client_id=' + githubAppId)
    }
  }
}
</script>

<style scoped>

</style>
