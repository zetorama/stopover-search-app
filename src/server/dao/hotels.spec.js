const { hotels } = require('./hotels')
const hotelsData = require('../../__mock__/amadeus-hotel-offers.json')

const getClient = (dataResult = ['ok']) => {
  // mock Amadeus SDK
  const fn = jest.fn(() => ({ result: { data: dataResult } }))
  const client = {
    shopping: {
      hotelOffers: {
        get: fn
      }
    }
  }

  return { client, fn }
}

describe('dao.hotels', () => {
  describe('findOffers()', () => {

    test('should pass filter to API', () => {
      const { client, fn } = getClient()
      const promise = hotels.findOffers(client, { foo: 'bar' })

      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toHaveProperty('foo', 'bar')

      expect(promise instanceof Promise).toBe(true)
    })

    test('should call API and parse response', async () => {
      const { client, fn } = getClient(hotelsData)
      const [data, meta, response] = await hotels.findOffers(client)

      expect(fn.mock.calls.length).toBe(1)
      expect(fn.mock.calls[0][0]).toMatchObject({ view: 'SIMPLE' })

      expect(response).toMatchObject({ result: { data: hotelsData } })
      expect(Object.keys(meta).length).toBe(0)
      expect(data).toMatchSnapshot()
    })

  })
})
