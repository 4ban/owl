import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'todo',
  storage: window.localStorage
})

Vue.use(Vuex)

function initialState () {
  return {
    lists: []
  }
}

const store = new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: initialState,
  getters: {
    getLists: state => list => {
      return state.lists.find(item => item.list === list)
    }
  },
  mutations: {
    setLists: (state, list) => {
      let oldList = state.lists.find(item => item.list === list.list)
      if (oldList) {
        state.lists.splice(state.lists.indexOf(oldList), 1, list)
      } else {
        state.lists.push(list)
      }
    },
    resetState: (state, list) => {
      state.lists.splice(state.lists.indexOf(list), 1)
      // Object.assign(state, initialState())
      // window.localStorage.removeItem('todo')
      // window.localStorage.clear()
    }
  },
  actions: {}
})

export default store
