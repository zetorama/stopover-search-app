
const hotels = exports.hotels = {
  async findOffers(amadeus, params = {}) {
    const filter = {
      view: 'SIMPLE',
      sort: 'PRICE',
      // page: { limit: 10 },

      ...params,
    }

    // console.debug('>>> dao.hotels.findOffers', filter)
    const response = await amadeus.shopping.hotelOffers.get(filter)
    // console.debug('<<< dao.hotels.findOffers', response)

    const meta = {
      // TODO: provide current filter params and/or pagination instructions
    }

    const data = response.result.data.map(({ available, hotel, offers }) => ({
      isAvailable: available,
      id: hotel.hotelId,
      name: hotel.name,
      contact: hotel.contact,
      address: hotel.address,

      offers: offers.map(({ id, price, room }) => ({
        id: id,
        totalPrice: price.total,
        currency: price.currency,
        roomType: room.typeEstimated,
      }))
    }))

    return [data, meta, response]
  },
}

exports.default = hotels
