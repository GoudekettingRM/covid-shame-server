const jwt = require('jsonwebtoken');

const scrt = process.env.JWT_SECRET || 'e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m';

function toJWT(data) {
  return jwt.sign(data, scrt, { expiresIn: '2h' });
}

function toData(token) {
  return jwt.verify(token, scrt);
}

function decode(token) {
  return jwt.decode(token);
}

module.exports = { toJWT, toData, decode };
