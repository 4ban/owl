const request = require('supertest')
const app = require('../app')

describe('Test the root path', () => {
  beforeAll(() => {})
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('It should response the message', (done) => {
    request(app).get('/').then((response) => {
      let resp = JSON.parse(response.text)
      expect(resp).toHaveProperty('message')
      done()
    })
  })
})

describe('Test the empty list', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/test_empty').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('It should response with empty list', (done) => {
    request(app).get('/test_empty').then((response) => {
      let resp = JSON.parse(response.text)
      expect([]).toEqual(expect.arrayContaining(resp))
      done()
    })
  })
})

describe('Test the NOT empty list', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/test_not_empty').then((response) => {
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('It should response with NOT empty list', (done) => {
    request(app).get('/test_not_empty').then((response) => {
      let resp = JSON.parse(response.text)
      let testable = resp.find(item => item._id === '5de48258751587ad128f7b09').body
      expect(testable).toEqual('test item 2')
      done()
    })
  })
})