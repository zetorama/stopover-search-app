import fetch, { POST } from './api'

export async function fetchOffers(filter, params) {
  const { cityCode, checkInDate, checkOutDate } = filter
  const payload = { cityCode, checkInDate, checkOutDate }

  const [raw, response] = await fetch(POST, 'find-hotels', payload, params)
  return [raw.data, raw.meta, response]
}
