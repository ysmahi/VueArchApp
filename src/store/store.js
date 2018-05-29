import Vue from 'vue'
import Vuex from 'vuex'
import { getNodeById } from '../Utils/UsefulFuncs'
Vue.use(Vuex)

// State
const state = {
  alreadyToggledFolders: [''],
  treeNavigator: {}
}

// Getters
const getters = {}

// Mutations
const mutations = {
  updateAlreadyToggled (state, path) {
    state.alreadyToggledFolders = [path, ...state.alreadyToggledFolders]
  },
  updateNameLeavesTreeNavigator (state, payload) {
    // Change name of children leaves in treeNavigator
    // payload = {id: <path of node in tree>, nameElements: <name of children elements>}
    let nodeToChange = getNodeById(payload.id, state.treeNavigator)

    for (let i = 0; i < payload.nameElements.length; i++) {
      nodeToChange.children[i].name = payload.nameElements[i]
    }
  },
  updateNameFoldersTreeNavigator (state, payload) {
    // Change name of children folders in treeNavigator
    // payload = {id: <path of node in tree>, nameElements: <name of children folders>}
    let nodeCh = getNodeById(payload.id, state.treeNavigator).children.filter(el => el.children.length > 0)

    for (let i = 0; i < payload.nameFolders.length; i++) {
      nodeCh[i].name = payload.nameFolders[i]
    }
  },
  updateTreeNavigator (state, tree) {
    state.treeNavigator = tree
  }
}

// Actions
const actions = {
  // updateNameLeaves ({state, commit})
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
