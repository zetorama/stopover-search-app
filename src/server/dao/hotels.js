const { hotelOfferView } = require('../views/hotels-view')

const { FEATURE_API_MANUAL_PAGING } = process.env

const hotels = exports.hotels = {
  async findOffers(amadeus, params = {}) {
    const filter = {
      view: 'SIMPLE',
      ...params,
    }

    let manualSlice = 0
    if (filter.page && FEATURE_API_MANUAL_PAGING === 'on') {
      // As sandbox API works weirdly, when using paging,
      // we support this FF to immitate page.limit, ignoring page.offset
      manualSlice = filter.page.limit
      delete filter.page
    }

    // console.debug('>>> dao.hotels.findOffers', filter)
    const response = await amadeus.shopping.hotelOffers.get(filter)
    // console.debug('<<< dao.hotels.findOffers', response)

    const meta = {
      // TODO: provide current filter params and/or pagination instructions
    }

    let { data } = response.result
    if (manualSlice) {
      data = data.slice(0, manualSlice)
    }

    return [data.map(hotelOfferView), meta, response]
  },
}

exports.default = hotels
