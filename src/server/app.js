const express = require('express')

const app = exports.app = express()

app.use('/', (req, res) => res.json({foo: 'bar'}))

exports.default = app
