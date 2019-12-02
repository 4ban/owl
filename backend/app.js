import cors from 'cors'
import mongoose from 'mongoose'
var createError = require('http-errors')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var compression = require('compression')
const helmet = require('helmet')
var timeout = require('connect-timeout')
require('dotenv').config()
var indexRouter = require('./routes/index')

var app = express()

// Some security things from helmet
app.use(helmet())
// Compression, give a shot. Maybe it will compress the response
app.use(compression())
// Enable cors policies
app.use(cors())
// Time out for requests
app.use(timeout(10000))
app.use(haltOnTimedout)

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next()
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
  // user: process.env.MONGODB_USER,
  // pass: process.env.MONGODB_PASS
}

mongoose.connect(process.env.MONGODB_URL, options)

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // res.render('error')
  res.json({
    error: true,
    message: err.message
  })
})

module.exports = app
