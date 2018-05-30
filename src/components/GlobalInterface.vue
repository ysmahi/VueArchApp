<template>
  <AppBarWithTabs
    :nameAppBar="nameAppBar"
    :dataTabs="dataTabs">
  </AppBarWithTabs>
</template>

<script>
import AppBarWithTabs from './GenericComponents/AppBarWithTabs'
import ReadModifyInterface from '../components/ReadModifyInterface/ReadModifyInterface'
import QueryInterface from '../components/QueryInterface/QueryInterface'

export default {
  name: 'GlobalInterface',
  components: {AppBarWithTabs},
  data () {
    return {
      nameAppBar: 'ArchWebApp',
      dataTabs: [
        {name: 'Display and Update Interface',
          component: ReadModifyInterface},
        {name: 'Query Interface',
          component: QueryInterface}
      ]
    }
  }
}
</script>

<style scoped>

</style>
