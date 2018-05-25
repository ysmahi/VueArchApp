<template>
    <div id="FormDiv">
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <input v-model="nameElement"
                 class="mdl-textfield__input"
                 type="text" id="nameElement"
                 v-bind:placeholder="nameElement">
          <label class="mdl-textfield__label" for="nameElement">Name</label>
        </div>
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
      </form>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
          <textarea
            class="mdl-textfield__input"
            type="text"
            rows= "5"
            id="documentationElement"
            v-model="documentationElement"
            v-bind:placeholder="documentationElement">
          </textarea>
          <label class="mdl-textfield__label" for="documentationElement">Documentation</label>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'ReadModifyForm',
  data () {
    return {
      nameElement: 'Element 1',
      idElement: 0,
      documentationElement: 'My Documentation'
    }
  }
}
</script>

<style scoped>
#FormDiv {
  margin : 2%;
}
</style>
