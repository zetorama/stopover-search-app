
const hotelOfferView = exports.hotelOfferView = ({ available, hotel, offers }) => ({
  ...hotelView(hotel),
  isAvailable: available,
  offers: offers.map(offerView),
})

const hotelView = exports.hotelView = ({ hotelId, name, contact, address }) => ({
  id: hotelId,
  name,
  contact,
  address,
})

const offerView = exports.offerView = ({ id, price, room }) => ({
  id: id,
  totalPrice: price.total,
  currency: price.currency,
  roomType: room.typeEstimated,
})
