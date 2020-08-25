const express = require('express');

const router = express.Router();

const mainRateLimiter = require('../utils/rateLimitConfig');
const mainSpeedLimiter = require('../utils/slowDownConfig');

router.use(mainRateLimiter);
router.use(mainSpeedLimiter);

const imagesRouter = require('./image/router');
const userRouter = require('./user/router');
const authRouter = require('./auth/authRouter');
const likeRouter = require('./likes/router');

router.use('/images', imagesRouter);
router.use('/users', userRouter);
router.use('/login', authRouter);
router.use('/likes', likeRouter);

module.exports = router;
