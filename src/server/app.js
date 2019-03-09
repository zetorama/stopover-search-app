const express = require('express')
const morgan = require('morgan')
const { api } = require('./api')

const {
  SERVER_LOG_FORMAT = 'short',
  NODE_ENV = 'development',
} = process.env

const app = exports.app = express()
app.use(morgan(SERVER_LOG_FORMAT))

app.use('/api/v1', api)
app.use('*', (_req, res) => res.status(404).json({ error: 'Not Found' }))

exports.default = app
