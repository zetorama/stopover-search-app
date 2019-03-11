const express = require('express')
const morgan = require('morgan')
const { api } = require('./api')

const {
  SERVER_SERVE_STATIC,
  SERVER_LOG_FORMAT = 'short',
} = process.env

const app = exports.app = express()
app.use(morgan(SERVER_LOG_FORMAT))

app.use('/api/v1', api)

if (SERVER_SERVE_STATIC) {
  app.use('/', express.static(SERVER_SERVE_STATIC))
}
app.use('*', (_req, res) => res.status(404).json({ error: 'Document Not Found' }))
app.use((err, _req, res, _next) => res.status(err.status || 500).json({ error: err.message }))

exports.default = app
