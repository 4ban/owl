<template>
  <b-container>
    <TaskList :list=list />
  </b-container>
</template>

<script>
// @ is an alias to /src
import TaskList from '@/components/TaskList.vue'

export default {
  name: 'todo',
  components: {
    TaskList
  },
  data () {
    return {
      list: this.$route.params.list
    }
  },
  methods: {
  }
}
</script>
