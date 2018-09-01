<template>
    <div id="FormDiv">
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <input v-model="nameElement"
                 class="mdl-textfield__input"
                 type="text" id="nameElement"
                 :placeholder="nameElement">
          <label class="mdl-textfield__label" for="nameElement">Name</label>
        </div>
      </form>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <input v-model="typeElement"
                 class="mdl-textfield__input"
                 type="text" id="typeElement"
                 :placeholder="typeElement">
          <label class="mdl-textfield__label" for="typeElement">Type of Element</label>
        </div>
      </form>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <input class="mdl-textfield__input"
                 type="text" pattern="-?[0-9]*(\.[0-9]+)?"
                 id="idElement"
                 disabled
                 v-model="idElement">
          <label class="mdl-textfield__label" for="idElement">ID</label>
          <span class="mdl-textfield__error">Input is not a number!</span>
        </div>
      </form>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <textarea
            class="mdl-textfield__input"
            type="text"
            rows= "5"
            id="documentationElement"
            v-model="documentationElement"
            :placeholder="documentationElement">
          </textarea>
          <label class="mdl-textfield__label" for="documentationElement">Documentation</label>
        </div>
      </form>
      <form action="#" id="PropertiesForm">
        <div v-for="(prop, index) in propertiesElement"
             :key="index"
             class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <input
            class="mdl-textfield__input"
            type="text"
            :id="prop.key"
            v-model="prop.value"
            :placeholder="prop.value">
          <label class="mdl-textfield__label" :for="prop.key">{{prop.key}}</label>
        </div>
      </form>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ReadModifyForm',
  data () {
    return {
    }
  },
  computed: mapState({
    treeData: state => state.treeNavigator,
    nameElement: state => state.displayedElementName,
    idElement: state => state.displayedElementId,
    documentationElement: state => state.displayedElementDocumentation,
    typeElement: state => state.displayedElementType,
    propertiesElement: state => state.displayedElementProperties
  })
}
</script>

<style scoped>
#FormDiv {
  margin : 2%;
}

#PropertiesForm {
  display: flex;
  flex-direction: column;
}
</style>
