const db = require('../../db');
const Image = require('../image/model');
const User = require('../user/model');

const Like = db.define('like', {});

Like.belongsTo(User);
User.hasMany(Like);
Like.belongsTo(Image);
Image.hasMany(Like);

module.exports = Like;
