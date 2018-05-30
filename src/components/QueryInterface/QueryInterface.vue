<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div className='QueryInterface'>
    <form action="#">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label has-placeholder">
        <input class="mdl-textfield__input"
               type="text" id="query"
               placeholder="Type your query here"
               v-model="query">
        <label class="mdl-textfield__label" for="query">Query</label>
      </div>
    </form>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
    v-on:click="launchQuery">
      Launch Query
    </button>
    <div v-if="response !== ''">
      <div id="DivTable">
        <Table id="Table"
          :data="response"
          :columns="gridColumns">
        </Table>
      </div>
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
              type="button"
              v-clipboard:copy="jsonResponse"
              v-clipboard:success="goToRaw">Go to Raw</button>
    </div>
  </div>
</template>

<script>
import { getBranchSha, getElementContent, getNodeTreeRecursive } from '../../Utils/GithubApiCall'
import * as alasql from 'alasql'
import {xml2json} from 'xml-js'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import Table from '../GenericComponents/Table'

Vue.use(VueClipboard)

export default {
  name: 'QueryInterface',
  components: {Table},
  data () {
    return {
      query: '',
      tablesCreated: false,
      response: ''
    }
  },
  computed: {
    jsonResponse: function () {
      return JSON.stringify(this.response, null, 4)
    },
    gridColumns: function () {
      return Object.keys(this.response[0])
    }
  },
  methods: {
    launchQuery: function () {
      if (this.tablesCreated) {
        let response = alasql(this.query)
        this.response = response
      } else {
        let username = 'ysmahi'
        let repoName = 'ArchiTest'
        let token = Vue.cookie.get('token')

        // Retrieves data in the github repo
        getBranchSha(username, repoName, 'master', token)
          .then(sha => {
            getNodeTreeRecursive(username, repoName, sha, token)
              .then(tree => {
                // Build array of element paths
                let pathElements = tree
                  .filter(el => (!el.path.includes('folder.xml') &&
                    el.path.includes('.xml') &&
                    !el.path.includes('relations/') &&
                    !el.path.includes('diagrams/')))
                  .map(el => el.path)

                // build array of relations paths
                let pathRelations = tree
                  .filter(el => (!el.path.includes('folder.xml') &&
                    el.path.includes('.xml') &&
                    el.path.includes('relations/') &&
                    !el.path.includes('diagrams/')))
                  .map(el => el.path)

                let arrPromises = pathElements
                  .map(path => {
                    return new Promise((resolve, reject) => {
                      resolve(getElementContent(username, repoName, path, token))
                    })
                  })

                Promise.all(arrPromises)
                  .then(contents => {
                    // build an array with elements data
                    let decodedContents = contents.map(content => JSON.parse(xml2json(atob(content))))
                    let arrayElements = decodedContents.map(el => {
                      return {
                        id: el.elements[0].attributes.id,
                        type: el.elements[0].name,
                        name: el.elements[0].attributes.name
                      }
                    })

                    // build an array of element properties
                    let arrayProperties = decodedContents.filter(el => el.elements[0].hasOwnProperty('elements'))
                      .map(el => {
                        return el.elements[0].elements.map(elProp => {
                          return {
                            id: el.elements[0].attributes.id,
                            key: elProp.attributes.key,
                            value: elProp.attributes.value
                          }
                        })
                      })
                      .reduce((arr1, arr2) => arr1.concat(arr2), [])

                    // Build array of Promises that will return content of relations
                    let arrPromisesRelations = pathRelations
                      .map(path => {
                        return new Promise((resolve, reject) => {
                          resolve(getElementContent(username, repoName, path, token))
                        })
                      })
                    Promise.all(arrPromisesRelations)
                      .then(contents => {
                        // build an array with relations data
                        let decodedRel = contents.map(content => JSON.parse(xml2json(atob(content))));
                        let arrayRelations = decodedRel.map(el => {
                          let nameRel = ''
                          if (typeof el.elements[0].attributes.name !== 'undefined') {
                            nameRel = el.elements[0].attributes.name
                          }

                          return {
                            id: el.elements[0].attributes.id,
                            type: el.elements[0].name.split(':')[1],
                            name: nameRel,
                            source: el.elements[0].elements[0].attributes.href.split('#')[1],
                            target: el.elements[0].elements[1].attributes.href.split('#')[1]
                          }
                        })

                        // Create tables
                        alasql('CREATE TABLE Elements')
                        alasql('CREATE TABLE Properties')
                        alasql('CREATE TABLE Relations')

                        // Fill tables
                        alasql.tables.Elements.data = arrayElements
                        alasql.tables.Properties.data = arrayProperties
                        alasql.tables.Relations.data = arrayRelations
                        this.tablesCreated = true

                        // Return query response
                        let response = alasql(this.query)
                        this.response = response
                      })
                  })
              })
          })
      }
    },
    // Go to raw when launched on port 4000
    goToRaw: function () {
      document.location.replace('http://localhost:4000')
    }
  }
}
</script>

<style scoped>
#DivTable {
  text-align:center;
}

#Table {
  margin: auto;
}
</style>
