<template>
  <div>
    <b-row align-h="center" class="mb-2 mt-5">
      <b-col sm="12" md="8" lg="6" xl="6">
        <b-form inline @submit="createTask">
          <b-row class='w-100' no-gutters>
            <b-col cols="10">
              <b-input v-model="newTaskBody" id="inline-form-input-name" required class="w-100" placeholder="Enter item" ></b-input>
            </b-col>
            <b-col>
              <b-button class="ml-1" block type="submit" variant="danger">Add</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mt-3">
      <b-col sm="12" md="8" lg="6" xl="6" class="border-secondary">
        <b-alert variant="success" show v-show="newList">New list "{{ list }}". Add new item.</b-alert>
        <div class="text-center" v-show="!tasks.length && !newList">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <b-list-group class="list-group text-left bg-light border border-gray p-2">
          <draggable v-model="tasks" @start="drag=true" @end="drag=false">
            <b-list-group-item v-for="task in tasks" :key="task.id" class="list-item mt-2 border border-gray">
              <b-row class="w-100">
                <b-col cols=11>{{task.body}}</b-col>
                <b-col cols=1 v-show="!task._id && !task.retry"><b-spinner label="Spinning"></b-spinner></b-col>
                <b-col cols=1 v-show="task.retry"><b-button @click="retryTask(task)" size='sm' variant="danger"><font-awesome-icon :icon="['fas', 'undo']" /></b-button></b-col>
                <b-col cols=1 v-show="task._id"><b-button @click="deleteTask(task)" size='sm' variant="danger"><font-awesome-icon :icon="['fas', 'times-circle']" class="fa-md"/></b-button></b-col>
              </b-row>
            </b-list-group-item>
          </draggable>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row align-h="center" >
      <b-col sm="12" md="8" lg="6" xl="6" align="end">
        <b-button id="delete-button" class="mt-3 w-25 mr-2" @click="deleteList()" variant="danger">Delete</b-button>
        <b-button id="reset-button" class="mt-3 w-25" @click="reset()" variant="danger">Reset</b-button>

        <b-tooltip target="delete-button" triggers="hover" variant="danger">Delete items in the list</b-tooltip>
        <b-tooltip target="reset-button" triggers="hover" variant="danger">Reset the order of the items</b-tooltip>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'TaskList',
  props: {
    list: String
  },
  components: {
    draggable
  },
  data () {
    return {
      newTaskBody: '',
      tasks: [],
      newList: false
    }
  },
  watch: {
    tasks: function (val) {
      this.$store.commit('setLists', { list: this.list, tasks: this.tasks })
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    createTask (evt) {
      evt.preventDefault()
      this.tasks.push({ body: this.newTaskBody, retry: false })
      this.$http.post('/' + this.list, {
        body: this.newTaskBody
      }).then((result) => {
        // Simulate the server long saving
        setTimeout(() => this.tasks.splice(this.tasks.length - 1, 1, result.data), 1000)
        this.newTaskBody = ''
        this.newList = false
      }).catch(error => {
        console.log(error)
        this.tasks.splice(this.tasks.length - 1, 1, { body: this.newTaskBody, retry: true })
        this.newTaskBody = ''
      })
    },
    retryTask (task) {
      let index = this.tasks.indexOf(task)
      this.tasks.splice(index, 1, { body: task.body, retry: false })
      this.$http.post('/' + this.list, {
        body: task.body
      }).then((result) => {
        // Simulate the server long saving
        setTimeout(() => this.tasks.splice(index, 1, result.data), 1000)
        console.log('retry')
      }).catch(error => {
        console.log('retry: ', error)
        this.tasks.splice(index, 1, { body: task.body, retry: true })
      })
    },
    getList () {
      let tasks = this.$store.getters.getLists(this.list)
      if (tasks) {
        this.tasks = tasks.tasks
      } else {
        this.$http.get('/' + this.list).then((result) => {
          if (!result.data.length) {
            this.newList = true
          }
          this.tasks = result.data.reverse()
        })
      }
    },
    deleteTask (task) {
      this.$http.delete('/delete/' + task._id).then((result) => {
        if (result.data.error === false) {
          let index = this.tasks.indexOf(task)
          this.tasks.splice(index, 1)
          this.newList = this.tasks.length === 0
        }
      })
    },
    reset () {
      this.$store.commit('resetState', this.list)
      this.getList()
    },
    deleteList () {
      console.log(this.list)
      this.$http.delete('/delete/list/' + this.list).then((result) => {
        if (result.data.error === false) {
          this.tasks = []
          this.newList = true
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.list-group{
    max-height: 600px;
    overflow-y:scroll;
    -webkit-overflow-scrolling: touch;
}
.list-item {
padding: 10px;
margin-top: 10px;
border: none;
border-radius: 5px;
font-family: 'Candal', sans-serif;
background: #fff;
display: flex;
flex-direction: row;
}
.list-item{
  flex-grow: 2;
}
.list-item .remove {
color : rgb(180, 35, 35);
margin-right: 5px;
cursor:pointer;
text-decoration: none;
}
</style>
