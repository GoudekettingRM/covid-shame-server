const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1/login/verify-jwt', () => {
  it('responds with a not valid JWT message', (done) => {
    request(app)
      .post('/api/v1/login/verify-jwt')
      .field(
        'token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU5ODM4Nzk5MSwiZXhwIjoxNTk4Mzk1MTkxfQ.c6RTtnGFHVw5qdl41QJMG6flci5mGgRrzMGdLbbuaA4',
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Token checked', tokenValid: false }, done);
  });
});
