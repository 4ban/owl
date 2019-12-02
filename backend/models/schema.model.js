import mongoose from 'mongoose'

const { Schema } = mongoose

let Tasks = null

try {
  const tasksSchema = new Schema({
    list: { type: String },
    body: { type: String },
    date: { type: Date, default: Date.now }
  })

  tasksSchema.index({ list: 1 })
  tasksSchema.index({ body: 1 })

  Tasks = mongoose.model('tasks', tasksSchema)
} catch (error) {
  console.log(error)
  // Already exists
  Tasks = mongoose.model('tasks')
}

export default Tasks
