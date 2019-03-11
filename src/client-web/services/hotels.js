import fetch, { POST } from './api'

const { FEATURE_TOP_OFFERS_NUMBER = 10 } = process.env

export async function fetchTopOffers(filter, params) {
  const { cityCode, checkInDate, checkOutDate } = filter
  const payload = {
    cityCode,
    checkInDate,
    checkOutDate,
    sort: 'PRICE',
    page: { limit: FEATURE_TOP_OFFERS_NUMBER },
  }

  const [raw, response] = await fetch(POST, 'find-hotels', payload, params)
  return [raw.data, raw.meta, response]
}
