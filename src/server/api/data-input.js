const { body } = require('express-validator/check')

const pick = (obj, props) => props.reduce(
  (all, el) => obj[el] == null ? all : Object.assign(all, { [el]: obj[el] }), {},
)

const pickData = exports.pickData = (req, fields) => pick(req.body, fields)

const hotelOffers = exports.hotelOffers = {
  cityCode: body('cityCode', 'City code is required and must be exactly 3 chars')
    .isLength({ min: 3, max: 3 })
    .customSanitizer(str => str.toUpperCase()),

  checkInDate: body('checkInDate', 'Check in date must be in format YYYY-MM-DD')
    .optional()
    .matches(/^(|\d{4}-\d{2}-\d{2})$/)
    .custom((checkInDate, { req }) => {
      const now = new Date()
      const then = new Date(checkInDate + 'T' + now.toISOString().split('T')[1])
      if (now > then) {
        throw new Error('Check in date must be set in future');
      }
      return true
    }),
  checkOutDate: body('checkOutDate', 'Check out date must be in format YYYY-MM-DD')
    .optional()
    .matches(/^(|\d{4}-\d{2}-\d{2})$/)
    .custom((checkOutDate, { req }) => {
      if (!checkOutDate) return true

      if (!req.body.checkInDate) {
        throw new Error('Both Check in date and Check out date must be specified')
      }
      if (new Date(checkOutDate) <= new Date(req.body.checkInDate)) {
        throw new Error('Check out date must be after check in date');
      }
      return true
    }),
  sort: body('sort', 'Sort supports only PRICE and DISTANCE options')
    .optional()
    .matches(/^(PRICE|DISTANCE)$/),
  page: body('page', 'Paging is specified as an object in form `{ limit: number, offset?: string }`')
    .optional()
    .custom(page => {
      if (!page) return

      if ('limit' in page && isNaN(Number(page.limit))) {
        throw new Error('Paging limit must be a number')
      }
      if (page.offset && typeof page.offset !== 'string') {
        throw new Error('Paging offset must be a string')
      }
      return true
    }),
}

exports.default = pickData
