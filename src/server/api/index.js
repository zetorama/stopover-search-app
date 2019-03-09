const { Router } = require('express')
const { json } = require('body-parser')
const { getAmadeus } = require('../services/amadeus')
const { hotels } = require('../dao/hotels')

const pick = (obj, props) => props.reduce(
  (all, el) => obj[el] == null ? all : Object.assign(all, { [el]: obj[el] }), {},
)

const api = exports.api = new Router()

api.route('/').get((_req, res) => res.json({ ok: true, version: 1 }))

api.route('/find-hotels').post(json(), async (req, res, next) => {
  const params = pick(req.body || {}, [
    // support only these:
    'cityCode', 'checkInDate', 'checkOutDate',
    'roomQuantity', 'adults',
    'radius', 'radiusUnit',
    'amenities', 'ratings',
    'sort', 'page',
  ])

  try {
    const client = await getAmadeus()
    const [data, meta] = await hotels.findOffers(client, params)

    res.json({ ok: true, data, meta })

  } catch (err) {
    console.error('FAILED dao.hotels.findOffers()', err)

    if (err instanceof Error) {
      // throw
      next(err)
      return
    }

    const { response, code, description: errors } = err

    res.status(response.statusCode).json({ ok: false, code, errors })
  }
})

exports.default = api
