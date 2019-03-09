const Amadeus = require('amadeus')

const {
  AMADEUS_ENV = 'test',
  AMADEUS_KEY,
  AMADEUS_SECRET,
} = process.env

let amadeus = null

const getAmadeus = exports.getAmadeus = async () => {
  if (!amadeus) {
    amadeus = await initAmadeus()
  }

  return amadeus
}

const initAmadeus = exports.initAmadeus = async (options = {}) => {
  return new Amadeus({
    clientId: AMADEUS_KEY,
    clientSecret: AMADEUS_SECRET,
    hostname: AMADEUS_ENV,

    ...options,
  })
}

exports.default = getAmadeus
