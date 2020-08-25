const User = require('../user/model');
const { toData } = require('./jwt');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const authHeader = authorization && authorization.split(' ');
  if (authHeader && authHeader[0] === 'Bearer' && authHeader[1]) {
    try {
      const data = toData(authHeader[1]);

      const user = await User.findByPk(data.userId);

      if (!user) {
        return res.status(401).end();
      }
      const { passwordHash, ...userData } = user.dataValues;
      req.user = userData;

      return next();
    } catch (error) {
      return next(error);
    }
  } else {
    return res.status(401).end();
  }
};
module.exports = { auth };
