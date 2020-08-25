const rateLimit = require('express-rate-limit');

const mainRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

module.exports = mainRateLimiter;
