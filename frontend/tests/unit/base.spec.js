// import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue'
import Vuex from 'vuex'
import axios from 'axios'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import TaskList from '@/components/TaskList.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
library.add(faTimesCircle)
library.add(faUndo)

localVue.component('font-awesome-icon', FontAwesomeIcon)

localVue.prototype.$http = axios
localVue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API

describe('Home.vue view', () => {
  it('renders message', () => {
    const wrapper = shallowMount(Home, { localVue })
    expect(wrapper.text()).toMatch('You have to choose the list or create a new one. Use URL: /listName')
  })
})

describe('TaskList.vue component', () => {
  let actions
  let state
  let getters
  let mutations
  let store

  beforeEach(() => {
    actions = {}
    state = {
      lists: [
        {
          list: 'test_not_empty',
          tasks: [
            {
              body: 'test'
            }
          ]
        }
      ]
    }
    getters = {
      getLists: state => list => {
        return state.lists.find(item => item.list === list)
      }
    }
    mutations = {
      setLists: (state, list) => {
        state.lists.push(list)
      },
      updateLists: (state, list) => {
        state.lists.splice(state.lists.indexOf(list), 1, list)
      },
      resetState: (state, list) => {
        state.lists.splice(state.lists.indexOf(list), 1)
      }
    }
    store = new Vuex.Store({
      actions,
      state,
      getters,
      mutations
    })
  })

  it('renders the list with items', () => {
    const list = 'test_not_empty'
    const wrapper = shallowMount(TaskList, {
      propsData: { list }, store, localVue
    })
    expect(wrapper.contains('.list-item')).toBe(true)
  })

  it('renders the item: test', () => {
    const list = 'test_not_empty'
    const wrapper = shallowMount(TaskList, {
      propsData: { list }, store, localVue
    })
    let item = wrapper.find('.list-item')
    expect(item.text()).toBe('test')
  })
})
