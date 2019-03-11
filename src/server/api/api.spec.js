const express = require('express')
const request = require('supertest')
const { api, VERSION } = require('.')

describe('api.index', () => {
  const app = express()
  app.use(api)

  describe('/', () => {
    test('returns api version', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('ok', true)
      expect(response.body).toHaveProperty('version', VERSION)
    })
  })

  describe('/find-hotels', () => {
    test('does not accept GET requests', async () => {
      try {
        const _response = await request(app).get('/find-hotels')

        expect('unreachable').toBe('unreached')
      } catch (err) {
        expect(err.status).toBe(404)
      }
    })

    test.todo('validates input')
    test.todo('searches for hotel offers')
  })
})
