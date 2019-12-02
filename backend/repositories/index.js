import Tasks from '../models/schema.model'

class TasksRepository {
  constructor(model) {
    this.model = model
  }

  create(list, body) {
    // To simulate a save error, change "this.model" to "this.model1" and restart the backend
    // or just turn off the backend
    const task = new this.model({
      list,
      body
    })
    try {
      return task.save()
    } catch (error) {
      return { error: true, message: error }
    }
  }

  findAll(list) {
    return this.model.find({ list: list })
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id)
  }

  deleteAll() {
    return this.model.deleteMany()
  }
}

module.exports = new TasksRepository(Tasks)