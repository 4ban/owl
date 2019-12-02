<template>
  <b-container>
    <b-alert variant="success" show class="mt-5">You have to choose the list or create a new one. Use URL: /listName</b-alert>
    <b-form inline @submit="createList" class="mb-5">
      <b-row class='w-100' no-gutters>
        <b-col cols="10">
          <b-input v-model="newList" id="inline-form-input-name" required class="w-100" placeholder="Enter list name" ></b-input>
        </b-col>
        <b-col>
          <b-button class="ml-1" block type="submit" variant="danger">Create</b-button>
        </b-col>
      </b-row>
    </b-form>
    List of lists:
    <b-list-group class="list-group">
      <b-list-group-item v-for="list in lists" :key="list.id"  :href="list">{{ list }}</b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      lists: [],
      newList: ''
    }
  },
  mounted () {
    this.getAllLists()
  },
  methods: {
    getAllLists () {
      this.$http.get('/lists/all').then((result) => {
        this.lists = result.data.reverse()
      })
    },
    createList (evt) {
      evt.preventDefault()
      this.$router.push({ path: `/${this.newList}` })
    }
  }
}
</script>

<style scoped>
.list-group {
    max-height: 200px;
    overflow-y:scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
