const { Router } = require('express')
const { json } = require('body-parser')
const validator = require('express-validator')
const { validationResult } = require('express-validator/check')
const { getAmadeus } = require('../services/amadeus')
const { hotels } = require('../dao/hotels')
const { pickData, hotelOffers } = require('./data-input')
const { validationErrorView } = require('../views/errors-view')

const VERSION = exports.VERSION = 1

const api = exports.api = new Router()

// Enable same middleware for everything
api.use(json(), validator())

// Simple root
api.route('/').get((_req, res) => res.json({ ok: true, version: VERSION }))

// Hotels
api.route('/find-hotels').post(Object.values(hotelOffers), async (req, res, next) => {
  const errors = validationResult(req).formatWith(validationErrorView)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const params = pickData(req, Object.keys(hotelOffers))

  try {
    const client = await getAmadeus()
    const [data, meta] = await hotels.findOffers(client, params)

    res.json({ ok: true, data, meta })

  } catch (err) {
    console.error('FAILED dao.hotels.findOffers()', err)

    // NOTE: service (i.e. Amadeus SDK) throws either regular Error, or custom object
    if (err instanceof Error) {
      // throw
      next(err)
      return
    }

    const { response = {}, code, description: errors } = err

    res.status(response.statusCode || 500).json({ ok: false, code, errors })
  }
})

exports.default = api
