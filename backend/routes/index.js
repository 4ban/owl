var express = require('express')
var router = express.Router()
const repository = require('../repositories')

router.get('/', (req, res, next) => {
  var message = {
    error: false,
    message: 'Nothing to show'
  }
  res.json(message)
})

// Get all tasks of list
router.get('/:list', (req, res, next) => {
  const { list } = req.params
  repository.findAll(list).then(tasks => {
    res.json(tasks)
  }).catch(error =>  {
    console.log(error)
    let err = {
      error: true,
      message: error
    }
    res.json(err)
  })
})

// Create task for the list
router.post('/:list', (req, res, next) => {
  const { list } = req.params
  const { body } = req.body
  repository.create(list, body).then((todo) => {
    res.json(todo)
  }).catch(error => {
    console.log(error)
    let err = {
      error: true,
      message: error
    }
    res.json(err)
  })
})

// Delete one task by id
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  repository.deleteById(id).then((ok) => {
    let result = {
      error: false,
      message: 'Task deleted successfully'
    }
    res.status(200).json(result)
  }).catch(error => {
    console.log(error)
    let err = {
      error: true,
      message: error
    }
    res.json(err)
  })
})

// Delete all documents in the collection
router.delete('/delete', (req, res) => {
  repository.deleteAll().then((ok) => {
    let result = {
      error: false,
      message: 'Collection wiped successfully'
    }
    res.status(200).json(result)
  }).catch(error => {
    console.log(error)
    let err = {
      error: true,
      message: error
    }
    res.json(err)
  })
})

module.exports = router
