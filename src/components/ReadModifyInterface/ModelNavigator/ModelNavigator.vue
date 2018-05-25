<template>
  <div id="NavigatorDiv">
    <p>Architecture Model</p>

    <ul id="ModelNavigator">
      <TreeItem
        class="TreeItem"
        v-bind:model="treeData">
      </TreeItem>
    </ul>
  </div>
</template>

<script>
import TreeItem from './TreeItem'
import { getBranchSha, getNodeTreeRecursive } from '../../../Utils/GithubApiCall'
import _ from 'lodash'

// ModelNavigator data
/* var data = {
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'wat' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        },
        { name: 'hello' },
        { name: 'wat' },
        {
          name: 'child folder',
          children: [
            { name: 'hello' },
            { name: 'wat' }
          ]
        }
      ]
    }
  ]
} */

export default {
  name: 'ModelNavigator',
  components: {
    TreeItem
  },
  data () {
    return {
      treeData: ''
    }
  },

  mounted () {
    getBranchSha('ysmahi', 'ArchiTest', 'master')
      .then((sha) => {
        getNodeTreeRecursive('ysmahi', 'ArchiTest', sha)
          .then((treeRecursive) => {
            let allUrlsTree = treeRecursive.map((element) => element.path)
            let tree = arrangeIntoTree(allUrlsTree)

            let dataNavigator = {
              name: 'Architecture Model',
              id: '',
              toggled: true,
              children: tree
            }

            this.treeData = dataNavigator
          })
      })
  }
}

let arrangeIntoTree = (paths) => {
  let tree = []

  _.each(paths, (path) => {
    let pathParts = path.split('/')

    let currentLevel = tree // initialize currentLevel to root

    _.each(pathParts, (part) => {
      // check to see if the path already exists.
      let existingPath = _.find(currentLevel, {
        name: part
      })

      if (existingPath) {
        // The path to this item was already in the tree, so don't add it again.
        // Set the current level to this path's children
        currentLevel = existingPath.children
      } else {
        let newPart = {
          name: part,
          children: [],
          id: path
        }

        currentLevel.push(newPart)
        currentLevel = newPart.children
      }
    })
  })

  return tree
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
#NavigatorDiv {
  margin: 2%;
}

</style>
