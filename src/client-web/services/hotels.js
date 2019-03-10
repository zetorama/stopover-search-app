import fetch, { POST } from './api'

export async function fetchOffers(filter) {
  const { cityCode, checkInDate, checkOutDate } = filter
  const payload = { cityCode, checkInDate, checkOutDate }

  const [raw, response] = await fetch(POST, 'find-hotels', payload)
  return [raw.data, raw.meta, response]
}
