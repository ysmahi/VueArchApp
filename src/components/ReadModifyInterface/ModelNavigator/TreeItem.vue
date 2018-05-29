<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle">
      {{ model.name }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <TreeItem
        class="TreeItem"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </TreeItem>
    </ul>
  </li>
</template>

<script>
import { xml2json } from 'xml-js'
import { getElementContent } from '../../../Utils/GithubApiCall'

export default {
  name: 'TreeItem',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        // go into children folder to read name of parent folder in folder.xml

        console.log('path', this.model.id)
        // Checks if node already opened to avoid doing unnecessary requests
        if (!this.$store.state.alreadyToggledFolders.includes(this.model.id) && typeof this.model.id !== 'undefined') {
          this.$store.commit('updateAlreadyToggled', this.model.id)

          // Filter to go only in folder children to find folder.xml
          let arrPromises = this.model.children.filter(child => child.children.length > 0)
            .map(child => {
              return new Promise((resolve, reject) => {
                resolve(getElementContent('ysmahi', 'ArchiTest', child.id + '/folder.xml'))
              })
            })

          // Async retrieval of all folder names
          Promise.all(arrPromises)
            .then((contentFolders) => {
              let jsonContentFolder = contentFolders.map(content => JSON.parse(xml2json(atob(content))))
              let nameFolders = jsonContentFolder.map(cont => cont.elements[0].attributes.name)

              this.$store.commit('updateNameFoldersTreeNavigator', {id: this.model.id, nameFolders: nameFolders})
            })

          // Retrieval of leaves' name
          arrPromises = this.model.children.filter(child => (child.children.length === 0 && child.name !== 'folder.xml' && child.name !== 'README.md'))
            .map(child => {
              return new Promise((resolve, reject) => {
                resolve(getElementContent('ysmahi', 'ArchiTest', child.id))
              })
            })

          Promise.all(arrPromises)
            .then((contentElements) => {
              let jsonContentElements = contentElements.map((content) => JSON.parse(xml2json(atob(content))))
              let nameElements = jsonContentElements.map(content => content.elements[0].attributes.name)

              this.$store.commit('updateNameLeavesTreeNavigator', {id: this.model.id, nameElements: nameElements})
            })
        }
        this.open = !this.open
      } else if (!this.isFolder) {
        // If the clicked node is a model's leaf
        getElementContent('ysmahi', 'ArchiTest', this.model.id)
          .then((content) => {
            let contentElement = atob(content)
            let jsonContentElement = JSON.parse(xml2json(contentElement))
            // TODO : Do something with content
            // this.props.dataElementHandler(jsonContentElement, this.model.id)
          })
      }
    }
  }
}

</script>

<style scoped>
  body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }
  .TreeItem {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }

</style>
