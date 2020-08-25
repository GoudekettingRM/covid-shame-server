const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('./model');
const { toJWT } = require('../auth/jwt');

const router = Router();

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll();
//     return res.json(users);
//   } catch (error) {
//     return next(error);
//   }
// });

router.post('/', async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const user = {
      username,
      email,
      passwordHash,
    };

    const newUser = await User.create(user);
    const { passwordHash: _password, ...inserted } = newUser.dataValues;

    return res.json({
      message: 'User created',
      token: toJWT({ userId: inserted.id }),
      user: inserted,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
