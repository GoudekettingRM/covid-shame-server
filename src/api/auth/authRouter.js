const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../user/model');
const { toJWT, decode } = require('./jwt');

const router = new Router();

router.post('/', async (req, res, next) => {
  const { password: enteredPassword, email } = req.body;
  if (!enteredPassword || !email) {
    return res.json({ message: 'No login data provided.' });
  }
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).end();
    }

    if (bcrypt.compareSync(enteredPassword, user.passwordHash)) {
      const { passwordHash, ...userData } = user.dataValues;

      return res.json({
        message: 'Login successful.',
        token: toJWT({ userId: user.id }),
        user: userData,
      });
    }
    return res.status(401).end();
  } catch (error) {
    return next(error);
  }
});

router.post('/verify-jwt', async (req, res, next) => {
  let tokenValid = false;
  try {
    const { token } = req.body;
    const jwt = decode(token);
    const now = new Date().getTime() / 1000;

    if (now < jwt.exp) {
      tokenValid = true;
    }

    res.json({ message: 'Token checked', tokenValid });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
