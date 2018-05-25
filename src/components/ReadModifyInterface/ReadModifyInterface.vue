<template>
  <div id="ReadModifyInterface">
    <ModelNavigator/>
    <ReadModifyForm/>
  </div>
</template>

<script>
import ReadModifyForm from './ReadModifyForm/ReadModifyForm'
import ModelNavigator from './ModelNavigator/ModelNavigator'

export default {
  name: 'ReadModifyInterface',
  components: {ReadModifyForm, ModelNavigator}
}
</script>

<style scoped>
#ReadModifyInterface {
  display: flex;
}
</style>
