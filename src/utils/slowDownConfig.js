const slowDown = require('express-slow-down');

const mainSpeedLimiter = slowDown({
  windowMs: 10 * 60 * 1000,
  delayAfter: 50,
  delayMs: 250,
});

module.exports = mainSpeedLimiter;
