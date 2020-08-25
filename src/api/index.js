const express = require('express');

const imagesRouter = require('./image/router');
const userRouter = require('./user/router');
const authRouter = require('./auth/authRouter');
const likeRouter = require('./likes/router');

const router = express.Router();

router.use('/images', imagesRouter);
router.use('/users', userRouter);
router.use('/login', authRouter);
router.use('/likes', likeRouter);

module.exports = router;
